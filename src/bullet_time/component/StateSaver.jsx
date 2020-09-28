import React from 'react';
import { FormControlLabel,
         Switch,
       } from '@material-ui/core';

export default function StateSaver(props) {

  return(
    <FormControlLabel
      control=
        {<Switch
           checked={props.autosave}
           onChange={() => props.handleClick()} 
         />}
      label="Auto-Save"
    />
  );
}
