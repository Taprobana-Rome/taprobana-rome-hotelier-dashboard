import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import axios from "axios";

export const ReviewListResults = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const hotelId = localStorage.getItem("id");

  // console.log(tableData[2].createdAt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/review/" + hotelId);
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "review", headerName: "Review", width: 200 },
    { field: "reply", headerName: "Reply", width: 200 },
    { field: "createdAt", headerName: "Created at", width: 150 },
  ];

  const trim = tableData?.map((data) => {
    return {
      id: data._id,
      review: data.review,
      reply: data.reply,
      createdAt: data.createdAt,
    };
  });

  // menu start
  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleReply = (href) => {
    router.push("/reviews/" + href);
    setAnchorEl(null);
  };
  const handleDelete = (href) => {
    // router.push("/reviews/delete/" + href);
    setAnchorEl(null);
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "",
      width: 70,
      renderCell: (params) => {
        return (
          <div>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => handleClick(e, params.row)}
            >
              <MoreVertIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => handleReply(selectedRow.id)} sx={{ color: "green" }}>
                Reply
              </MenuItem>
              <MenuItem onClick={() => handleDelete(selectedRow.id)} sx={{ color: "red" }}>
                Delete
              </MenuItem>
            </Menu>
          </div>
        );
      },
    },
  ];

  // menu end
  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={trim}
        columns={actionColumn.concat(columns)}
        components={{
          Toolbar: GridToolbar,
          ColumnMenu: GridColumnMenu,
        }}
        autoHeight={true}
        pageSize={10}
        rowsPerPageOptions={[10]}
        sx={{
          backgroundColor: "white",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};
