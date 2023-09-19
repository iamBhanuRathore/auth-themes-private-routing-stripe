"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <section className="bg-primary-1">
      <p>{JSON.stringify(session)}</p>
      <button onClick={() => router.push("/home")}>Back to home page</button>
      <button
        onClick={() => {
          console.log("Welcome");
          router.push("/login");
        }}
      >
        Login Page
      </button>
      <button
        onClick={() => {
          router.push("/serverpage");
        }}
      >
        Go to server Page
      </button>
    </section>
  );
}
