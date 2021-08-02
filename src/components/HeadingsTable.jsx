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

// const StyledTableRow = withStyles((theme) => ({
//   root: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//   },
// }))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const groupByHeadings = (headingList, level) => {
  return headingList.reduce((acc, obj) => {
    let key = obj[level];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const HeadingsTable = ({ headingsDetails }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  let groupedHeadings =
    headingsDetails && groupByHeadings(headingsDetails, "headings");

  let uniqueLevelArr = [];
  for (const heading in groupedHeadings) {
    uniqueLevelArr.push({
      headings: heading,
      existingLevels: groupedHeadings[heading]
        .map((e) => e.level)
        .filter((v, i, arr) => arr.indexOf(v) === i)
        .sort((a, b) => a - b),
    });
  }
  console.log({ uniqueLevelArr });

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Heading counts: {headingsDetails && headingsDetails.length}
        </Typography>
        <Typography variant="h5" gutterBottom>
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
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "lightblue" }}>
                  <StyledTableCell>Headings</StyledTableCell>
                  <StyledTableCell> levels</StyledTableCell>
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
