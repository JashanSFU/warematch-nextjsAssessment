import React from "react";
import { Listing } from "@/app/types/listing";
import Header from "@/app/components/Header";
import ListingsClient from "./ListingClient";

// Force dynamic rendering (SSR) so that data is fetched at request time.
export const dynamic = "force-dynamic";

export default async function ListingsPage() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseURL) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  const res = await fetch(`${baseURL}/api/listing`, {
    next: { revalidate: 90 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch listings: ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format from /api/listing");
  }

  const listings: Listing[] = data;

  return (
    <>
      <Header />
      {listings && <ListingsClient listings={listings} />}
      <div>Loading......</div>
    </>
  );
}
