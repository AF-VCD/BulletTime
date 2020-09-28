import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar,
         Divider,
         FormControlLabel,
         Grid,
         Paper,
         Switch,
         Toolbar,
         Typography } from '@material-ui/core';
import TrimController from './TrimController';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));


export default function BulletMenu(props) {
  const classes = useStyles();
  
  return(
    <Paper elevation={6}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            className={classes.title}
          >
            Spacing Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid
        container
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <TrimController
            guide={props.guide}
            onTrim={(arg) => props.onTrim(arg)}
          />
          <Divider/>
        </Grid>
        <Grid item>
          <FormControlLabel
            control=
              {<Switch
                 checked={props.graberized}
                 onChange={() => props.onGraberize()}
               />}
            label="Graberize"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}
