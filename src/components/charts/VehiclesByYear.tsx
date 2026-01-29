import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { YearCount } from "../../data/evAggregations";
import { ChartSkeletonBar } from "./ChartSkeleton";

interface VehiclesByYearProps {
  data: YearCount[];
  loading?: boolean;
}

export function VehiclesByYear({ data, loading }: VehiclesByYearProps) {
  const chartData = data.map((d) => ({ year: String(d.year), count: d.count }));

  if (loading) return <ChartSkeletonBar />;

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicles by model year
        </Typography>
        {!chartData.length ? (
          <Typography color="text.secondary">No data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
              <Tooltip formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Count"]} />
              <Bar dataKey="count" fill="#2e7d32" radius={[4, 4, 0, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
