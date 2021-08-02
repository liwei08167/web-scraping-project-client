import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Button, Grid, Collapse, Divider } from "@material-ui/core";

import LinksTable from "./LinksTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const LinksComp = () => {
  const classes = useStyles();

  const [mainlinkOpen, setMainLinkOpen] = useState(false);

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          links details:
          <Button
            onClick={() => {
              setMainLinkOpen(!mainlinkOpen);
            }}
          >
            {mainlinkOpen ? <ExpandMoreIcon /> : <NavigateNextIcon />}
          </Button>
        </Typography>
      </Grid>
      <Collapse in={mainlinkOpen} timeout="auto" unmountOnExit>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              internal link counts:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              external link counts:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              uncategorized link counts:
              <span>30</span>
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "1rem 0" }} />
        <Grid item xs={12}>
          {/* <Typography variant="h6" gutterBottom>
            show links:
            <Button
              onClick={() => {
                setLinkDetailsOpen(!linkDetailsOpen);
              }}
            >
              {linkDetailsOpen ? <ExpandMoreIcon /> : <NavigateNextIcon />}
            </Button>
          </Typography> */}
          <LinksTable />
        </Grid>
        {/* <Collapse in={linkDetailsOpen} timeout="auto" unmountOnExit>
          <h1>happy pig</h1>
        </Collapse> */}
      </Collapse>
    </Grid>
  );
};

export default LinksComp;
