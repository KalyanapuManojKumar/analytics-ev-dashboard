import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { TypeCount } from "../../data/evAggregations";
import { ChartSkeletonPie } from "./ChartSkeleton";

interface VehicleTypePieProps {
  data: TypeCount[];
  loading?: boolean;
}

const COLORS = ["#2e7d32", "#1565c0", "#757575"];

function shortLabel(type: string): string {
  if (type.includes("Battery Electric")) return "BEV";
  if (type.includes("Plug-in Hybrid")) return "PHEV";
  return type.slice(0, 12);
}

export function VehicleTypePie({ data, loading }: VehicleTypePieProps) {
  const chartData = data.map((d) => ({ name: shortLabel(d.type), value: d.count, fullName: d.type }));

  if (loading) return <ChartSkeletonPie />;

  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Vehicle type
        </Typography>
        {!chartData.length ? (
          <Typography color="text.secondary">No data</Typography>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, value }) => `${name}: ${value.toLocaleString()}`}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number | undefined, _: unknown, item: unknown) => [value != null ? value.toLocaleString() : "", (item as { payload?: { fullName?: string } })?.payload?.fullName ?? ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
