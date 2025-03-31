import React from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ListingFilterState } from "@/app/utils/filters";

interface FilterPanelProps {
  filters: ListingFilterState;
  onChange: (newFilters: Partial<ListingFilterState>) => void;
}

/**
 * A reusable filter UI panel that updates the parent via onChange.
 */
const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const {
    filter3PL,
    filterSublease,
    searchTitle,
    minSqft,
    maxSqft,
    minPrice,
    maxPrice,
  } = filters;

  // Helper to unify setting partial filter updates
  const handleChange = (field: keyof ListingFilterState, value: unknown) => {
    onChange({ [field]: value });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>

      {/* 3PL checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={filter3PL}
            onChange={(e) => handleChange("filter3PL", e.target.checked)}
          />
        }
        label="3PL Listings"
      />

      {/* Sublease checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={filterSublease}
            onChange={(e) => handleChange("filterSublease", e.target.checked)}
          />
        }
        label="Sublease Listings"
      />

      {/* Title search */}
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Search Title"
          variant="outlined"
          fullWidth
          value={searchTitle}
          onChange={(e) => handleChange("searchTitle", e.target.value)}
        />
      </Box>

      {/* Min/Max SQFT */}
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          type="number"
          label="Min SQFT"
          variant="outlined"
          fullWidth
          value={minSqft || ""}
          onChange={(e) =>
            handleChange(
              "minSqft",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
        <TextField
          type="number"
          label="Max SQFT"
          variant="outlined"
          fullWidth
          value={maxSqft || ""}
          onChange={(e) =>
            handleChange(
              "maxSqft",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
      </Box>

      {/* Min/Max Price */}
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <TextField
          type="number"
          label="Min Price"
          variant="outlined"
          fullWidth
          value={minPrice || ""}
          onChange={(e) =>
            handleChange(
              "minPrice",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
        <TextField
          type="number"
          label="Max Price"
          variant="outlined"
          fullWidth
          value={maxPrice || ""}
          onChange={(e) =>
            handleChange(
              "maxPrice",
              e.target.value ? Number(e.target.value) : null
            )
          }
        />
      </Box>
    </Box>
  );
};

export default FilterPanel;
