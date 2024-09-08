import Description from "@/components/Description/Description";
import DemoProducts from "@/components/Home/DemoProducts";
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import ResponsiveCarousel from "@/components/Home/ResponsiveCarousel";

function Home() {
  return (
    <div>
      <ResponsiveCarousel />
      <Description message="featured categories" />
      <FeaturedCategories />
      <DemoProducts/>
    </div>
  );
}

export default Home;
