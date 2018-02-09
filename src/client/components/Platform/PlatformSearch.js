import React, {Component} from 'react';

export default class PlatformSearch extends Component {
  constructor(props){
    super(props);
    this.parent = props.parent;
  }
  render(){
    return (
      <div className="Platform-search">
          <div className="Platform-search-wrapper">
            <label>Filter</label>
            <select className="Platform-search-dropdown" onChange={(e) => this.parent.setState({searchBy: e.target.value})}>
              <option value="status">TYPE</option>
              <option value="username">USERNAME</option>
              <option value="subscribers">SUBSCRIBERS</option>
              <option value="avgViews">AVG VIEWS</option>
            </select>
            <input  onChange={(e) => this.parent.setKey(e.target.value)}/>
          </div>
        </div>
    );
  }
}

