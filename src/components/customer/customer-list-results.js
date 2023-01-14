import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridDragIcon,
  GridColumnMenu,
} from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { IconButton } from "@mui/material";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { green } from "@mui/material/colors";

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export const CustomerListResults = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const[selectedRow,setSelectedRow]=useState([]);
  const open = Boolean(anchorEl);

  var rows = [
    {  id: 1, col1: "Hello", col2: "World" },
    {  id: 2, col1: "MUI", col2: "is Amazing" },
  ];
  var columns = [
    
    { field: "id", headerName: "ID", width: 50 },
    { field: "col1", headerName: "Column 1", width: 150 },
    { field: "col2", headerName: "Column 2", width: 150 },
  ];


  // menu start
  const handleClick = (event,rowData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(rowData)
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    console.log('Edit => ',selectedRow);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    console.log('delete => ',selectedRow);
    setAnchorEl(null);
  };

  const actionColumn = [
    {
      field: 'action',
      headerName: '',
      width: 70,
      renderCell: (params) => {
        return (
          <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e)=>handleClick(e,params.row)}
          >
            <MoreVertIcon/>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleEdit} sx={{color:'green'}}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} sx={{color:'red'}}>Delete</MenuItem>
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
        rows={rows}
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

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
