import { GridCellParams, GridColumns } from "@material-ui/data-grid";
import { formatDate, FULL_FORMAT } from "utils/date";

const columns: GridColumns = [
  {
    headerName: "CarTitle",
    field: "carTitle",
    flex: 1,
  },
  {
    headerName: "Created At",
    field: "created",
    type: "dateTime",
    flex: 1,
    renderCell: (params: GridCellParams) => {
      return <span>{formatDate(params.value as string, FULL_FORMAT)}</span>;
    },
  },
  {
    headerName: "Amount",
    field: "amount",
    type: "number",
    flex: 1,
  },
];

export default columns;
