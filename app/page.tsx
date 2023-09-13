"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <section>
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
          router.push("/server");
        }}
      >
        Go to server Page
      </button>
    </section>
  );
}
