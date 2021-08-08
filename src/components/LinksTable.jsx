import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Grid,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Typography,
} from "@material-ui/core";

import TablePaginationActions from "./TablePaginationActions";

const LinksTable = (linksProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = Object.keys(linksProps).slice(0, -1);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    if (event.target.value === "-1") {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    } else {
      setRowsPerPage(parseInt(event.target.value));
    }
  };

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
              <MenuItem
                value={el}
                key={el}
                style={{ textTransform: "capitalize" }}
              >
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
                {(selectedOption !== "" && rowsPerPage > 0 && rowsPerPage > -1
                  ? linksProps[selectedOption].weblinks.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : linksProps[selectedOption].weblinks
                ).map((link, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ width: "10%" }} align="left">
                      {index + 1}.
                    </TableCell>
                    <TableCell
                      style={{ width: "80%", padding: ".7rem" }}
                      align="left"
                    >
                      {selectedOption === "internal" ? (
                        `${link}`
                      ) : (
                        <a href={link}>{link}</a>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {linksProps[selectedOption].weblinks.length === 0 && (
                  <Typography variant="body1" style={{ marginTop: "1rem" }}>
                    No Result
                  </Typography>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      10,
                      15,
                      25,
                      { label: "All", value: -1 },
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
