import React, { useState } from "react";
import { Button, Menu, MenuItem, Avatar } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from './Dialog'
import Signup from './Signup'


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#000077e8",
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
      background: "#000077",
    },
  },
}));

export default function SimpleMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDialogToggle = () => {
    setDialogOpen(!dialogOpen)
    handleMenuClose()
  }

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
            onClose={handleMenuClose}
          >
            {/* Here, have to have menu item handle open of modal */}
            <MenuItem className={classes.menuItem} onClick={handleDialogToggle}>
            <Dialog></Dialog>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
              <Signup></Signup>
            </MenuItem>
            <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
              Logout
            </MenuItem>
          </Menu>
     
        <Avatar></Avatar>
      </div>
      
    </div>
  );
}
