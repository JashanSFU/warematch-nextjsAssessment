"use client";

import React from "react";
import { Box, Button, Container, Typography, Paper } from "@mui/material";
import Header from "./components/Header";
import styles from "@/app/styles/HomePage.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <Box className={styles.heroSection}>
        <Box className={styles.heroOverlay}>
          <Typography variant="h3" className={styles.heroTitle}>
            Find Your Perfect Warehouse
          </Typography>
          <Typography variant="h6" className={styles.heroSubtitle}>
            Explore sublease or 3PL options for your business
          </Typography>
          <Link href="/listing">
            <Button variant="contained" size="large" color="secondary">
              View Listings
            </Button>
          </Link>
        </Box>
      </Box>

      {/* About / Intro Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          The One-Stop Warehouse Solution
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 4, maxWidth: 800, mx: "auto" }}
        >
          Whether you’re searching for sublease warehouses or a 3PL provider, we
          bring together all available listings in one convenient platform.
          Compare spaces by location, price, and amenities—and select the best
          match for your storage and logistics needs.
        </Typography>

        {/* Replace Grid/Grid2 with a Box using CSS grid */}
        <Box
          sx={{
            display: "grid",
            // 1 column on small screens, 3 columns on md+ screens
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 4,
          }}
        >
          <Paper
            elevation={0}
            sx={{ p: 3, textAlign: "center", height: "100%" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Huge Inventory
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We partner with top landlords and logistics providers to offer a
              wide range of warehouse spaces across multiple cities and
              provinces.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{ p: 3, textAlign: "center", height: "100%" }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
            >
              Simplified Search
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Filter listings by sublease vs. 3PL, available square footage, or
              price, ensuring you find the perfect match for your needs.
            </Typography>
          </Paper>

          <Paper
            elevation={0}
            sx={{ p: 3, textAlign: "center", height: "100%" }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Seamless Process
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Connect directly with warehouse owners and 3PL operators to
              finalize contracts quickly and efficiently.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* CTA or Additional Info Section */}
      <Box className={styles.ctaSection}>
        <Container>
          <Typography variant="h4" className={styles.ctaHeading}>
            Ready to Optimize Your Supply Chain?
          </Typography>
          <Typography
            variant="body1"
            className={styles.ctaText}
            sx={{ fontWeight: 600, mb: 2, textAlign: "center" }}
          >
            Discover how our platform can streamline your logistics, reduce
            overhead costs, and keep your operations moving efficiently.
          </Typography>
          <Button variant="contained" size="large">
            Explore Listings
          </Button>
        </Container>
      </Box>
    </>
  );
}
