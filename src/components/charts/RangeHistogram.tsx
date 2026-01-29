import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { RangeBucket } from "../../data/evAggregations";
import { ChartSkeletonHistogram } from "./ChartSkeleton";

interface RangeHistogramProps {
  data: RangeBucket[];
  loading?: boolean;
}

export function RangeHistogram({ data, loading }: RangeHistogramProps) {
  const chartData = data.map((d) => ({ label: d.label, count: d.count, range: `${d.min}-${d.max} mi` }));

  if (loading) return <ChartSkeletonHistogram />;

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Electric range distribution (miles)
        </Typography>
        {!chartData.length ? (
          <Typography color="text.secondary">No data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip
          formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Vehicles"]}
          labelFormatter={(_, payload) => {
            const p = Array.isArray(payload) ? payload[0] : undefined;
            return (p && typeof p === "object" && "payload" in p && p.payload && typeof p.payload === "object" && "range" in p.payload) ? String((p.payload as { range: string }).range) : "";
          }}
        />
              <Bar dataKey="count" fill="#6a1b9a" radius={[4, 4, 0, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
