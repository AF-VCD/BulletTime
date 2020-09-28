import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GitHubIcon from '@material-ui/icons/GitHub';
import Description from '@material-ui/icons/Description';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});


export default function TemporaryDrawer(props) {
  const classes = useStyles();

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={props.toggleDrawer(false)}
      onKeyDown={props.toggleDrawer(false)}
    >
      <List>
        <ListItem
          button
          component="a"
          href="https://github.com/smpentecost/BulletTime/tree/master"
          target="_blank"
        >
          <ListItemIcon><GitHubIcon /></ListItemIcon>
          <ListItemText primary='View Source' />
        </ListItem>
        <Divider/>
        <ListItem
          button
          onClick={props.viewLicense}
        >
          <ListItemIcon><Description /></ListItemIcon>
          <ListItemText primary='License' />
        </ListItem>

      </List>
    </div>
  );

  return (
    <div>
      <Drawer open={props.open} onClose={props.toggleDrawer(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
