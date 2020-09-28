// MIT License

// Copyright (c) 2020 Christopher Kodama

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

// Edited by Seeley Pentecost, June 2020

import React from 'react';
import { AppBar,
         Button,
         Card,
         CardContent,
         Grid,
         Paper,
         TextField,
         Toolbar,
         Typography } from '@material-ui/core';

const checkThesaurus = false;

export default class SynonymViewer extends React.Component{

  constructor(props){
    super(props);
    this.state={
      word:'',
      synonyms:[],
    };
    this.searchField = React.createRef();
  }

  getSynonyms() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange =  () => {
      if(xhttp.readyState === 4 && xhttp.status === 200){
        const dat = JSON.parse(xhttp.responseText);
        if(checkThesaurus) console.log(dat);
        if(dat.length !== 0){
          this.setState({
            synonyms: dat.map((item)=>{return item.word;}),
          });
        }else{
          this.setState({
            synonyms:[]
          });
        }
      }
    };
    const maxWords=25;
    xhttp.open("GET","https://api.datamuse.com/words?max="+ maxWords + "&ml=" + this.state.word, true);
    xhttp.send();
  }

  componentDidMount(){
    if( checkThesaurus) console.log('componentDidMount getting synonyms for ' + this.state.word);
    this.getSynonyms();
  }

  handleValueChange(event){
    let word = event.currentTarget.value;
    this.setState({word}, this.getSynonyms);
  }

  handleSynonymClick(event){
    let word = event.currentTarget.textContent;
    this.setState({word}, this.getSynonyms);
  }

  render(){
    const synonyms = <Card variant="outlined"
                           style={{maxHeight: "210px"}}
                     >
                       <CardContent
                         style={{columnCount: 6, maxHeight: "210px"}}>
                         <SynonymList
                           synonyms={this.state.synonyms}
                           onClick={event => this.handleSynonymClick(event)}
                         />
                       </CardContent>
                     </Card>;

    const noResult =<Card variant="outlined"
                           style={{maxHeight: "210px"}}
                     >
                       <CardContent
                         style={{columnCount: 6, maxHeight: "210px"}}>
                         <span>No results...</span>
                       </CardContent>
                     </Card>;

    let mainBody;
    if(this.state.word === ''){
      mainBody = '';
    }else if(this.state.synonyms.length === 0){
      mainBody = noResult;
    }else{
      mainBody = synonyms;
    }
    
    return (
      <Paper elevation={6}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              style={{flexGrow: 1}}
            >
              Thesaurus
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          style={{padding: '10px'}}
          direction="column"
        >
          <Grid item>
            <TextField
              ref={this.searchField}
              label="Find Synonyms"
              fullWidth={true}
              margin='dense'
              type="search"
              value={this.state.word}
              onChange={event=>this.handleValueChange(event)}
              variant="outlined"
            />
          </Grid>
          <Grid item>
            {mainBody}
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              align='right'
            >
              Powered by <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer">Datamuse</a>.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

class SynonymList extends React.Component{
  render(){
    if( checkThesaurus) console.log(this.props);
    return (
      <div>
        <div className="columns is-multiline">
          {this.props.synonyms.map((word,i)=>{
            return (
              <div className='card column is-narrow ' key={i}>
                <div className='card-content is-paddingless' >
                  <Synonym word={word} 
                           onClick={event => this.props.onClick(event)}
                  />
                </div>
              </div>
            );}
                                  )}
        </div>
      </div>
    );
  }
}

class Synonym extends React.Component{
  render(){
    return(
      <Button
        style={{color: '#000000'}}
        color='secondary'
        variant='outlined'
        size='small'
        onClick={event => this.props.onClick(event)}>
          {this.props.word}
      </Button>
    );
  }
}
