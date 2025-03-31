"use client";
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Listing } from "@/app/types/listing";
import styles from "../styles/ListingCard.module.css";

// Example helper function to derive a "price" from your listing's data
function getListingPrice(listing: Listing): string {
  if (listing.listing_type === "sublease" && listing.sublease_per_sqft_price) {
    return `$${listing.sublease_per_sqft_price} / SqFt`;
  }
  if (
    listing.listing_type === "3PL" &&
    listing.price_per_standard_pallet_stackable_per_month
  ) {
    return `$${listing.price_per_standard_pallet_stackable_per_month} / pallet (monthly)`;
  }
  return "N/A";
}

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  // Decide which image to display
  const displayImageObject = listing.images.find(
    (img) => img.id === listing.display_image
  );
  const defaultImageObject = listing.images[0];
  const imageToShow =
    displayImageObject?.image_url || defaultImageObject?.image_url || "";

  const priceInfo = getListingPrice(listing);

  return (
    <Card className={styles.cardContainer}>
      <CardMedia
        component="img"
        height="180"
        image={imageToShow}
        alt={listing.ListingName}
        className={styles.imageMedia}
      />

      <CardContent className={styles.content}>
        {/* Title (with line clamp) */}
        <Typography variant="h6" className={styles.title}>
          {listing.ListingName}
        </Typography>

        {/* Location block */}
        <Box className={styles.location}>
          <Typography variant="body2">{listing.Location}</Typography>
          <Typography variant="body2">
            {listing.city}, {listing.province}
          </Typography>
        </Box>

        {/* Price & other details */}
        <Box className={styles.detailsBox}>
          <Typography variant="body2">
            <strong>Price:</strong> {priceInfo}
          </Typography>
          <Typography variant="body2">
            <strong>Available SqFt:</strong> {listing.available_square_footage}
          </Typography>
          <Typography variant="body2">
            <strong>Listing Type:</strong>{" "}
            {listing.listing_type?.toUpperCase() || "N/A"}
          </Typography>
          <Typography variant="body2">
            <strong>Start Date:</strong> {listing.StartDate}
          </Typography>
          {listing.EndDate && (
            <Typography variant="body2">
              <strong>End Date:</strong> {listing.EndDate}
            </Typography>
          )}
        </Box>

        {/* Amenities/Services (short preview) */}
        {(listing.amenities.length > 0 || listing.services.length > 0) && (
          <Box className={styles.amenitiesServices}>
            {listing.amenities.length > 0 && (
              <Typography variant="body2">
                <strong>Amenities:</strong>{" "}
                {listing.amenities.slice(0, 2).join(", ")}
                {listing.amenities.length > 2 && " ..."}
              </Typography>
            )}
            {listing.services.length > 0 && (
              <Typography variant="body2">
                <strong>Services:</strong>{" "}
                {listing.services.slice(0, 2).join(", ")}
                {listing.services.length > 2 && " ..."}
              </Typography>
            )}
          </Box>
        )}
      </CardContent>

      <CardActions className={styles.actions}>
        <Button
          variant="outlined"
          size="small"
          className={styles.moreDetailsBtn}
        >
          More Details
        </Button>
      </CardActions>
    </Card>
  );
}
