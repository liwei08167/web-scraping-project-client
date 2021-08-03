import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import TablePaginationActions from "./TablePaginationActions";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Ice cream sandwich", 237, 9.0),
  createData("Jelly Bean", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const LinksTable = (linksProps) => {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = Object.keys(linksProps).slice(0, -1);

  console.log({ options, linksProps });

  const emptyRows =
    selectedOption !== "" &&
    rowsPerPage -
      Math.min(
        rowsPerPage,
        linksProps[selectedOption].weblinks.length - page * rowsPerPage
      );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //here is for the form dropdown
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <FormControl
        style={{ minWidth: "12rem", margin: ".5rem 0" }}
        variant="outlined"
        size="small"
      >
        <InputLabel
          required
          style={{
            fontSize: "1rem",
            color: "blue",
            textTransform: "capitalize",
          }}
        >
          choose link types
        </InputLabel>
        <Select
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectedOption}
          onChange={handleChange}
        >
          {options &&
            options.map((el) => (
              <MenuItem value={el} key={el}>
                {el}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <Grid item xs={12}>
        {selectedOption !== "" && (
          <TableContainer component={Paper} style={{ wordBreak: "break-word" }}>
            <Table aria-label="custom pagination table">
              <TableBody>
                {(
                  selectedOption !== "" &&
                  rowsPerPage > 0 &&
                  linksProps[selectedOption].weblinks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                ).map((link, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: "10%" }} align="left">
                      {index + 1}.
                    </TableCell>
                    <TableCell
                      style={{ width: "80%", padding: ".7rem" }}
                      align="left"
                    >
                      <a href={link}>{link}</a>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10, 15, 25,
                      // { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={
                      selectedOption !== "" &&
                      linksProps[selectedOption].weblinks.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { "aria-label": "rows per page" },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </>
  );
};

export default LinksTable;
