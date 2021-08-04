import React, { useState } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Button, Grid, Collapse, Divider } from "@material-ui/core";

import LinksTable from "./LinksTable";

const LinksComp = ({ linksDetails }) => {
  const [mainlinkOpen, setMainLinkOpen] = useState(false);
  const { external, internal, totalLinks, uncategorized } = linksDetails;

  return (
    <Grid item xs={12}>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          Links counts: {totalLinks}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Details:
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
              internal counts: {internal.count}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              external counts:{external.count}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle1" gutterBottom>
              uncategorized counts: {uncategorized.count}
            </Typography>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "1rem 0" }} />
        <Grid item xs={12}>
          <LinksTable
            external={external}
            internal={internal}
            uncategorized={uncategorized}
          />
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default LinksComp;
