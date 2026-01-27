import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id: productId } = await params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .eq("is_available", true)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-14">
      <Link
        href="/"
        className="text-purple-600 hover:underline mb-6 inline-block"
      >
        ← Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div>
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-lg object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          {product.price && (
            <p className="text-2xl font-semibold text-purple-700 mb-4">
              ₦{Number(product.price).toLocaleString()}
            </p>
          )}

          {product.description && (
            <p className="text-gray-700 mb-6">
              {product.description}
            </p>
          )}

          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>

          <p className="text-sm text-gray-500 mb-6">
            Available quantity: {product.quantity}
          </p>

          <Link
            href="/contact"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
          >
            Contact Seller
          </Link>
        </div>
      </div>
    </main>
  );
}
