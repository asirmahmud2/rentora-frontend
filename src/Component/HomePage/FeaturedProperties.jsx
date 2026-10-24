import { featuredProperty } from "@/app/Server/Actions/properties";
import { getUser } from "@/lib/getUser";
import FeaturedPropertiesList from "./FeaturedPropertiesList";

const FeaturedProperties = async () => {
    const result = await featuredProperty();
    const properties = Array.isArray(result) ? result : [];

    const user = await getUser();

    return (
        <FeaturedPropertiesList
            properties={properties}
            isLoggedIn={Boolean(user)}
        />
    );
};

export default FeaturedProperties;