"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  console.log(error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
