import React, { useState, useContext, useEffect } from "react";
import { FormControl, FilledInput, InputAdornment } from "@material-ui/core";
import AttachFile from "@material-ui/icons/AttachFile";
import SentimentSatisfiedAlt from "@material-ui/icons/SentimentSatisfiedAlt";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import {
  UploadWidget,
  CLOUD_NAME,
  UPLOAD_PRESET,
} from "../../contexts/cloundaryWidget";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(1.5),
  },
  input: {
    height: 70,
    backgroundColor: theme.palette.bubble.background,
    borderRadius: 8,
    marginBottom: theme.spacing(2),
  },
  iconColor: {
    color: theme.palette.bubble.text,
    opacity: 0.4,
    width: "25px",
    height: "25px",
    cursor: "pointer",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const uploadMedia = useContext(UploadWidget);
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState(null);
  const [widgetStatus, setWidgetStatus] = useState("");
  const [widget, setWidget] = useState(null);

  const { postMessage } = props;

  const makeReqBody = (props, text, attachments) => {
    const { otherUser, conversationId, user } = props;
    return {
      text,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments,
    };
  };

  useEffect(() => {
    const createCloudinaryWidget = () => {
      if (uploadMedia) {
        const widget = uploadMedia.createUploadWidget(
          {
            cloudName: CLOUD_NAME,
            uploadPreset: UPLOAD_PRESET,
            thumbnails: "#chat-input",
            showCompletedButton: true,
            singleUploadAutoClose: true,
          },
          async (err, result) => {
            if (err) {
              console.error(err);
            }
            if (result.event === "queues-end") {
              const media = result.info.files.map((file) => {
                return file.uploadInfo.public_id;
              });
              setAttachments(media);
              setWidgetStatus(result.event);
            }
          }
        );
        return widget;
      } else {
        console.error("Unable to download widget.");
      }
    };
    setWidget(createCloudinaryWidget());
  }, [uploadMedia]);

  useEffect(() => {
    const reqBody = makeReqBody(props, text, attachments);

    async function postAttachment() {
      await postMessage(reqBody);
    }

    if (widgetStatus === "queues-end") {
      postAttachment();
      setWidgetStatus("");
      setText("");
    }
  }, [widgetStatus, postMessage, text, attachments, props]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const renderWidget = () => {
    widget.open();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = makeReqBody(props, text, null);
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              <SentimentSatisfiedAlt className={classes.iconColor} />
              <AttachFile
                className={classes.iconColor}
                onClick={renderWidget}
              />
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
