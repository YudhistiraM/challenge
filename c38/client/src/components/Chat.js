import React, { Component } from 'react';
import Remarkable from 'remarkable';


export default class Chat extends Component {

  getRawMarkup(msg){
     const md = new Remarkable();
     return { __html: md.render(msg)};
  }

  render() {
    return (
      <article className="timeline-entry">
      <div className="timeline-entry-inner">
      <div className="timeline-icon bg-secondary">
      <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
      </div>

      <div className="timeline-label">
      <div>
      <h2><b>{this.props.name}</b></h2>
      <p dangerouslySetInnerHTML={this.getRawMarkup(this.props.message)}></p>
      </div>
      </div>

      </div>
      </article>
    )
  }
}
