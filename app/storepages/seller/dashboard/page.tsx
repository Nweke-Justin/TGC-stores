"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/clients";

export default function SellerDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const categories = [
    { name: "Laptops", slug: "laptops" },
    { name: "Phones", slug: "phones" },
    { name: "Laptop Accessories", slug: "laptop-accessories" },
    { name: "Phone Accessories", slug: "phone-accessories" },
  ];

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: categories[0].slug,
    image: null as File | null,
  });

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          setUser(session.user);
          setLoading(false);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setLoading(false);
          router.push("/storepages/seller/login");
        }
      }
    );

    // Initial check
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be signed in to add products.");
      return;
    }

    let imageUrl = "";

    if (form.image) {
      const filePath = `images/${Date.now()}-${form.image.name}`;

      // Upload image to bucket
      const { data: storageData, error: storageError } = await supabase.storage
        .from("productStore")
        .upload(filePath, form.image);

      if (storageError) {
        console.error("Storage error:", storageError);
        return;
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("productStore")
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }


    // Insert product into table
    const { error: insertError } = await supabase
      .from("products") // <-- your table name
      .insert([
        {
          name: form.name,
          description: form.description,
          price: Number(form.price),
          quantity: Number(form.quantity),
          category: form.category,
          image_url: imageUrl,
          is_available: true,
        },
      ]);

    if (insertError) {
      console.error("Insert error:", insertError);
    } else {
      alert("Product added successfully!");
      setForm({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: categories[0].slug,
        image: null,
      });
    }
  };

  if (loading) return null;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>
      <p className="text-gray-700 mb-6">
        Manage products, update stock, and control availability.
      </p>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
          className="border p-2 rounded"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 rounded"
        >
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setForm({ ...form, image: e.target.files?.[0] || null })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Add Product
        </button>
      </form>
    </main>
  );
}
