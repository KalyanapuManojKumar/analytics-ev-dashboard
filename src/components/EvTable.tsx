import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box,
  Skeleton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import type { EVRecord } from "../data/ev";

interface EvTableProps {
  data: EVRecord[];
  loading?: boolean;
  pageSize?: number;
}

const COLUMNS: Array<{ id: keyof EVRecord; label: string; width?: string }> = [
  { id: "county", label: "County", width: "12%" },
  { id: "city", label: "City", width: "12%" },
  { id: "state", label: "State", width: "8%" },
  { id: "modelYear", label: "Year", width: "8%" },
  { id: "make", label: "Make", width: "12%" },
  { id: "model", label: "Model", width: "14%" },
  { id: "electricVehicleType", label: "Type", width: "22%" },
  { id: "electricRange", label: "Range (mi)", width: "10%" },
];

/** Returns true if the row matches the search term in any of the table columns. */
function rowMatchesSearch(row: EVRecord, searchTrim: string, columns: Array<{ id: keyof EVRecord }>): boolean {
  if (!searchTrim) return true;
  const lower = searchTrim.toLowerCase();
  for (const col of columns) {
    const val = row[col.id];
    const str = val != null ? String(val).toLowerCase() : "";
    if (str.includes(lower)) return true;
  }
  return false;
}

export function EvTable({ data, loading, pageSize = 10 }: EvTableProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [search, setSearch] = useState("");

  const searchFiltered = useMemo(() => {
    const trim = search.trim();
    if (!trim) return data;
    return data.filter((row) => rowMatchesSearch(row, trim, COLUMNS));
  }, [data, search]);

  const sliced = useMemo(() => {
    const start = page * rowsPerPage;
    return searchFiltered.slice(start, start + rowsPerPage);
  }, [searchFiltered, page, rowsPerPage]);

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const typeShort = (type: string) => {
    if (type.includes("Battery Electric")) return "BEV";
    if (type.includes("Plug-in Hybrid")) return "PHEV";
    return type.slice(0, 15);
  };

  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width={120} height={28} sx={{ mb: 1 }} />
        <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {COLUMNS.map((col) => (
                  <TableCell key={col.id} sx={{ fontWeight: 600, width: col.width }}>
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {COLUMNS.map((col) => (
                    <TableCell key={col.id}>
                      <Skeleton variant="text" width="80%" height={20} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", py: 1, px: 0 }}>
          <Skeleton variant="text" width={80} height={24} />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Skeleton variant="rounded" width={32} height={32} />
            <Skeleton variant="rounded" width={32} height={32} />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1.5 }}>
        <Typography variant="h6">Vehicle list</Typography>
        <TextField
          size="small"
          placeholder="Search all columns…"
          value={search}
          onChange={handleSearchChange}
          sx={{ minWidth: 240 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 440 }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              {COLUMNS.map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: 600, width: col.width }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sliced.length === 0 ? (
              <TableRow>
                <TableCell colSpan={COLUMNS.length} align="center">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              sliced.map((row, idx) => (
                <TableRow key={`${row.vin}-${row.dolVehicleId}-${idx}`} hover>
                  <TableCell>{row.county}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.state}</TableCell>
                  <TableCell>{row.modelYear}</TableCell>
                  <TableCell>{row.make}</TableCell>
                  <TableCell>{row.model}</TableCell>
                  <TableCell>{typeShort(row.electricVehicleType)}</TableCell>
                  <TableCell>{row.electricRange > 0 ? row.electricRange : "—"}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={searchFiltered.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
        labelRowsPerPage="Rows:"
      />
    </Box>
  );
}
