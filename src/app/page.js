import CustomerReviews from "@/Component/HomePage/CustomerReview";
import FeaturedProperties from "@/Component/HomePage/FeaturedProperties";
import HeroSection from "@/Component/HomePage/HeroSection";
import RentalStatistics from "@/Component/HomePage/Rentalstatistics";
import TopLocations from "@/Component/HomePage/TopLocations";
import WhyChoseUS from "@/Component/HomePage/WhyChoseUS";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <WhyChoseUS />
      <CustomerReviews />
      <TopLocations />
      <RentalStatistics />
    </div>
  );
}
