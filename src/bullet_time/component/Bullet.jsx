import React from 'react';
import { EditorBlock } from 'draft-js';
export default function Bullet(props) {
  return (
    <>
      <span contentEditable={false}>
        {'- '}
      </span>
      <EditorBlock  {...props}/>
    </>
  );
}

