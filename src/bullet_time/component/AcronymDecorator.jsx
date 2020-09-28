import React from 'react';
import { List,
         ListItem,
         ListItemText,
         Popover
       } from '@material-ui/core';
import { useState } from 'react';
import { Modifier,
         SelectionState
       } from 'draft-js';
import { getMenuOptions } from '../logic/Utils.js';

export default function  AcronymDecorator(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleContextMenu = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClick = event => {
    setAnchorEl(null);
    const selection = new SelectionState
          .createEmpty(props.blockKey)
          .set("anchorOffset", props.start)
          .set("focusOffset", props.end);
    const newContentState = Modifier.replaceText(
      props.contentState,
      selection,
      event.target.innerText,
    );
    props.onChange(newContentState);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePreview = event => {
    
    // const previewBlock = new ContentBlock({
    //   text: event.target.innerText,
    //   key: props.children[0].props.block.getKey(),
    //   type: 'unstyled',
    // });
    // const origSym = props.children[0];
    // const preview = {
    //   ...origSym,
    //   props: {
    //     ...origSym.props,
    //     block: previewBlock,
    //     text: event.target.innerText,
    //   }
    // };

    // console.log(preview);
    
    // setContent([preview]);
  };

  const renderMenuOptions = () => {
    const key = props.decoratedText.replace(/\s/g, ' ');
    let itemRenders = [];
    for (const item of getMenuOptions(props.db, key)) {
      itemRenders.push(
        <ListItem button
                  key={item}
                  onMouseOver={handlePreview}
                  onClick={handleClick}
        >
          <ListItemText>
            {item}
          </ListItemText>
        </ListItem>
      );
    }
    return (<List dense> {itemRenders} </List>);
  };

  return(
    <>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {renderMenuOptions()}
      </Popover>
      <span className="acronym"
            onContextMenu={handleContextMenu}
      >
        {props.children}
      </span>
    </>
  );
};
