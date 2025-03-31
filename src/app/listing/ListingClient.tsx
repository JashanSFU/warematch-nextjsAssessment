"use client";

import React, { useState } from "react";
import { Box, Container, Grid, Paper, Typography, Alert } from "@mui/material";
import ListingCard from "@/app/components/ListingCard";
import FilterPanel from "@/app/components/FilterPanel";
import { Listing } from "@/app/types/listing";
import { applyListingFilters, ListingFilterState } from "@/app/utils/filters";

const SIDEBAR_WIDTH = 380;
const HEADER_HEIGHT = 64;

interface ListingsClientProps {
  listings: Listing[];
}

export default function ListingsClient({ listings }: ListingsClientProps) {
  // Move your client-side filter logic here
  const [filters, setFilters] = useState<ListingFilterState>({
    filter3PL: false,
    filterSublease: false,
    searchTitle: "",
    minSqft: null,
    maxSqft: null,
    minPrice: null,
    maxPrice: null,
  });

  // Filtered results
  const filteredListings = applyListingFilters(listings, filters);

  // Handler for child filter panel
  const updateFilters = (newFilters: Partial<ListingFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // If SSR returned zero listings:
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

  return (
    <>
      {/* Sidebar (fixed) */}
      <Box
        sx={{
          position: "fixed",
          top: HEADER_HEIGHT,
          left: 0,
          width: SIDEBAR_WIDTH,
          bottom: 0,
          overflowY: "auto",
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
          ml: `${SIDEBAR_WIDTH}px`,
          mt: 8,
          p: 2,
        }}
      >
        <Paper sx={{ p: 2 }} elevation={0}>
          <Typography variant="h4" textAlign="center" mb={3}>
            Available Listings
          </Typography>

          <Container maxWidth="xl">
            <Grid container spacing={3} justifyContent="center">
              {filteredListings.map((listing) => (
                <Grid key={listing.id} style={{ display: "flex" }}>
                  <ListingCard listing={listing} />
                </Grid>
              ))}

              {filteredListings.length === 0 && (
                <Grid>
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
