import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Button, Paper, Grid, Collapse } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ImagesComp = () => {
  const classes = useStyles();
  const [imgOpen, setImgOpen] = useState(false);
  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            image details:
            <Button
              onClick={() => {
                setImgOpen(!imgOpen);
              }}
            >
              {imgOpen ? <ExpandMoreIcon /> : <NavigateNextIcon />}
            </Button>
          </Typography>
        </Grid>
        <Collapse in={imgOpen} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper className={classes.paper} style={{ height: "20vh" }}>
                <Typography variant="h6" gutterBottom>
                  image counts:
                </Typography>
                <Typography variant="h6" gutterBottom>
                  largest size:
                </Typography>
                <Typography variant="h6" gutterBottom></Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} style={{ height: "20vh" }}>
                <img
                  src="https://i.redd.it/h6dzhx3dnrz41.jpg"
                  alt="BigCo Inc. logo"
                  style={{
                    maxWidth: "20vh",
                    maxHeight: "30vh",
                    width: "auto",
                    height: "auto",
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </>
  );
};

export default ImagesComp;
