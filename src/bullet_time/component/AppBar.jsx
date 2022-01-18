import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HeaderImage from '../images/header.jpg';
import AppBar from '@material-ui/core/AppBar';
import Snackbar from '@material-ui/core/Snackbar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';



import Drawer from './Drawer';
import PageDialog from './PageDialog';
import StateSaver from './StateSaver';

import { About, License, Warning } from '../data/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({open_drawer: false});
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [dialog, setDialog] = React.useState(Warning());
  const [snackOpen, setSnackOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, open_drawer: open});
  };

  const handleDialog = (dialogOpen) => {
    setDialogOpen(dialogOpen);
  };

  const handleSnackClose = (event, reason) => {
     if (reason === 'clickaway') {
      return;
    }

    setSnackOpen(false);
  };

  const handleShareableLink = () => {
    let success = props.getShareableLink();
    console.log(success);
    if (success){
      setSnackOpen(true);
    }
  };

  const setDialogContent = (dialog) => {
    setDialog(dialog);
  };

  const viewAbout = () => {
    setDialogContent(About());
    handleDialog(true);
  };

  const viewLicense = () => {
    setDialogContent(License());
    handleDialog(true);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <img
          src={HeaderImage}
          style={{objectFit: 'cover', maxHeight: '40px'}}
        />
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Bullet Time
          </Typography>
          <Button
            variant="contained"
            onClick={handleShareableLink}
          >
            Copy Shareable Link
          </Button>
          <Typography
            style={{ marginLeft: 16 }}>
            <StateSaver
              autosave={props.autosave}
              handleClick={() => props.handleAutosave()}
            />
          </Typography>
        </Toolbar>
      </AppBar>
      <PageDialog
          open={dialogOpen}
          title={dialog[0]}
          content={dialog[1]}
          handleDialog={dialogOpen => handleDialog(dialogOpen)}
        />
      <Drawer
        toggleDrawer={() => toggleDrawer()}
        open={state["open_drawer"]}
        viewAbout={viewAbout}
        viewLicense={viewLicense}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message="Copied Shareable Link to Clipboard"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
