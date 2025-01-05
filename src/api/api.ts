import { useQuery } from "@tanstack/react-query";

import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/auth-provider";

/**
 * Fetches all products and categories from the database.
 *
 * @returns An object containing lists of products and categories.
 */
export const useFetchProductsAndCategories = () => {
  return useQuery({
    queryKey: ["products", "categories"],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        supabase.from("product").select("*"),
        supabase.from("category").select("*"),
      ]);

      if (products.error || categories.error) {
        throw new Error(
          `Error fetching products and categories: ${
            products.error?.message || categories.error?.message
          }`
        );
      }

      return {
        products: products.data,
        categories: categories.data,
      };
    },
  });
};

/**
 * Fetches details of a single product by its slug.
 *
 * @param slug - The unique identifier for the product.
 * @returns The product details.
 */
export const useFetchProduct = (slug: string) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        throw new Error(`Error fetching product ${error.message}`);
      }

      return data;
    },
  });
};

/**
 * Fetches details of a category and associated products by the category slug.
 *
 * @param slug - The unique identifier for the category.
 * @returns An object containing the category details and its associated products.
 */
export const useFetchCategoriesAndProducts = (categorySlug: string) => {
  return useQuery({
    queryKey: ["categoriesAndProducts", categorySlug],
    queryFn: async () => {
      const { data: category, error: categoryError } = await supabase
        .from("category")
        .select("*")
        .eq("slug", categorySlug)
        .single();

      if (categoryError) {
        throw new Error(`Error fetching category ${categoryError.message}`);
      }

      const { data: products, error: productsError } = await supabase
        .from("product")
        .select("*")
        .eq("category", category.id);

      if (productsError) {
        throw new Error(
          `Error fetching products for the category ${productsError.message}`
        );
      }

      return { category, products };
    },
  });
};


/**
 * Fetches all orders for the authenticated user from the database.
 *
 * @returns A list of orders associated with the authenticated user.
 */
export const useFetchOrders=()=>{
  const {
    user:{id}
  }=useAuth()

  return useQuery({
    queryKey: ["orders", id],
    queryFn:async()=>{
      const {data,error,}=await supabase
      .from('order')
      .select('*')
      .order('created_at',{ascending:true})
      .eq('user',id)

      if(error) {
        throw new Error(`Error fetching orders ${error.message}`)
      }

      return data

    }



  })

}