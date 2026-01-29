import { FormControl, InputLabel, MenuItem, Select, Button, Stack, Box, Skeleton, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import type { EVFilters } from "../hooks/useEvData";

interface FilterOptions {
  years: number[];
  makes: string[];
  models: string[];
  types: string[];
  counties: string[];
  cities: string[];
  states: string[];
}

interface FilterBarProps {
  filters: EVFilters;
  filterOptions: FilterOptions;
  onFilterChange: <K extends keyof EVFilters>(key: K, value: EVFilters[K]) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function FilterBar({
  filters,
  filterOptions,
  onFilterChange,
  onClear,
  disabled,
}: FilterBarProps) {
  const hasActive = [
    filters.year != null,
    filters.make != null && filters.make !== "",
    filters.model != null && filters.model !== "",
    filters.vehicleType != null && filters.vehicleType !== "",
    filters.county != null && filters.county !== "",
    filters.city != null && filters.city !== "",
    filters.state != null && filters.state !== "",
  ].some(Boolean);

  return (
    <Box sx={{ mb: 2 }}>
      {disabled ? (
        <Skeleton variant="text" width={56} height={20} sx={{ mb: 1 }} />
      ) : (
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
          Filters
        </Typography>
      )}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems={{ sm: "center" }} flexWrap="wrap">
        {disabled ? (
          <>
            <Skeleton variant="rounded" width={120} height={40} />
            <Skeleton variant="rounded" width={140} height={40} />
            <Skeleton variant="rounded" width={140} height={40} />
            <Skeleton variant="rounded" width={200} height={40} />
            <Skeleton variant="rounded" width={120} height={40} />
            <Skeleton variant="rounded" width={140} height={40} />
            <Skeleton variant="rounded" width={80} height={40} />
          </>
        ) : (
          <>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filters.year != null ? String(filters.year) : ""}
            label="Year"
            onChange={(e) => onFilterChange("year", e.target.value === "" ? null : Number(e.target.value))}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.years.map((y) => (
              <MenuItem key={y} value={String(y)}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Make</InputLabel>
          <Select
            value={filters.make ?? ""}
            label="Make"
            onChange={(e) => onFilterChange("make", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.makes.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Model</InputLabel>
          <Select
            value={filters.model ?? ""}
            label="Model"
            onChange={(e) => onFilterChange("model", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.models.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Vehicle type</InputLabel>
          <Select
            value={filters.vehicleType ?? ""}
            label="Vehicle type"
            onChange={(e) => onFilterChange("vehicleType", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.types.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>County</InputLabel>
          <Select
            value={filters.county ?? ""}
            label="County"
            onChange={(e) => onFilterChange("county", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.counties.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>City</InputLabel>
          <Select
            value={filters.city ?? ""}
            label="City"
            onChange={(e) => onFilterChange("city", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.cities.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel>State</InputLabel>
          <Select
            value={filters.state ?? ""}
            label="State"
            onChange={(e) => onFilterChange("state", e.target.value === "" ? null : e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {filterOptions.states.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {hasActive && (
          <Button size="small" startIcon={<ClearIcon />} onClick={onClear}>
            Clear filters
          </Button>
        )}
          </>
        )}
      </Stack>
    </Box>
  );
}
