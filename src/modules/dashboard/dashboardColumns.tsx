import { GridCellParams, GridColumns } from "@material-ui/data-grid";
import CommonAvatar from "common/components/CommonAvatar";

import DashboardHasPremiumCell from "./Cell/DashboardHasPremiumCell";
import DashboardEditCell from "./Cell/DashboardEditCell";
import DashboardBidCell from "./Cell/DashboardBidCell";
import DashboardDeleteCell from "./Cell/DashboardDeleteCell";
import { Merchant } from "types";

const columns: GridColumns = [
  {
    headerName: "Avatar",
    field: "avatarUrl",
    width: 110,
    renderCell: (params: GridCellParams) => {
      return (
        <CommonAvatar
          alt={`${params.row.firstname} ${params.row.lastname}`}
          src={String(params.value)}
        />
      );
    },
  },
  {
    headerName: "Bids",
    field: "bids",
    renderCell: (params: GridCellParams) => {
      return <DashboardBidCell merchantId={params.row.id as string} />;
    },
  },
  { headerName: "FirstName", field: "firstname", width: 200 },
  { headerName: "LastName", field: "lastname", width: 200 },
  { headerName: "Email", field: "email", width: 300 },
  { headerName: "Phone", field: "phone", width: 300 },
  {
    headerName: "Has premium",
    field: "hasPremium",
    width: 175,
    renderCell: (params: GridCellParams) => {
      return <DashboardHasPremiumCell hasPremium={Boolean(params.value)} />;
    },
  },
  {
    headerName: "Edit",
    field: "edit",
    renderCell: (params: GridCellParams) => {
      return <DashboardEditCell row={params.row as Merchant} />;
    },
  },
  {
    headerName: "Delete",
    field: "delete",
    width: 125,
    renderCell: (params: GridCellParams) => {
      return <DashboardDeleteCell id={params.row.id as string} />;
    },
  },
];

export default columns;
