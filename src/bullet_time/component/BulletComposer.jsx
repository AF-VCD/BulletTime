// 3rd party imports
import React from 'react';
import { Grid } from '@material-ui/core';
import { CompositeDecorator,
         ContentBlock,
         ContentState,
         EditorState,
       } from 'draft-js';

//Components
import AcronymDecorator from './AcronymDecorator';
import BulletMenu from './BulletMenu';
import { BulletRange } from './BulletRange';
import Ruler from './Ruler';

//Logic
import { graberSpace } from '../logic/GraberUtils.js';
import { findWithRegex } from '../logic/Utils.js';


/* This component holds the editor and menus associated with the
 * bullets. For now, it is essentially the top level component,
 * ignoring the header and app drawer.
 */
export default class BulletComposer extends React.Component {
  constructor(props) {
    super(props);

    const  acronymStrategy = (contentBlock, callback, contentState) =>{
      findWithRegex(props.regexp, contentBlock, callback);
    };

    this.compositeDecorator = new CompositeDecorator([
      {
        strategy:acronymStrategy,
        component:AcronymDecorator,
        props:{
          db: props.db,
          onChange: contentState =>
            this.handleContentChange(contentState)
        }
      },
    ]);

    const editorState = this.props.editorState;
    this.props.handleEditorChange(
      EditorState.set(
        editorState,
        {decorator: this.compositeDecorator}
      )
    );

    this.state = {
      graberized: false,
      regexp: this.props.regexp,
    };

    this.editorRef = React.createRef();
  }

  renderRulers() {
    let rulers = [];
    const blockArray = this.props.editorState
          .getCurrentContent()
          .getBlocksAsArray();

    blockArray.forEach((block) => {
      rulers.push(
        <Ruler
          onChange={(width) => this.handleWidthMeasurement(block.getKey(), width)}
          content={block.getText()}
        />
      );
    }, this);

    return(rulers);
  }

  graberizeContent(forceReview=false) {
    const graberize = this.state.graberized;
    let editorState = this.props.editorState;
    let content = editorState.getCurrentContent();
    let blockMap = content.getBlockMap(); //resetting
    let bulletWidths = this.props.bulletWidths;
    for (const entry of bulletWidths.entries()) {
      const key = entry[0];
      const width = entry[1][0];
      const finished = entry[1][1];
      const lastOp = entry[1][2];
      const block = content.getBlockForKey(key);
      if (block) {
        if (!finished || forceReview) {
          let newWidth = 0;
          let result = [];
          if (graberize) {
            const guide = this.props.guide;
            result = graberSpace(block.getText(), width, guide, lastOp);
            newWidth = width;
          } else {
            result = [block.getText().replace(/[\u2004\u2006\u2007\u2009]/g,' '), true, null];
          }
          const newBlock = new ContentBlock({
            text: result[0],
            key: key,
            type: 'unstyled',
          });
          
          blockMap = blockMap.set(key, newBlock);
          bulletWidths.set(key, [newWidth, result[1], result[2]]);
        }
      } else {
        bulletWidths.delete(key);
      }
    }
    const newContentState = ContentState.createFromBlockArray(blockMap.toArray());
    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );
    this.props.handleEditorChange(newEditorState);
    this.props.handleWidthChange(bulletWidths);
  }

  handleGraberize() {
    const graberize = !this.state.graberized;
    this.setState({graberized: graberize}, () => this.graberizeContent(true));
  }

  handleContentChange(contentState) {
    let newEditorState = EditorState.createWithContent(
      contentState,
      this.compositeDecorator
    );
    const cb = () => {
      this.editorRef.current.blur();
    };
    this.props.handleEditorChange(newEditorState, cb);
  };

  handleWidthMeasurement(key, width) {
    let bulletWidths = this.props.bulletWidths;
    let metadata = bulletWidths.get(key);
    let lastOp = null;
    if (metadata) {
      lastOp = metadata[2];
    }
    const guide = this.props.guide;
    bulletWidths.set(key, [width, !(width-guide), lastOp]);
    this.props.handleWidthChange(bulletWidths);
    this.graberizeContent();
  }

  handleTrim(arg) {
    const guide = this.props.GUIDE_DEFAULT + arg;
    this.props.handleGuideChange(guide);
    this.graberizeContent(true);
  }

  render() {
    return (
      <div>
        <Grid container spacing={1}>
          <Grid item xs>
            <BulletRange
              ref={this.editorRef}
              editorState={this.props.editorState}
              guide={this.props.guide}
              disabled={this.state.graberized}
              onChange={editorState => this.props.handleEditorChange(editorState)}
            />
          </Grid>
          <Grid item>
            <BulletMenu
              guide={this.props.guide}
              graberized={this.state.graberized}
              onGraberize={() => this.handleGraberize()}
              onTrim={(arg) => this.handleTrim(arg)}
            />
          </Grid>
        </Grid>
        {this.state.graberized && this.renderRulers()}
      </div>
    );
  }
}
