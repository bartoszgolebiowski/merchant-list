import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid, GridPageChangeParams } from "@material-ui/data-grid";

import CommonError from "common/components/CommonError";
import { BIDS_PAGINATION_OPTIONS } from "common/reactQuery";
import { useBids } from "services/useBids";

import columns from "./detailsColumns";

type DetailsTableProps = {
  id: string;
};

const useStyles = makeStyles(() => ({
  container: {
    height: "28rem",
    width: "100%",
  },
}));

const DetailsTable: React.FC<DetailsTableProps> = (props) => {
  const { id } = props;
  const { status, data, page, size, setPage, setSize } = useBids(id);
  const c = useStyles();

  const handlePageChange = (params: GridPageChangeParams) => {
    setPage(params.page);
  };

  const handleSizeChange = (params: GridPageChangeParams) => {
    setSize(params.pageSize);
  };

  if (status === "error") return <CommonError />;

  return (
    <div className={c.container}>
      <DataGrid
        columns={columns}
        rows={data?.results || []}
        loading={status === "loading"}
        page={page}
        onPageChange={handlePageChange}
        onPageSizeChange={handleSizeChange}
        rowsPerPageOptions={BIDS_PAGINATION_OPTIONS}
        rowCount={data?.meta.total || 0}
        disableSelectionOnClick
        pageSize={size}
        paginationMode="server"
        pagination
      />
    </div>
  );
};

export default DetailsTable;
