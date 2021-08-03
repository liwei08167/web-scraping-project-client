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
    color: "black",
  },
}));

const ImagesComp = ({ imageDetails }) => {
  const classes = useStyles();
  const [imgOpen, setImgOpen] = useState(false);

  const filteredImage = imageDetails.filter((img) => img.imageSize !== null);

  const maxImage =
    filteredImage.length > 0
      ? Math.max(...filteredImage.map((img) => img.imageSize))
      : undefined;
  const maxImageItem =
    maxImage &&
    filteredImage[filteredImage.findIndex((num) => num.imageSize === maxImage)];
  console.log({ filteredImage, maxImageItem, maxImage });
  const isValidImageUrl = maxImageItem && maxImageItem.src.startsWith("http");

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
              <Paper
                className={classes.paper}
                style={{ height: "20vh", overflow: "auto" }}
              >
                <Typography variant="h6" gutterBottom>
                  image counts: <span>{imageDetails.length}</span>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  largest size:{" "}
                  <span>
                    {maxImageItem &&
                      `${maxImageItem.height} x ${maxImageItem.width}`}
                  </span>
                </Typography>
                <Typography variant="h6" gutterBottom>
                  largest image link:{" "}
                  <Typography
                    variant="body2"
                    style={{ color: "black", wordWrap: "break-word" }}
                  >
                    {maxImageItem && `${maxImageItem.src}`}
                  </Typography>
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper} style={{ height: "20vh" }}>
                <img
                  src={
                    isValidImageUrl
                      ? maxImageItem.src
                      : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg
                  `
                  }
                  alt="largest img"
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
