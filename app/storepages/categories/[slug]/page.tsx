import { createClient } from "@supabase/supabase-js";
import ProductCard from "@/app/component/ProductCard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug: categorySlug } = await params;
  console.log(categorySlug);

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_available", true)
    .eq("category", categorySlug);
  if (error) {
    console.error("Error fetching products:", error);
  }

  const categoryDisplayName = categorySlug
    .split("-")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <main className="max-w-7xl mx-auto px-6 py-4 lg:py-14">
      <h1 className=" text-2xl lg:text-3xl text-center text-purple-700 font-bold mb-8">
        {categoryDisplayName}
      </h1>

      {products?.length === 0 && (
        <p className="text-gray-500">
          No products available in this category.
        </p>
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
