import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
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

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export const CustomerListResults = () => {

  const { data } = useDemoData({
    dataSet: "Employee",
    visibleFields: VISIBLE_FIELDS,
    rowLength: 100,
  });

  return (
    
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <DataGrid
            {...data}
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              ...data.initialState,
              filter: {
                filterModel: {
                  items: [
                    {
                      columnField: "rating",
                      operatorValue: ">",
                      value: "2.5",
                    },
                  ],
                },
              },
            }}
          />
         
        </Box>
      </PerfectScrollbar>
     
    
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
