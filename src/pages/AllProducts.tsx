import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useGetAllProductsQuery } from "@/redux/api/productApi";
import { IProduct } from "@/types";
import ProductCard from "@/components/Shared/ProductCard";
import Loading from "@/components/Shared/Loading";

interface QueryParams {
  search: string;
  sort: string;
  category: string;
  brand: string;
  rating: number;
  minPrice: number;
  maxPrice: number;
  page: number;
  limit: number;
}

const AllProducts: React.FC = () => {
  const [queryParams, setQueryParams] = useState<QueryParams>({
    search: "",
    sort: "",
    category: "",
    brand: "",
    rating: 0,
    minPrice: 0,
    maxPrice: 1000,
    page: 1,
    limit: 6,
  });

  const { data, isLoading, isError } = useGetAllProductsQuery(queryParams, {
    pollingInterval: 30 * 1000,
  });

  const products: IProduct[] = data?.data?.data || [];
  const totalPages =
    Math.ceil((data?.data.totalItem as number) / queryParams.limit) || 1;
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      const uniqueBrands = [
        ...new Set(products.map((product) => product.brand)),
      ];
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
    }
  }, [products]);

  const handlePageChange = (newPage: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleLimitChange = (newLimit: string) => {
    setQueryParams((prev) => ({
      ...prev,
      limit: Number(newLimit),
      page: 1,
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({
      ...queryParams,
      search: e.target.value,
      category: "",
      brand: "",
      rating: 0,
      sort: "",
    });
  };

  const handleSort = (value: string) => {
    setQueryParams({ ...queryParams, sort: value, search: "" });
  };

  const handleCategory = (value: string) => {
    setQueryParams({ ...queryParams, category: value, search: "", brand: "" });
  };

  const handleBrand = (value: string) => {
    setQueryParams({ ...queryParams, brand: value, search: "" });
  };

  const handleRating = (value: string) => {
    setQueryParams({ ...queryParams, rating: Number(value), search: "" });
  };

  const handleMinPriceChange = (value: number) => {
    setQueryParams((prev) => ({
      ...prev,
      minPrice: value,
      maxPrice: Math.max(value, prev.maxPrice),
    }));
  };

  const handleMaxPriceChange = (value: number) => {
    setQueryParams((prev) => ({
      ...prev,
      maxPrice: value,
      minPrice: Math.min(value, prev.minPrice),
    }));
  };

  const clearFilters = () => {
    setQueryParams({
      search: "",
      sort: "price",
      category: "",
      brand: "",
      rating: 0,
      minPrice: 0,
      maxPrice: 300,
      page: 1,
      limit: 6,
    });
  };

  return (
    <div className=" container mx-auto px-4 py-8" id="top-page">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Section */}
        <div className="w-full lg:w-1/4 space-y-6 roboto-flex">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={queryParams.search}
                  onChange={handleSearch}
                  className="pl-10"
                />
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Show Products per page</h3>
              <Select
                onValueChange={handleLimitChange}
                value={
                  queryParams.limit === 0 ? "10" : queryParams.limit.toString()
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Number" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Sort</h3>
              <Select onValueChange={handleSort} value={queryParams.sort}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price: Low to High</SelectItem>
                  <SelectItem value="-price">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Categories</h3>
              <Select
                onValueChange={handleCategory}
                value={queryParams.category}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Brands</h3>
              <Select onValueChange={handleBrand} value={queryParams.brand}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Rating</h3>
              <Select
                onValueChange={handleRating}
                value={queryParams.rating.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Ratings</SelectItem>
                  <SelectItem value="4">4 Stars & Above</SelectItem>
                  <SelectItem value="3">3 Stars & Above</SelectItem>
                  <SelectItem value="2">2 Stars & Above</SelectItem>
                  <SelectItem value="1">1 Star & Above</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Price Range</h3>
              <div className="px-2">
                <Slider
                  min={0}
                  max={300}
                  step={10}
                  value={[queryParams.minPrice, queryParams.maxPrice]}
                  onValueChange={([min, max]) => {
                    handleMinPriceChange(min);
                    handleMaxPriceChange(max);
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span>${queryParams.minPrice}</span>
                <span>${queryParams.maxPrice}</span>
              </div>
            </CardContent>
          </Card>

          <Button onClick={clearFilters} variant="outline" className="w-full">
            Clear All Filters
          </Button>
        </div>

        {/* Products Grid */}

        <div className="w-full lg:w-3/4">
          {isLoading && <Loading />}
          {isError && (
            <p className="text-4xl text-red-600">Some Error Occured</p>
          )}
          {products.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(queryParams.page - 1)}
                  disabled={queryParams.page === 1}
                  className="mr-2"
                >
                  Previous
                </Button>

                <div className="flex items-center">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                      key={index}
                      variant={
                        queryParams.page === index + 1 ? "default" : "outline"
                      }
                      onClick={() => handlePageChange(index + 1)}
                      className="mx-1"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => handlePageChange(queryParams.page + 1)}
                  disabled={queryParams.page >= totalPages}
                  className="ml-2"
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div className="text-5xl text-red-400 text-center">
              No Product Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
