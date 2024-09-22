import React from "react";
import { HashLink as Link } from 'react-router-hash-link';

const categories = [
  { label: "Basketball", emoji: "🏀" },
  { label: "Cricket", emoji: "🏏" },
  { label: "Tennis", emoji: "🎾" },
  { label: "Badminton", emoji: "🏸" },
  { label: "Golf", emoji: "⛳" },
  { label: "Wrestling", emoji: "🤼" },
];

const FeaturedCategories: React.FC = () => {
  return (
    <section className="py-8 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3  gap-8">
          {categories.map((category) => (
            <Link
              to="all-products#top-page"
              className="flex flex-col items-center p-4 h-48 justify-center roboto-flex  bg-white shadow-lg rounded-lg hover:bg-blue-100 transition duration-300 ease-in-out"
            >
              <span className="text-5xl md:text-7xl mb-2">
                {category.emoji}
              </span>
              <span className="text-3xl md:text-5xl font-semibold">
                {category.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
