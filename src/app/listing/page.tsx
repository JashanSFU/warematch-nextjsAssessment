// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Container,
//   Grid,
//   Paper,
//   Typography,
// } from "@mui/material";
// import Header from "@/app/components/Header";
// import { Listing } from "@/app/types/listing";
// import ListingCard from "@/app/components/ListingCard";
// import FilterPanel from "@/app/components/FilterPanel";
// import { applyListingFilters, ListingFilterState } from "@/app/utils/filters";

// const SIDEBAR_WIDTH = 380; // Adjust as desired
// const HEADER_HEIGHT = 64; // Approx. height if your Header is 64px tall

// export default function ListingsPage() {
//   const [listings, setListings] = useState<Listing[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Our filter state
//   const [filters, setFilters] = useState<ListingFilterState>({
//     filter3PL: false,
//     filterSublease: false,
//     searchTitle: "",
//     minSqft: null,
//     maxSqft: null,
//     minPrice: null,
//     maxPrice: null,
//   });

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const response = await fetch("/api/listing");
//         if (!response.ok) throw new Error("Failed to fetch listings");

//         const data = await response.json();
//         if (!Array.isArray(data)) {
//           throw new Error("Invalid data format. Expected an array.");
//         }

//         setListings(data);
//       } catch (err: unknown) {
//         if (err instanceof Error) setError(err.message);
//         else console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   // Filtered results
//   const filteredListings = applyListingFilters(listings, filters);

//   // LOADING STATE
//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // ERROR STATE
//   if (error) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//       >
//         <Alert severity="error" variant="filled">
//           {error}
//         </Alert>
//       </Box>
//     );
//   }

//   // NO LISTINGS
//   if (listings.length === 0) {
//     return (
//       <Box
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         height="100vh"
//       >
//         <Alert severity="info" variant="outlined">
//           No listings available
//         </Alert>
//       </Box>
//     );
//   }

//   // Update filters from child
//   const updateFilters = (newFilters: Partial<ListingFilterState>) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   return (
//     <>
//       <Header />

//       {/* Sidebar (fixed) */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: HEADER_HEIGHT, // Start below the header if it's 64px tall
//           left: 0,
//           width: SIDEBAR_WIDTH,
//           bottom: 0,
//           overflowY: "auto", // Scroll within the filter if content is tall
//           backgroundColor: "#f8f8f8",
//           borderRight: "1px solid #ccc",
//           p: 2,
//         }}
//       >
//         <FilterPanel filters={filters} onChange={updateFilters} />
//       </Box>

//       {/* Main content offset by sidebar width */}
//       <Box
//         sx={{
//           ml: `${SIDEBAR_WIDTH}px`, // push content to the right
//           mt: 8, // small top margin
//           p: 2,
//         }}
//       >
//         <Paper sx={{ p: 2 }} elevation={0}>
//           <Typography variant="h4" textAlign="center" mb={3}>
//             Available Listings
//           </Typography>

//           {/* Container for the listing cards */}
//           <Container maxWidth="xl">
//             <Grid container spacing={3} justifyContent="center">
//               {filteredListings.map((listing) => (
//                 <Grid key={listing.id} style={{ display: "flex" }}>
//                   <ListingCard listing={listing} />
//                 </Grid>
//               ))}

//               {filteredListings.length === 0 && (
//                 <Grid>
//                   <Box mt={2}>
//                     <Alert severity="info">
//                       No listings match your selected filters.
//                     </Alert>
//                   </Box>
//                 </Grid>
//               )}
//             </Grid>
//           </Container>
//         </Paper>
//       </Box>
//     </>
//   );
// }
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/listing`, {
    // if you want no caching, e.g. get fresh data each time:
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
