import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import HeadingsTable from "./HeadingsTable";
import ImagesComp from "./ImagesComp";
import LinksComp from "./LinksComp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0 1rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: "black",
    minHeight: "2rem",
  },
}));

const ResultsComp = ({ fetchedData, urlValue }) => {
  const classes = useStyles();
  console.log({ fetchedData });
  const {
    doctypeVersion,
    headingsDetails,
    imageDetails,
    linksDetails,
    loadingTimeInMs,
    title,
  } = fetchedData;
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            URL:
            <span style={{ color: "black", wordWrap: "break-word" }}>
              {urlValue}
            </span>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Title:
            <span style={{ color: "black", wordWrap: "break-word" }}>
              {" "}
              {title}
            </span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Doctype Version:
            <span style={{ color: "black" }}> {doctypeVersion}</span>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            Loading Time:
            <span style={{ color: "black" }}> {loadingTimeInMs} ms</span>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <HeadingsTable headingsDetails={headingsDetails} />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <ImagesComp imageDetails={imageDetails} />
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container>
              <LinksComp linksDetails={linksDetails} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ResultsComp;
