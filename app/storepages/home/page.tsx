import { supabase } from "@/lib/supabase/clients";
import Link from "next/link";

interface StorefrontPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function StorefrontPage({
  searchParams,
}: StorefrontPageProps) {
  const params = await searchParams;
  const query = params.q?.trim();

  let dbQuery = supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .order("created_at", { ascending: false });

  if (query) {
    dbQuery = dbQuery.ilike("name", `%${query}%`);
  }

  const { data: products, error } = await dbQuery;

  if (error) {
    console.error("Failed to fetch products:", error);
    return <p>Failed to load products.</p>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-7 lg:py-14">
      <h1 className="text-2xl lg:text-4xl font-bold mb-8 text-center text-purple-700">
        {query ? `Search results for "${query}"` : "Available Products"}
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products found.</p>
      ) : (
        <section className="grid gap-6 grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const whatsappNumber = "2348026958471";

            const message = `
Hello, I am interested in this product:

*${product.name}*
${product.price ? `Price: ₦${Number(product.price).toLocaleString()}` : ""}

 Let me know if it is still available.
            `.trim();

            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              message
            )}`;

            return (
              <div
                key={product.id}
                className="border rounded-lg p-1 lg:p-5 flex flex-col bg-white"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-30 lg:h-48 object-cover rounded-md mb-4"
                  />
                )}

                <h2 className=" text-[15px] lg:text-xl text-center font-semibold  lg:mb-2">
                  {product.name}
                </h2>

                {product.description && (
                  <p className="text-gray-600 text-[14px] lg:mb-4">
                    {product.description}
                  </p>
                )}

                {product.price && (
                  <p className="text-[14px] lg:text-lg font-medium lg:mb-2">
                    ₦{Number(product.price).toLocaleString()}
                  </p>
                )}

                <p className="text-sm text-gray-500 lg:mb-4">
                  <span className="font-bold">In stock:</span>{" "}
                  {product.quantity}
                </p>

                <Link
                  href={`/storepages/seller/products/${product.id}`}
                  className="text-purple-600 font-medium lg:mb-3 text-[14px] lg:text-[16px]"
                >
                  View Product Details
                </Link>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block text-center bg-black text-white py-2 px-0.5 rounded-md hover:bg-purple-700 transition-colors duration-200 text-[14px] lg:text-[16px]"
                >
                  Contact on WhatsApp
                </a>
              </div>
            );
          })}
        </section>
      )}
    </main>
  );
}
