import { Card, CardContent, Skeleton, Box } from "@mui/material";

const CHART_HEIGHT = 280;
const TITLE_HEIGHT = 28;

/** Shared card wrapper for chart skeletons. */
function ChartCard({ children }: { children: React.ReactNode }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Skeleton variant="text" width="60%" height={TITLE_HEIGHT} sx={{ mb: 1 }} />
        {children}
      </CardContent>
    </Card>
  );
}

/** Vertical bar chart skeleton – for "Vehicles by model year" (discrete years, spaced bars). */
export function ChartSkeletonBar() {
  const heights = [40, 65, 45, 80, 55, 70, 50, 90, 60];
  return (
    <ChartCard>
      <Box sx={{ height: CHART_HEIGHT, display: "flex", alignItems: "flex-end", gap: 0.75, px: 0.5 }}>
        {heights.map((h, i) => (
          <Skeleton key={i} variant="rounded" sx={{ flex: 1, height: `${h}%`, minHeight: 20, borderRadius: "4px 4px 0 0" }} />
        ))}
      </Box>
    </ChartCard>
  );
}

/** Histogram skeleton – for "Electric range distribution" (continuous bins, touching bars, distribution shape). */
export function ChartSkeletonHistogram() {
  // Distribution-like heights: ramps up, peaks, then tapers (suggests range bins)
  const heights = [25, 45, 70, 88, 95, 85, 72, 58, 42, 35, 28, 22];
  return (
    <ChartCard>
      <Box sx={{ height: CHART_HEIGHT, display: "flex", alignItems: "flex-end", gap: 0.25, px: 0.5 }}>
        {heights.map((h, i) => (
          <Skeleton key={i} variant="rounded" sx={{ flex: 1, height: `${h}%`, minHeight: 16, borderRadius: "2px 2px 0 0" }} />
        ))}
      </Box>
    </ChartCard>
  );
}

/** Horizontal bar chart skeleton – for "Top makes" (category labels on left, bars to the right). */
export function ChartSkeletonHorizontalBar() {
  const widths = [85, 60, 72, 45, 90, 55, 78, 65];
  return (
    <ChartCard>
      <Box sx={{ height: CHART_HEIGHT, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: 1.5, py: 1 }}>
        {widths.map((w, i) => (
          <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Skeleton variant="text" width={64} height={18} sx={{ flexShrink: 0 }} />
            <Skeleton variant="rounded" sx={{ height: 20, width: `${w}%`, borderRadius: "0 4px 4px 0" }} />
          </Box>
        ))}
      </Box>
    </ChartCard>
  );
}

/** Pie chart skeleton – for "Vehicle type" (circle with segment hint). */
export function ChartSkeletonPie() {
  return (
    <ChartCard>
      <Box sx={{ height: CHART_HEIGHT, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <Skeleton variant="circular" width={180} height={180} />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Skeleton variant="text" width={48} height={20} />
          <Skeleton variant="text" width={36} height={16} />
        </Box>
        <Box sx={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 1 }}>
          {[1, 2, 3].map((i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Skeleton variant="rounded" width={12} height={12} sx={{ borderRadius: 1 }} />
              <Skeleton variant="text" width={56} height={18} />
            </Box>
          ))}
        </Box>
      </Box>
    </ChartCard>
  );
}

