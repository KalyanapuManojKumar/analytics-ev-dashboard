import {
  AppBar,
  Box,
  Container,
  Grid,
  Toolbar,
  Typography,
  Alert,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useEvData } from "./hooks/useEvData";
import { KpiGrid } from "./components/KpiGrid";
import { FilterBar } from "./components/FilterBar";
import { VehiclesByYear } from "./components/charts/VehiclesByYear";
import { TopMakesBar } from "./components/charts/TopMakesBar";
import { VehicleTypePie } from "./components/charts/VehicleTypePie";
import { RangeHistogram } from "./components/charts/RangeHistogram";
import { EvTable } from "./components/EvTable";

function App() {
  const {
    filteredData,
    summary,
    loading,
    error,
    filters,
    filterOptions,
    setFilter,
    clearFilters,
  } = useEvData();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          py: 0.5,
          backgroundColor: "rgba(46, 125, 50, 0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 72 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.15)",
              }}
            >
              <DirectionsCarIcon sx={{ fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                }}
              >
                Electric Vehicle Population Analytics
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, mt: 0.25, fontWeight: 500 }}
              >
                Explore registration data and trends
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ pt: { xs: "72px", sm: "80px" } }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <KpiGrid summary={summary} loading={loading} />
          <Box sx={{ mt: 3 }}>
            <FilterBar
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={setFilter}
              onClear={clearFilters}
              disabled={loading}
            />
          </Box>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <VehiclesByYear data={summary.byYear} loading={loading} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TopMakesBar data={summary.topMakes} loading={loading} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <VehicleTypePie data={summary.byType} loading={loading} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <RangeHistogram data={summary.rangeBuckets} loading={loading} />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <EvTable data={filteredData} loading={loading} pageSize={10} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
