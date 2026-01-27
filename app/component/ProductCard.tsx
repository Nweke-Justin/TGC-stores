"use client";

import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  image_url?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const inStock = product.quantity > 0;

  return (
    <div className="border rounded-lg p-5 flex flex-col shadow-sm hover:shadow-lg transition">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

      {product.description && (
        <p className="text-gray-600 mb-2">{product.description}</p>
      )}

      {product.price !== undefined && (
        <p className="text-lg font-medium mb-2">
          ₦{Number(product.price).toLocaleString()}
        </p>
      )}

      <p
        className={`text-sm mb-4 ${
          inStock ? "text-gray-500" : "text-red-500 font-semibold"
        }`}
      >
        {inStock ? `In stock: ${product.quantity}` : "Out of Stock"}
      </p>

      <Link
        href="/contact"
        className={`mt-auto text-center py-2 rounded-md ${
          inStock
            ? "bg-purple-600 text-white hover:bg-purple-700"
            : "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
      >
        Contact to Order
      </Link>
    </div>
  );
}
