import { redirect } from "next/navigation";

export default function Home() {
  // In a real application, this would check for authentication
  // and redirect to dashboard for logged-in users or login for others

  // For now, redirect to the login page as we don't have auth yet
  redirect("/auth/login");
}
