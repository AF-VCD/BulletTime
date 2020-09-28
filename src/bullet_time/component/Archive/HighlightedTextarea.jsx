import React from 'react';
import '../style/HighlightedTextarea.css';

export default class HighlightedTextarea extends React.Component {

  static OPEN_MARK = '<span class=mark>';
  static CLOSE_MARK = '</span>';

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.getHighlights = this.getHighlights.bind(this);
    this.handleContextMenuCapture = this.handleContextMenuCapture.bind(this);
  }

  handleScroll(event) {
    const scrollTop = event.target.scrollTop;
    this.refs.backdrop.scrollTop = scrollTop;
  }

  // openMark(id) {
  //   console.log(id.replace(/\s/g, "-"));
  //   return '<span id=' + id.replace(/\s/g, "-") +' class=acronym>';
  // }

  getHighlights() {
    let highlightMarks = this.props.value;

    // escape HTML
    highlightMarks = highlightMarks.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    highlightMarks = highlightMarks.replace(this.props.regexp, HighlightedTextarea.OPEN_MARK + '$1' + HighlightedTextarea.CLOSE_MARK);

    // this keeps scrolling aligned when input ends with a newline
    highlightMarks = highlightMarks.replace(new RegExp('\\n(' + HighlightedTextarea.CLOSE_MARK + ')?$'), '\n\n$1');

    return highlightMarks;
  }

  handleContextMenuCapture(event) {
    let x = event.clientX;
    let y = event.clientY;
    console.log(x, y);
    console.log(event);
  }

  render() {
    return (
      <div
        className="hwt-container"
        onContextMenuCapture={this.handleContextMenuCapture}
      >
                <textarea
                  className={`hwt-input hwt-content ${this.props.disabled ? "disabled" : ""}`}
          onChange={event => this.props.onChange(event)}
          onScroll={this.handleScroll}
          value={this.props.value}
          placeholder="Write your bullets here..."
          rows="20"
          autofocus="true"
        />
        <div
          contentEditable="true"
          className="hwt-backdrop" 
          ref="backdrop"
        >
          <div
            className="hwt-highlights hwt-content"
            dangerouslySetInnerHTML={{__html: this.getHighlights()}}
          />
        </div>


      </div>
    );
  }
}
