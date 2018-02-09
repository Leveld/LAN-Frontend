import React, {Component} from 'react';
import '../../styles/Platform.css';
import Platform from './Platform';
import PlatformSearch from './PlatformSearch';
import {connect} from 'react-redux';
import {setPlatforms} from '../../actions';

class PlatformList extends Component {
  constructor(props){
    super(props);
    this.state = {filtered: [], keyword: '', searchBy: 'status'};
    this.filtered = [];
    this.platforms = props.platorms ;
  }

  componentDidMount(){
    this.props.setPlatforms([
      {status: 'youtube', username: "userName", subscribers: 2, avgViews: 2, details: "Here are some details" },
      {status: 'youtube', username: "example", subscribers: 320, avgViews: 1000, details: "Here are some details" },
      {status: 'youtube', username: "noName", subscribers: 40, avgViews: 400, details: "Here are some details" },
      {status: 'youtube', username: "cs3", subscribers: 700, avgViews: 200, details: "Here are some details" },
      {status: 'youtube', username: "potatoed", subscribers: 40, avgViews: 700, details: "Here are some details" },
      {status: 'github', username: "userName", subscribers: 40, avgViews: 50, details: "Here are some details" },
      {status: 'github', username: "example", subscribers: 2000, avgViews: 200, details: "Here are some details" },
      {status: 'github', username: "noName", subscribers: 17, avgViews: 4000, details: "Here are some details" },
      {status: 'github', username: "cs3", subscribers: 100, avgViews: 60, details: "Here are some details" },
      {status: 'github', username: "potatoed", subscribers: 19, avgViews: 10, details: "Here are some details" },
      {status: 'blog', username: "userName", subscribers: 40, avgViews: 20, details: "Here are some details" },
      {status: 'blog', username: "example", subscribers: 40, avgViews: 200, details: "Here are some details" },
      {status: 'blog', username: "noName", subscribers: 70, avgViews: 200, details: "Here are some details" },
      {status: 'blog', username: "cs3", subscribers: 9000, avgViews: 400, details: "Here are some details" },
      {status: 'blog', username: "potatoed", subscribers: 45, avgViews: 200, details: "Here are some details" }
    ]);
  }


  setKey = (keyword) => {
    this.filtered = this.props.platforms.filter((plat) => {
      if(typeof plat[this.state.searchBy] === 'number' && plat[this.state.searchBy] >= keyword) return plat;
      if(typeof plat[this.state.searchBy] === 'string' && plat[this.state.searchBy].toLowerCase().startsWith(keyword.toLowerCase())) return plat;
    });
    this.setState({keyword, filtered: this.filtered.map(((plat,i) => <Platform key={i} platform={plat} />))});
  }

  render(){
       
    return (
      <div className="Platform-list" >
        <PlatformSearch parent={this} />
        <div className="Platform-list-wrapper">
          {this.state.filtered.length > 0 ? this.state.filtered : this.state.keyword.length > 0 ? <div className="Platform-no_match">NO MATCH</div> : this.props.platforms.map((item, i) => <Platform key={i} platform={item} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    platforms: state.platforms
  };
}

export default connect(mapStateToProps, {setPlatforms})(PlatformList);