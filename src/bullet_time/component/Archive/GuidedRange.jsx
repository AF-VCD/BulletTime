import React from 'react';
import Guide from './Guide';
import Range from './Range';
import { Paper } from '@material-ui/core';
import '../style/GuidedRange.css';

export default function GuidedRange(props) {
  return (
    <Paper elevation={6}>
      <div className="guided-range">
        <Range
          editorState={this.state.editorState}
          disabled={props.disabled}
//          onChange={bullets => props.onChange(bullets)}
//          handleWidthChange={(index, width) => props.handleWidthChange(index, width)}
        />
        <Guide
          position={props.guide}
        />
      </div>
    </Paper>
  );
}
