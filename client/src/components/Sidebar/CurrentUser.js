import React, { useState } from "react";
import { Box, Typography, Button, Menu, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { BadgeAvatar } from "./index";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { clearOnLogout } from "../../store";
import { logout } from "../../store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 44,
    marginTop: theme.spacing(2.3),
    marginLeft: theme.spacing(0.6),
    display: "flex",
    alignItems: "center",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexGrow: 1,
  },
  username: {
    letterSpacing: -0.23,
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: theme.spacing(1.7),
  },
  ellipsis: {
    color: theme.palette.icons.main,
    opacity: 0.5,
  },
}));

const CurrentUser = (props) => {
  const classes = useStyles();
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const isOpen = Boolean(menuAnchorEl);
  const { user, logout } = props || {};

  const handleClose = () => {
    setMenuAnchorEl(null);
  };
  const handleMenuClick = (event) => {
    console.log(event);
    setMenuAnchorEl(event.currentTarget);
  };
  const handleLogout = async () => {
    await logout(user.id);
  };

  return (
    <Box className={classes.root}>
      <BadgeAvatar photoUrl={user.photoUrl} online={true} />
      <Box className={classes.subContainer}>
        <Typography className={classes.username}>{user.username}</Typography>
        <Button 
          id="menu-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : undefined}
          disableRipple
          style={{backgroundColor: "transparent"}}
          onClick={handleMenuClick}>
          <MoreHorizIcon className={classes.ellipsis} />
        </Button>
        <Menu 
          anchorEl={menuAnchorEl} 
          open={isOpen} 
          onClose={handleClose}
          MenuListProps={{
          "aria-labelledby": "menu-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (id) => {
      dispatch(logout(id));
      dispatch(clearOnLogout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentUser);
