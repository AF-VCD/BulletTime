  static SQL_Search = "SELECT * FROM words;";
  
  constructor(props){
    super(props);
    const compositeDecorator = new CompositeDecorator([
      {
        strategy: this.acronymStrategy,
        component:AcronymDecorator,
      },
    ]);
    this.state = {
      db: null,
      err: null,
      regexp: null,
      editorState: EditorState.createEmpty(compositeDecorator),
    };
    this.handleNewBullet = this.handleNewBullet.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  acronymStrategy(contentBlock, callback, contentState) {
    const findWithRegex = (regex, contentBlock, callback) => {
      const text = contentBlock.getText();
      let matchArr, start;
      while ((matchArr = regex.exec(text)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
      }
    };
    findWithRegex(/this/g, contentBlock, callback);
    console.log(contentState);
  }

  componentDidMount() {
    sql.js needs to fetch its wasm file, so we cannot immediately
    instantiate the database without any configuration, initSqlJs
    will fetch the wasm files directly from the same path as the js
    see ../config-overrides.js
    initSqlJs()
      .then(SQL => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', AcronymList , true);
        xhr.responseType = 'arraybuffer';
  
        xhr.onload = e => {
          var uInt8Array = new Uint8Array(xhr.response);
          var db = new SQL.Database(uInt8Array);
          this.setState({ db: db }, this.getRegExp);
        };
        xhr.send();
      })
      .catch(err => this.setState({ err }));
  }

  getRegExp() {
    let result = this.state.db.exec("SELECT word FROM words;")[0].values;
    result = result.sort((a, b) => {return b[0].length-a[0].length;});
  
    let regexp_def = "\\b(" + result.join("|").replace(/[\\[.+*?%&(){^$]/g, "\\$&") + ")(?=(\\s|$))";
    regexp_def = regexp_def.replace(/\s/g, "\\s"); Enable matches even after graberizing

    this.setState({regexp: new RegExp(regexp_def, "gi")});
  }
