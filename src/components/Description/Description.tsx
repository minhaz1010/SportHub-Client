import React from "react";

import featuredImage from "../../assets/featured.jpg";

interface Props {
  message: string;
}

const Description: React.FC<Props> = ({ message }) => {
  return (
    <section className="flex flex-col mb-7  justify-center items-center">
      <img
        src={featuredImage}
        alt="featured-image"
        className="md:w-[500px] md:h-[400px]  "
      />
      <h3 className="md:text-7xl text-4xl  teko uppercase bg-[#eeeeec] animate-pulse p-11 rounded-xl">
        {message}
      </h3>
    </section>
  );
};

export default Description;
