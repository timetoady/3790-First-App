import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Wishlist from '../routes/wishlist';
import MyCollection from '../routes/collection'
import GameContextProvider from '../contexts/APIcontext'

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  // const gameContext = useContext(GameContext);
  // const { getGameDetails } = gameContext

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "none",
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <GameContextProvider>
      <AppBar position="static">
       
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Collection" {...a11yProps(0)} />
          <Tab label="Wishlist" {...a11yProps(1)} />
          <Tab label="Your Account" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <MyCollection></MyCollection>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Wishlist></Wishlist>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Your Account
      </TabPanel>
      </GameContextProvider>
    </div>
  );
}
