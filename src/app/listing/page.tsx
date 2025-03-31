import React from "react";
import { Listing } from "@/app/types/listing";
import Header from "@/app/components/Header";
import ListingsClient from "./ListingClient";

/**
 * This file is a Server Component by default (no "use client").
 * We'll SSR the listings data by fetching from /api/listing.
 */
export default async function ListingsPage() {
  // 1. Fetch from your internal route /api/listing
  //    This fetch runs on the server at build time or request time.
  // const res = await fetch(`http://localhost:3000/api/listing`, {

  //   // if you want no caching, e.g. get fresh data each time:
  //   next: { revalidate: 90 },
  // });

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listing`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // In Next.js, you could handle errors by throwing or returning some fallback.
    throw new Error(`Failed to fetch listings: ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error("Invalid data format from /api/listing");
  }

  // data is your array of Listing objects from the server
  const listings: Listing[] = data;

  // 2. Return SSR page, with a client subcomponent
  return (
    <>
      <Header />
      {/* Pass the listings data to a client component for filtering, etc. */}
      <ListingsClient listings={listings} />
    </>
  );
}
