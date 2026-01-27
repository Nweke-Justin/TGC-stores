"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Product {
  id: string;
  name: string;
  description?: string;
  price?: number;
  quantity: number;
  image_url?: string;
  is_available: boolean;
}

export default function StorefrontPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch products:", error);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-gray-500">Loading products...</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">

      <h1 className="text-4xl font-bold mb-8">Available Products</h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-5 flex flex-col"
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}

              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>

              {product.description && (
                <p className="text-gray-600 mb-4">{product.description}</p>
              )}

              {product.price && (
                <p className="text-lg font-medium mb-2">
                  ₦{Number(product.price).toLocaleString()}
                </p>
              )}

              <p className="text-sm text-gray-500 mb-4">
                In stock: {product.quantity}
              </p>
              <Link href={`/storepages/seller/products/${product.id}`}> View Product Details</Link>
              <a
                href="/contact"
                className="mt-auto inline-block text-center bg-black text-white py-2 rounded-md"
              >
                Contact to Order
              </a>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
