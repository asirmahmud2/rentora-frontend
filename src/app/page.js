import FeaturedProperties from "@/Component/HomePage/FeaturedProperties";
import HeroSection from "@/Component/HomePage/HeroSection";
import WhyChoseUS from "@/Component/HomePage/WhyChoseUS";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <WhyChoseUS />
    </div>
  );
}
