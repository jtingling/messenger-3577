import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, Grid } from "@material-ui/core";
import { Image, Transformation } from "cloudinary-react";
import { CLOUD_NAME } from "../../contexts/cloundaryWidget";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "5px",
  },
  date: {
    fontSize: 11,
    color: theme.palette.bubble.date,
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
  },
  text: {
    fontSize: 14,
    color: theme.palette.bubble.text,
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold",
  },
  bubble: {
    background: theme.palette.bubble.background,
    borderRadius: "10px 10px 0 10px",
  },
  singleImgText: {
    position: "relative",
    top: "-7px",
    background: theme.palette.bubble.background,
    borderRadius: "0 0 0 10px",
    textAlign: "center",
  },
  multipleImgText: {
    background: theme.palette.bubble.background,
    borderRadius: "10px 10px 0 10px",
    textAlign: "center",
    marginBottom: '10px'
  },
  media: {
    borderRadius: "5px 5px 0 5px"
  },
  mediaText: {
    fontSize: 14,
    color: theme.palette.bubble.text,
    letterSpacing: -0.2,
    fontWeight: "bold",
    padding: 4
  },
  timeStamp: {
    textAlign: "right",
  },
}));



const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;

  const renderBubbleText = (bubbleType, textType) => {
    return (
      <Grid item className={bubbleType}>
        {text.length !== 0 && <Typography className={textType}>{text}</Typography>}
      </Grid>
    );
  };

  const renderCloundinaryImage = (dimensions, styleName, imageId) => {
    const { height, width } = dimensions; //in pixels
    return (
      <Image
        cloudName={CLOUD_NAME}
        publicId={`${imageId}`}
        className={styleName}
      >
        <Transformation width={width} height={height} dpr="auto" crop="thumb" />
      </Image>
    );
  };

  const renderMedia = () => {
    if (!attachments) {
      return (
        <Box className={classes.root}>
          <Typography className={classes.date}>{time}</Typography>
          {renderBubbleText(classes.bubble, classes.text)}
        </Box>
      );
    }
    if (attachments.length > 1) {
      return (
        <>
        {renderBubbleText(classes.multipleImgText, classes.text)}
          <Grid container spacing={1}>
            {attachments.map((image) => {
              const attachment = JSON.parse(image);
              return (
                <Grid item key={`${attachment.id}`}>
                  {renderCloundinaryImage(
                    { height: 100, width: 125 }, 
                    classes.media,
                    attachment.publicId
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Typography className={classes.date}>{time}</Typography>
        </>
      );
    } else {
      return (
        <>
          <Typography className={classes.date}>{time}</Typography>
          <Grid container>
            <Grid item>
              {renderCloundinaryImage(
                { height: 155, width: 135 },
                classes.media,
                attachments[0]
              )}
            </Grid>
          </Grid>
          {renderBubbleText(classes.singleImgText, classes.mediaText)}
        </>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.timeStamp}>{renderMedia()}</Box>
    </Box>
  );
};

export default SenderBubble;
