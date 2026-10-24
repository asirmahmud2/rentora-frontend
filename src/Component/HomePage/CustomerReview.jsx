import { getTopReviews } from "@/app/Server/Actions/Review";
import CustomerReviewsList from "./Customerreviewslist";

// Server component: fetches the data, the client component draws it
const CustomerReviews = async () => {
    const result = await getTopReviews();
    const reviews = Array.isArray(result) ? result : [];

    return <CustomerReviewsList reviews={reviews} />;
};

export default CustomerReviews;