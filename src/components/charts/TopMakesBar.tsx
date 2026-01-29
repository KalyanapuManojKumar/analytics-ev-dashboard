import { Card, CardContent, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { MakeCount } from "../../data/evAggregations";
import { ChartSkeletonHorizontalBar } from "./ChartSkeleton";

interface TopMakesBarProps {
  data: MakeCount[];
  loading?: boolean;
}

export function TopMakesBar({ data, loading }: TopMakesBarProps) {
  const chartData = data.map((d) => ({ make: d.make, count: d.count }));

  if (loading) return <ChartSkeletonHorizontalBar />;

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top makes
        </Typography>
        {!chartData.length ? (
          <Typography color="text.secondary">No data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 8, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis type="number" tick={{ fontSize: 12 }} allowDecimals={false} />
              <YAxis type="category" dataKey="make" width={56} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(value: number | undefined) => [value != null ? value.toLocaleString() : "", "Vehicles"]} />
              <Bar dataKey="count" fill="#1565c0" radius={[0, 4, 4, 0]} name="Vehicles" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
