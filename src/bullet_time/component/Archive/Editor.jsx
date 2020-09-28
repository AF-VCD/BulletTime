import React, { useEffect, useRef, useState } from 'react';
import Bullet from './Bullet';


export default function Editor(props) {

  const setValue = (bulletText, index) => {
    let bullets = props.bullets;
    bullets[index] = bulletText;
    props.onInput(bullets);
  };

  const renderBullets = () => {
    let lines = [];
    let bullets = props.bullets;

    bullets.forEach(function(bullet, index) {
      lines.push(
        <Bullet
          value={bullet}
          index={index}
          setValue={(bulletText, index) =>  setValue(bulletText, index)}
//          handleWidthChange={(index, width) => props.handleWidthChange(index, width)}
        />
      );
    });
    return(lines);
  };

  // const handleInput = (event) =>{
  //   let sel = window.getSelection();
  //   let caret = sel.anchorOffset;
  //   event.target.innerText.split('\n');
  //   // props.onInput(bullets);
  // };

  return (
    <div
      id="editable"
      contentEditable
    >
      <Bullet/>
    </div>
  );
}
