import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Phone } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

interface StoreLocation {
  name: string;
  address: string;
  phone: string;
}

const About: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "John Doe",
      role: "Founder & CEO",
      image:
        "https://img.freepik.com/free-photo/artist-white_1368-3546.jpg?t=st=1727065366~exp=1727068966~hmac=69c78bba6a88c96ecc498a335facbd740cd7f339303aaace315b5a8af776d85d&w=740",
    },
    {
      name: "Jane Smith",
      role: "Head of Product",
      image:
        "https://img.freepik.com/free-psd/expressive-man-gesturing_23-2150199018.jpg?w=1380&t=st=1727065435~exp=1727066035~hmac=b11d691e88a2c7780e55d8382cdc6cc4275b528cf1892140e7d8c8e4b2bec345",
    },
    {
      name: "Sarah Brown",
      role: "Marketing Director",
      image:
        "https://img.freepik.com/free-photo/isolated-gorgeous-attractive-young-woman-wearing-trendy-glasses-red-lipstick-loose-colored-hair-one-side-looking-with-confident-smile-keeping-her-arms-folded_344912-531.jpg?w=1380&t=st=1727065471~exp=1727066071~hmac=4b7ac8beed5fe32720469924653d3edbed0bb6f267fd30f0822013eb64ce2c62",
    },
  ];

  const storeLocations: StoreLocation[] = [
    { name: "SportX Store", address: "Akhaliya,Sylhet", phone: "01811111111" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 roboto-flex">
      <h1 className="text-5xl font-semibold mb-8 text-center">About SportX</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-gray-700 mb-4">
          SportX has been at the forefront of sports equipment innovation since
          2020. We are passionate about providing athletes and sports
          enthusiasts with the highest quality products to enhance their
          performance and enjoyment of sports.
        </p>
        <p className="text-gray-700 mb-4">
          Our team of experts works tirelessly to research, develop, and test
          cutting-edge sports gear, ensuring that our customers always have
          access to the best equipment in the market.
        </p>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              To empower athletes of all levels by providing innovative,
              high-quality sports equipment that enhances performance, safety,
              and enjoyment.
            </p>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              To be the global leader in sports equipment, recognized for our
              commitment to innovation, quality, and customer satisfaction.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12 ">
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
          {teamMembers.map((member, index) => (
            <Card key={index} className="shadow-lg">
              <CardContent className="pt-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="size-48 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-center">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12 roboto-flex">
        <h2 className="text-2xl font-semibold mb-4">Our Stores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {storeLocations.map((location, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <MapPin className="mr-2" size={18} />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-2" size={18} />
                  <span>{location.phone}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center mb-4">
              <Mail className="mr-4" size={24} />
              <span>info@sportx.com</span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="mr-4" size={24} />
              <span>01811111111</span>
            </div>
            <div className="flex items-center">
              <MapPin className="mr-4" size={24} />
              <span>Akhaliya ,Sylhet</span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default About;
