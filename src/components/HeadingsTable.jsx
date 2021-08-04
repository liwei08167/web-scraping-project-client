import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Collapse,
} from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "lightblue",
    color: theme.palette.common.white,
    padding: "1rem",
  },
  body: {
    fontSize: 14,
    padding: ".6rem",
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const groupByHeadings = (headingList, headingProperty) => {
  return headingList.reduce((acc, current) => {
    let heading = current[headingProperty];
    if (!acc[heading]) {
      acc[heading] = [];
    }
    acc[heading].push(current);
    // const uniqueLevel = acc[heading]
    //   .map((e) => e.level)
    //   .filter((v, i, arr) => arr.indexOf(v) === i)
    //   .sort((a, b) => a - b)
    //   .join(", ");

    // acc[heading].level = uniqueLevel;

    return acc;
  }, {});
};

const HeadingsTable = ({ headingsDetails }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let groupedHeadings =
    headingsDetails && groupByHeadings(headingsDetails, "headings");

  console.log({ groupedHeadings });
  let uniqueLevelArr = [];
  for (const heading in groupedHeadings) {
    uniqueLevelArr.push({
      headings: heading,
      existingLevels: groupedHeadings[heading]
        .map((e) => e.level)
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .sort((a, b) => a - b),
      counts: groupedHeadings[heading].length,
    });
  }
  console.log({ uniqueLevelArr });

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Heading counts: {headingsDetails && headingsDetails.length}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Details:
          <Button
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <ExpandMoreIcon /> : <NavigateNextIcon />}
          </Button>
        </Typography>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow style={{ backgroundColor: "lightblue" }}>
                  <StyledTableCell>Headings</StyledTableCell>
                  <StyledTableCell> Levels</StyledTableCell>
                  <StyledTableCell> Counts</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uniqueLevelArr &&
                  uniqueLevelArr.map((h, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {h.headings}
                      </TableCell>
                      <TableCell>{h.existingLevels.join(", ")}</TableCell>
                      <TableCell>{h.counts}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default HeadingsTable;
