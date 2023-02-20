import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import axios from "axios";

export const RoomListResults = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const hotelType = localStorage.getItem("hotelType");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/room/hotel/" + localStorage.getItem("id"),
          localStorage.getItem("id")
        );
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(tableData);

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "capacity", headerName: "Capacity", width: 80 },
    { field: "bed_count", headerName: "Bed", width: 70 },
    {
      field: "isBooking",
      headerName: "Booking status",
      width: 150,
      renderCell: (params) => {
        return params.row.isBooking == true ? (
          <div className="">✔ Booked</div>
        ) : (
          <div className="">❌ Not Booked</div>
        );
      },
    },
  ];

  const trim = tableData?.map((data) => {
    return {
      id: data._id,
      type: data.type,
      price: data.price,
      description: data.description,
      capacity: data.capacity,
      bed_count: data.bed_count,
      isBooking: data.isBooking,
      // created_at: data.created_at,
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
  const handleEdit = (href) => {
    router.push("/rooms/edit/" + href);
    setAnchorEl(null);
  };
  const handleDelete = (href) => {
    router.push("/rooms/delete/" + href);
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
              <MenuItem onClick={() => handleEdit(selectedRow.id)} sx={{ color: "green" }}>
                Edit
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
