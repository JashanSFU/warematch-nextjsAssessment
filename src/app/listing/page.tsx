"use client";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Header from "@/app/components/Header";
import { Listing } from "@/app/types/listing";
import ListingCard from "@/app/components/ListingCard";
import FilterPanel from "@/app/components/FilterPanel";
import { applyListingFilters, ListingFilterState } from "@/app/utils/filters";

const SIDEBAR_WIDTH = 380; // Adjust as desired
const HEADER_HEIGHT = 64; // Approx. height if your Header is 64px tall

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Our filter state
  const [filters, setFilters] = useState<ListingFilterState>({
    filter3PL: false,
    filterSublease: false,
    searchTitle: "",
    minSqft: null,
    maxSqft: null,
    minPrice: null,
    maxPrice: null,
  });

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("/api/listing");
        if (!response.ok) throw new Error("Failed to fetch listings");

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format. Expected an array.");
        }

        setListings(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filtered results
  const filteredListings = applyListingFilters(listings, filters);

  // LOADING STATE
  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Box>
    );
  }

  // NO LISTINGS
  if (listings.length === 0) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Alert severity="info" variant="outlined">
          No listings available
        </Alert>
      </Box>
    );
  }

  // Update filters from child
  const updateFilters = (newFilters: Partial<ListingFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return (
    <>
      <Header />

      {/* Sidebar (fixed) */}
      <Box
        sx={{
          position: "fixed",
          top: HEADER_HEIGHT, // Start below the header if it's 64px tall
          left: 0,
          width: SIDEBAR_WIDTH,
          bottom: 0,
          overflowY: "auto", // Scroll within the filter if content is tall
          backgroundColor: "#f8f8f8",
          borderRight: "1px solid #ccc",
          p: 2,
        }}
      >
        <FilterPanel filters={filters} onChange={updateFilters} />
      </Box>

      {/* Main content offset by sidebar width */}
      <Box
        sx={{
          ml: `${SIDEBAR_WIDTH}px`, // push content to the right
          mt: 8, // small top margin
          p: 2,
        }}
      >
        <Paper sx={{ p: 2 }} elevation={0}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Available Listings
          </Typography>

          {/* Container for the listing cards */}
          <Container maxWidth="xl">
            <Grid container spacing={3} justifyContent="center">
              {filteredListings.map((listing) => (
                <Grid
                  key={listing.id}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  style={{ display: "flex" }}
                >
                  <ListingCard listing={listing} />
                </Grid>
              ))}

              {filteredListings.length === 0 && (
                <Grid item xs={12}>
                  <Box mt={2}>
                    <Alert severity="info">
                      No listings match your selected filters.
                    </Alert>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Container>
        </Paper>
      </Box>
    </>
  );
}

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
// import styles from "@/app/styles/ListingsPage.module.css";

// // Import filter utility & FilterPanel
// import FilterPanel from "@/app/components/FilterPanel";
// import { applyListingFilters, ListingFilterState } from "@/app/utils/filters";

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
//       } catch (err: any) {
//         setError(err.message);
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
//         className={styles.loadingWrapper}
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
//         className={styles.alertWrapper}
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
//         className={styles.alertWrapper}
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

//   // Handler to update filters from the FilterPanel child
//   const updateFilters = (newFilters: Partial<ListingFilterState>) => {
//     setFilters((prev) => ({ ...prev, ...newFilters }));
//   };

//   return (
//     <>
//       <Header />

//       <Container maxWidth="xl" sx={{ mt: 2 }}>
//         <Box display="flex" width="100%">
//           {/* LEFT COLUMN / FILTERS (20% width on desktop) */}
//           <Box
//             className={styles.filterCard}
//             flexBasis={{ xs: "100%", md: "20%" }}
//             flexGrow={0}
//             flexShrink={0}
//             mr={{ xs: 0, md: 2 }}
//             mb={{ xs: 2, md: 0 }}
//             sx={{
//               border: "1px solid #ccc",
//               borderRadius: 1,
//               backgroundColor: "#f8f8f8",
//             }}
//           >
//             <FilterPanel filters={filters} onChange={updateFilters} />
//           </Box>

//           {/* RIGHT COLUMN / LISTING CARDS (80% width on desktop) */}
//           <Box flexBasis={{ xs: "100%", md: "80%" }} minHeight="100vh">
//             <Paper sx={{ p: 2 }} elevation={0}>
//               <Typography variant="h4" textAlign="center" mb={3}>
//                 Available Listings
//               </Typography>

//               <Grid container spacing={3} alignItems="stretch">
//                 {filteredListings.map((listing) => (
//                   <Grid
//                     key={listing.id}
//                     item
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     // Ensures each grid cell can stretch to the same height
//                     style={{ display: "flex" }}
//                   >
//                     <ListingCard listing={listing} />
//                   </Grid>
//                 ))}
//               </Grid>

//               {/* If the filters result in zero listings, show a note */}
//               {filteredListings.length === 0 && (
//                 <Box mt={2}>
//                   <Alert severity="info">
//                     No listings match your selected filters.
//                   </Alert>
//                 </Box>
//               )}
//             </Paper>
//           </Box>
//         </Box>
//       </Container>
//     </>
//   );
// }
