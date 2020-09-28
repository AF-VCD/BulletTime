import React from 'react';
import { useEffect, useRef } from 'react';
import '../style/Ruler.css';


export default function Ruler(props) {
  const ref = useRef(null);

  // Report the width any time the content changes
  useEffect(() => {
    let width = ref.current ? ref.current.offsetWidth: 0;
    props.onChange(width);
  }, [props.content]);
  
  return (
    <span ref={ref} className="ruler">
      {'- ' + props.content}
    </span>
  );
}
