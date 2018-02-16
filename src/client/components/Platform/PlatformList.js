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
    this.platforms = props.user.platforms || [];
  }



  setKey = (keyword) => {
    this.filtered = this.platforms.filter((plat) => {
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
          {this.platforms.length === 0 ? <div style={{color: 'white'}}> NO PLATFORMS FOUND</div>:null}
          {this.state.filtered.length > 0 ? this.state.filtered : this.state.keyword.length > 0 ? <div className="Platform-no_match">NO MATCH</div> : this.platforms.map((item, i) => <Platform key={i} platform={item} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //platforms: state.platforms,
    user: state.user
  };
}

export default connect(mapStateToProps, null)(PlatformList);