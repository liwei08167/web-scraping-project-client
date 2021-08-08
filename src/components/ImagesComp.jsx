import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, Button, Paper, Grid, Collapse } from "@material-ui/core";
import { ExpandLessRounded } from "@material-ui/icons";

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

  const filteredImage =
    imageDetails.length > 0 &&
    imageDetails.filter((img) => img.imageSize !== null && img.src !== null);

  const maxImage =
    filteredImage.length > 0
      ? Math.max(...filteredImage.map((img) => img.imageSize))
      : undefined;
  const maxImageItem =
    maxImage &&
    filteredImage[filteredImage.findIndex((num) => num.imageSize === maxImage)];

  const isValidImageUrl = maxImageItem && maxImageItem.src.startsWith("http");

  // let newSrcUrl = null;

  // const displayImage = (filteredImage, maxImageItem, defaultImageUrl) => {
  //   var expression =
  //     /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  //   const regex = new RegExp(expression);
  //   if (maxImageItem) {
  //     newSrcUrl =
  //       maxImageItem.src && maxImageItem.src.startsWith("http")
  //         ? maxImageItem.src
  //         : "https:" + maxImageItem.src;
  //     const isValidUrl = regex.test(newSrcUrl);

  //     if (isValidUrl) {
  //       return newSrcUrl;
  //     } else {
  //       return defaultImageUrl;
  //     }
  //   } else {
  //     if (filteredImage.length > 0) {
  //       newSrcUrl = filteredImage[0].src.startsWith("http")
  //         ? filteredImage[0].src
  //         : "https:" + filteredImage[0].src;
  //       return regex.test(newSrcUrl) ? newSrcUrl : defaultImageUrl;
  //     } else {
  //       return defaultImageUrl;
  //     }
  //   }
  // };

  return (
    <>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Image counts: {imageDetails && imageDetails.length}
          </Typography>
          {imageDetails.length > 0 && (
            <Typography variant="h6" gutterBottom>
              Details:
              <Button
                onClick={() => {
                  setImgOpen(!imgOpen);
                }}
              >
                {imgOpen ? <ExpandMoreIcon /> : <NavigateNextIcon />}
              </Button>
            </Typography>
          )}
        </Grid>
        <Collapse in={imgOpen} timeout="auto" unmountOnExit>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper
                className={classes.paper}
                style={{ height: "20vh", overflow: "auto" }}
              >
                <Typography variant="h6" gutterBottom>
                  largest size:{" "}
                  <span>
                    {maxImageItem
                      ? `${maxImageItem.height} x ${maxImageItem.width}`
                      : "---"}
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
                      : "https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227724992-stock-illustration-image-available-icon-flat-vector.jpg"
                  }
                  alt="largest img"
                  style={{
                    maxWidth: "20vh",
                    maxHeight: "20vh",
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
