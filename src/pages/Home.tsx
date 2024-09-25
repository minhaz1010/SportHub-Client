import Description from "@/components/Description/Description";
import ContactForm from "@/components/Home/ContactForm";
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import ResponsiveCarousel from "@/components/Home/ResponsiveCarousel";

function Home() {
  return (
    <div>
      <ResponsiveCarousel />
      <Description message="featured categories" />
      <FeaturedCategories />
      <FeaturedProducts />
      <ContactForm />
    </div>
  );
}

export default Home;
