import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { stripe } from "@/lib/stripe";
import { getProperty } from "@/app/Server/api/mutation";
import { calculateBooking } from "@/Component/Property/BookingPrice";

export async function POST(request) {
  try {
    const { propertyId, moveInDate, moveOutDate, contactNumber, notes, email, userId } =
      await request.json();

    if (!ObjectId.isValid(propertyId)) {
      return NextResponse.json({ error: "Invalid property" }, { status: 400 });
    }

    const result = await getProperty(propertyId);
    const property = Array.isArray(result) ? result[0] : result;

    if (!property?.rent) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // Recalculated on the server so the price can't be tampered with.
    const booking = calculateBooking({
      rent: property.rent,
      rentType: property.rentType,
      moveInDate,
      moveOutDate,
    });

    if (!booking) {
      return NextResponse.json({ error: "Invalid dates" }, { status: 400 });
    }

    const origin = request.headers.get("origin");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: "bdt",
            product_data: {
              name: property.title,
              description: `${booking.days} days: ${moveInDate} to ${moveOutDate}`,
              images: property.images?.slice(0, 1),
            },
            unit_amount: booking.total * 100, // BDT has 2 decimals
          },
          quantity: 1,
        },
      ],
      metadata: {
        propertyId,
        userId,
        moveInDate,
        moveOutDate,
        contactNumber,
        notes: notes?.slice(0, 450) || "",
      },
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout error:", err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}