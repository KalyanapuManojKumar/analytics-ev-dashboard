import { Card, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import EvStationIcon from "@mui/icons-material/EvStation";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PlaceIcon from "@mui/icons-material/Place";
import type { EVSummary } from "../data/evAggregations";

interface KpiGridProps {
  summary: EVSummary;
  loading?: boolean;
}

const kpiCards: Array<{
  key: keyof EVSummary;
  label: string;
  format: (s: EVSummary) => string;
  icon: React.ReactNode;
}> = [
  {
    key: "total",
    label: "Total vehicles",
    format: (s) => s.total.toLocaleString(),
    icon: <DirectionsCarIcon />,
  },
  {
    key: "bevCount",
    label: "Battery electric (BEV)",
    format: (s) => s.bevCount.toLocaleString(),
    icon: <BatteryChargingFullIcon />,
  },
  {
    key: "phevCount",
    label: "Plug-in hybrid (PHEV)",
    format: (s) => s.phevCount.toLocaleString(),
    icon: <EvStationIcon />,
  },
  {
    key: "avgElectricRange",
    label: "Avg electric range (mi)",
    format: (s) => (s.avgElectricRange > 0 ? `${s.avgElectricRange}` : "—"),
    icon: <TrendingUpIcon />,
  },
  {
    key: "topMakes",
    label: "Top make",
    format: (s) => (s.topMakes[0]?.make ?? "—"),
    icon: <PlaceIcon />,
  },
];

export function KpiGrid({ summary, loading }: KpiGridProps) {
  return (
    <Grid container spacing={2}>
      {kpiCards.map(({ label, format, icon }) => (
        <Grid key={label} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              {loading ? (
                <>
                  <Skeleton variant="text" width="70%" height={20} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="50%" height={32} />
                </>
              ) : (
                <>
                  <Typography color="text.secondary" variant="body2" gutterBottom>
                    {label}
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {icon}
                    {format(summary)}
                  </Typography>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
