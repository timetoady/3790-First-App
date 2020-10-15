import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Modal from './Modal'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#000000e8",
    "&:hover": {
      background: "#f00",
    },
  },
  menu: {
    backgroundColor: "000000c8",
    paddingTop: 0,
  },
  menuItem: {
    backgroundColor: "#000",
    "&:hover": {
      background: "#00E",
    },
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={classes.root}>
        <Button
          className={classes.button}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Menu
        </Button>
       
          <Menu
          className={classes.menu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* Here, have to have menu item handle open of modal */}
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              Login
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              My account
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleClose}>
              Logout
            </MenuItem>
          </Menu>
     
        <Avatar></Avatar>
      </div>
      <Modal></Modal>
    </div>
  );
}
