import React, {Component} from 'react';
import '../../styles/Platform.css';
import Platform from './Platform';
import PlatformSearch from './PlatformSearch';
import {connect} from 'react-redux';
import {setPlatforms} from '../../actions';

class PlatformList extends Component {
  constructor(props){
    super(props);
    this.state = {filtered: [], keyword: '', searchBy: 'name'};
    this.filtered = [];
    this.platforms = props.platorms ;
  }

  componentDidMount(){
    this.props.setPlatforms([{name: 'test'},{name: 'test'},{name: 'test'}, {name: 'random'}, {name: 'example 1'}, {name: 'example 2'}, {name: 'example 3'},{name: 'test'},{name: 'test'},{name: 'test'}, {name: 'random'}, {name: 'example 1'}, {name: 'example 2'}, {name: 'example 3'}]);
  }


  setKey = (keyword) => {
    this.filtered = this.props.platforms.filter((plat) => plat[this.state.searchBy].startsWith(keyword));
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