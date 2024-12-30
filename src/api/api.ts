import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

/**
 * fetch products and categories by querying
 * @returns products and categories
 */
export const fetchProductsAndCategories = () => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        supabase.from("product").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (products.error || categories.error) {
        throw new Error("Error fetching products and categories");
      }

      return {
        products: products.data,
        categories: categories.data,
      };
    },
  });
};

export const fetchProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        throw new Error("Error fetching product");
      }

      return data;
    },
  });
};
