import React from 'react';
import initSqlJs from "sql.js";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { ContentState,
         EditorState,
       } from 'draft-js';


// Components
import AppBar from './component/AppBar';
import BulletComposer from './component/BulletComposer';
import Thesaurus from './component/Thesaurus';

// Data
import AcronymList from './data/acronyms.sqlite';

// Style
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d0811',
    },
    secondary: {
      light: '#d7ff86',
      main: '#08ff11',
    },
  },
});
      
export default class BulletTime extends React.Component {

  GUIDE_DEFAULT = 763;
  
  constructor(props) {
    super(props);

    let guide = localStorage.getItem('guide');
    if(!guide){
      guide = this.GUIDE_DEFAULT;
    }

    let autosave = Boolean(localStorage.getItem('autosave'));

    let bullets = JSON.parse(localStorage.getItem('bullets'));
    if(!bullets){bullets='';};
    let content = ContentState.createFromText(bullets);
    
    this.state = {
      acronymDb: null,
      err: null,
      acronymRegExp: null,
      autosave: autosave,
      editorState: EditorState.createWithContent(content),
      bulletWidths: new Map(),
      guide: guide, //px
      regexp: this.props.regexp,
    };
  }

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately
    // instantiate the database without any configuration, initSqlJs
    // will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js
    initSqlJs()
      .then(SQL => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', AcronymList , true);
        xhr.responseType = 'arraybuffer';
  
        xhr.onload = e => {
          var uInt8Array = new Uint8Array(xhr.response);
          var db = new SQL.Database(uInt8Array);
          this.setState({ acronymDb: db }, this.getRegExp);
        };
        xhr.send();
      })
      .catch(err => this.setState({ err }));
  }

  getRegExp() {
    let db = this.state.acronymDb;
    let result = db.exec("SELECT word FROM words;")[0].values;
    result = result.sort((a, b) => {return b[0].length-a[0].length;});
    result = result.filter(x => x[0].length > 1);
  
    let regexp_def = "\\b(" + result.join("|").replace(/[\\[.+*?%&(){^$]/g, "\\$&") + ")(?=([\\s;\\.]|$))";
    regexp_def = regexp_def.replace(/\s/g, "\\s"); //Enable matches even after graberizing

    this.setState({acronymRegExp: new RegExp(regexp_def, "gi")});
  }

  saveState() {
    if(this.state.autosave){
      localStorage.setItem("guide", this.state.guide);
      localStorage.setItem("autosave", true);
      const bullets = this.state.editorState.getCurrentContent().getPlainText();
      localStorage.setItem("bullets", JSON.stringify(bullets));
    }else{
      localStorage.clear();
    }
  }

  handleAutosave() {
    const autosave = this.state.autosave;
    this.setState({autosave: !autosave}, this.saveState);
  };

  handleEditorChange(editorState, cb=null) {
    this.setState({editorState}, cb);
    this.saveState();
  };

  handleWidthChange(bulletWidths) {
    this.setState({bulletWidths});
  };

  handleGuideChange(guide) {
    this.setState({guide});
    this.saveState();
  };

  renderComposer() {
    let regexp = this.state.acronymRegExp;
    if (!regexp) return <pre>Loading...</pre>;

    return <BulletComposer
             regexp={this.state.acronymRegExp}
             db={this.state.acronymDb}
             editorState={this.state.editorState}
             bulletWidths={this.state.bulletWidths}
             guide={this.state.guide}
             GUIDE_DEFAULT={this.GUIDE_DEFAULT}
             handleEditorChange={(arg, cb=null) => this.handleEditorChange(arg, cb)}
             handleWidthChange={(arg) => this.handleWidthChange(arg)}
             handleGuideChange={(arg) => this.handleGuideChange(arg)}
           />;
  }
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Grid
          container
          direction="column"
          spacing={1}
        >
          <Grid item>
            <AppBar
              autosave={this.state.autosave}
              handleAutosave={() => this.handleAutosave()}
            />
          </Grid>
          <Grid item>
            {this.renderComposer()}
          </Grid>
          <Grid item>
            <Thesaurus/>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}
