import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DataGrid, GridToolbar, GridColumnMenu } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const OfferListResults = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState([]);
  const [tableData, setTableData] = useState([]);
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://taprobanarome.azurewebsites.net//offer/" + localStorage.getItem("id"),
          localStorage.getItem("id")
        );
        setTableData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const notifySuccess = () =>
    toast.success("Offer Deleted  Successfuly", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyError = () =>
    toast.error("Offer Deleted Error", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  console.log(tableData);

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "discount", headerName: "Discount Amount", width: 150 },
    { field: "expireTime", headerName: "Expire Time", width: 300 },
  ];

  const rows = [
    {
      id: 1,
      description: "MUI",
      discount: 10,
      expireTime: "12.00",
    },
    {
      id: 2,
      description: "DataGridPro",
      discount: 15,
      expireTime: "01.30",
    },
  ];

  const trim = tableData?.map((data) => {
    return {
      id: data._id,
      description: data.description,
      discount: data.discount,
      expireTime: data.expireTime,
    };
  });


  const deleteOffer = async (offerId) => {
    await axios
      .delete("https://taprobanarome.azurewebsites.net//offer/" + offerId)
      .then((response) => {
        console.log("roomId", response.data._id);
      })
      .catch((err) => console.log(err));
  };

  // menu start
  const handleClick = (event, rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (href) => {
    router.push("/offers/edit/" + href);
    setAnchorEl(null);
  };
  const handleDelete = (href) => {
    let result = confirm("Do you want to delete '" + href + "' offer");
    if (result === true) {
      deleteOffer(href)
        .then(notifySuccess())
        .catch((err) => notifyError());
    }
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
      <ToastContainer />
    </div>
  );
};
