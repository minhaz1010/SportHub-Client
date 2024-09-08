import Description from "@/components/Description/Description";
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import ResponsiveCarousel from "@/components/Home/ResponsiveCarousel";

function Home() {
  return <div>
   <ResponsiveCarousel/>
   <Description message="featured categories"/>
   <FeaturedCategories/>
  </div>;
}

export default Home;
