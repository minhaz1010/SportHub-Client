import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface SlideData {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    imageUrl: "https://clipart-library.com/images/pcodbRjri.jpg",
    title: "Welcome to Our Store",
    description: "Discover amazing products at great prices",
  },
  {
    id: 2,
    imageUrl:
      "https://c0.wallpaperflare.com/preview/438/719/595/photo-of-man-swinging-golf-driver.jpg",
    title: "New Arrivals",
    description: "Check out our latest collection",
  },
  {
    id: 3,
    imageUrl: "https://wallpapercave.com/wp/wp3499822.jpg",
    title: "Special Offers",
    description: "Limited time deals you don't want to miss",
  },
];

const ResponsiveCarousel: React.FC = () => {
  return (
    <Carousel
      showArrows={true}
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      autoPlay={true}
      interval={5000}
      transitionTime={500}
    >
      {slides.map((slide) => (
        <div key={slide.id} className="relative h-[600px] md:h-[1000px] ">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-5  flex items-center justify-center">
            <Card className="md:w-[800px]   w-[600px] teko ">
              <CardContent className="p-6 ">
                <h2 className="text-5xl md:text-7xl  mb-2">{slide.title}</h2>
                <p className="text-2xl md:text-3xl">{slide.description}</p>
                <Button
                  variant="default"
                  className="mt-5 text-2xl bg-sky-500 hover:bg-sky-800 py-6"
                >
                  <Link to="/all-products">All Products</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ResponsiveCarousel;
