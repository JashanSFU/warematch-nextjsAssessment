import { Listing } from "@/app/types/listing";

/** Define the shape of our filter state */
export interface ListingFilterState {
  filter3PL: boolean;
  filterSublease: boolean;
  searchTitle: string;      // partial match in ListingName
  minSqft: number | null;
  maxSqft: number | null;
  minPrice: number | null;
  maxPrice: number | null;
}

/**
 * Utility function: extracts a numeric "price" from a listing
 * depending on whether it's sublease or 3PL. In reality, your logic
 * may vary (some listings have multiple price fields).
 */
function getListingPrice(listing: Listing): number | null {
  // Example: if sublease, use sublease_per_sqft_price
  if (listing.listing_type === "sublease" && listing.sublease_per_sqft_price) {
    return parseFloat(listing.sublease_per_sqft_price);
  }
  
  // Example: if 3PL, use price_per_standard_pallet_stackable_per_month 
  // (or whichever field is most relevant)
  if (listing.listing_type === "3PL" && listing.price_per_standard_pallet_stackable_per_month) {
    return parseFloat(listing.price_per_standard_pallet_stackable_per_month);
  }

  // If no known price or different listing_type, return null or 0
  return null;
}

/**
 * Main filter function:
 * Applies all filter conditions to the array of listings.
 */
export function applyListingFilters(
  listings: Listing[],
  filters: ListingFilterState
): Listing[] {
  const {
    filter3PL,
    filterSublease,
    searchTitle,
    minSqft,
    maxSqft,
    minPrice,
    maxPrice,
  } = filters;

  return listings.filter((listing) => {
    // 1. Filter by listing type (3PL vs sublease).
    // If neither is checked, show all. If one is checked, show only that type.
    // If both are checked, show either.
    const is3PL = listing.listing_type === "3PL";
    const isSublease = listing.listing_type === "sublease";
    if (filter3PL && !filterSublease && !is3PL) return false;
    if (!filter3PL && filterSublease && !isSublease) return false;
    if (!filter3PL && !filterSublease) {
      // do nothing => show everything
    }
    // if both are true => show 3PL or sublease => do nothing special:
    // but note some listings might be "direct_warehouse" or other.
    // If you want to exclude those unless both are unchecked, you'd do more logic.

    // 2. Filter by title (case-insensitive partial match on ListingName)
    const listingName = listing.ListingName?.toLowerCase() || "";
    const query = searchTitle.toLowerCase();
    if (query && !listingName.includes(query)) {
      return false;
    }

    // 3. Filter by min/max available sqft
    const sqft = parseFloat(listing.available_square_footage || "0");
    if (minSqft !== null && sqft < minSqft) return false;
    if (maxSqft !== null && sqft > maxSqft) return false;

    // 4. Filter by min/max price
    const price = getListingPrice(listing);
    if (price !== null) {
      if (minPrice !== null && price < minPrice) return false;
      if (maxPrice !== null && price > maxPrice) return false;
    } else {
      // If the listing has no numeric price, decide if you want to exclude it or include it
      // Let's include it by default. If you prefer to exclude such listings, return false:
      // return false;
    }

    return true;
  });
}
