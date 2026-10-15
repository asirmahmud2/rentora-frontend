
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    if (!origin) {
      return NextResponse.json(
        { error: "Request origin is missing" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "RENTORA Property Booking",
              description: "Test booking payment",
            },
            unit_amount: 3700, // Exactly $37.00 USD
          },
          quantity: 1,
        },
      ],

      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Stripe Checkout error:", err);

    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
