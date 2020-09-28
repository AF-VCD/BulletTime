import React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../style/BulletTester.css';


export default function Bullet(props) {
  const ref = useRef(null);
  const [value, setValue] = useState("- ");
  const [width, setWidth] = useState(0);
  const [caret, setCaret] = useState(2);

  // Set the local state width any time the screen renders
  useEffect(() => {
    console.log("setWidth");
    setWidth(ref.current ? ref.current.offsetWidth : 0);
  });

  //  Set the parent width any time the local state width changes
  // useEffect(() => {
  //   props.handleWidthChange(props.index, width);
  // }, [width, value]);

  // Update state of the innerText
  useEffect(() => {
    console.log("setValue");
    let sel = window.getSelection();
    let newText = ref.current ? ref.current.innerText : "";
    let newCaret = Math.min(sel.anchorOffset, newText.length);
    setCaret(newCaret);
    //props.setValue(newText, props.index);
    setValue(newText);
 }, [ref.current ? ref.current.innerText : ""]);

  useEffect(() => {
    console.log("setCaret");
    if (ref.current) {
      let target = ref.current;
      let range = document.createRange();
      let sel = window.getSelection();
      range.setStart(
        target.childNodes[0],
        caret
      );
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      target.focus();
    }
  }, [caret, value]);
  
  return (
    <div
      ref={ref}
      className="bullet"
    >
      {value}
      {console.log("render")}
    </div>
  );
}
