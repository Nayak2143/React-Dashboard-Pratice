import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/* ---------------- TYPES ---------------- */

export interface Column<T> {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  id?: string; // ⭐ stable key support
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
}

/* ---------------- COMPONENT ---------------- */

export default function DataTable<T>({
  columns,
  data,
  loading = false,
}: Props<T>) {
  return (
    <div className="rounded border bg-white dark:bg-zinc-900 overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col.id ?? col.header}>
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {/* LOADING */}
          {loading && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8"
              >
                Loading...
              </TableCell>
            </TableRow>
          )}

          {/* EMPTY */}
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center py-8"
              >
                No Data Found
              </TableCell>
            </TableRow>
          )}

          {/* DATA */}
          {!loading &&
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col) => {
                  let value: React.ReactNode = "-";

                  if (col.render) {
                    value = col.render(row);
                  } else if (col.accessor) {
                    const cell = row[col.accessor];
                    value =
                      cell !== null && cell !== undefined
                        ? String(cell)
                        : "-";
                  }

                  return (
                    <TableCell
                      key={col.id ?? col.header}
                    >
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
