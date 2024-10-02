import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductDetail();
  }, [id]);

  if (!product) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 font-serif bg-gray-50">
      {" "}
      <h1 className="text-3xl font-bold mb-4 text-center text-green-500">
        {product.title}
      </h1>
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 p-2 bg-sky-500 text-white rounded shadow hover:bg-sky-600 transition duration-200"
      >
        Go Back
      </button>
      <div className="flex mb-4">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center max-w-sm mx-auto">
          {" "}
          <img
            src={product.images[0]} // Access the first image
            alt={product.title}
            className="w-full h-auto max-h-[300px] object-contain p-2 rounded-lg shadow-md bg-white" // Added padding and background color
          />
        </div>

        {/* Product Information Section */}
        <div className="flex-1 p-4">
          <div className="text-center mb-4">
            <p className="font-bold text-2xl mb-1 text-yellow-600">
              Price: ${product.price}
            </p>
            <p className="font-semibold text-gray-700">
              Category: {product.category}
            </p>
          </div>

          {/* Product Details*/}
          <div className="p-4 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-lg font-semibold mb-2 border-b pb-2 text-black">
              Product Details
            </h2>
            <p className="mb-1">
              <strong className="text-black">Rating:</strong>{" "}
              {product.rating || "N/A"}
            </p>
            <p className="mb-1">
              <strong className="text-black">Stock:</strong>{" "}
              {product.stock || "N/A"}
            </p>
            <p className="mb-1">
              <strong className="text-black">Warranty Information:</strong>{" "}
              {product.warrantyInformation || "N/A"}
            </p>
            <p className="mb-1">
              <strong className="text-black">Shipping Information:</strong>{" "}
              {product.shippingInformation || "N/A"}
            </p>
            <p className="mb-1">
              <strong className="text-black">Return Policy:</strong>{" "}
              {product.returnPolicy || "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* Comments and Reviews */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2 text-black">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          product.reviews.map((review, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold text-gray-800">
                    {review.reviewerName}{" "}
                    <span className="text-gray-600">
                      ({review.reviewerEmail})
                    </span>
                  </p>
                  <p className="text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="font-bold text-yellow-500">{review.rating} ⭐</p>
              </div>
              <p className="mt-2 text-gray-700">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
