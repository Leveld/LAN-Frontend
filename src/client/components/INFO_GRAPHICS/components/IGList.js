import React, {Component} from 'react';
import '../styles/IGStyles.css';
import {setIGBlog} from '../redux/actions';
import { IGDisplay } from '../../index';
import {connect} from 'react-redux';

const InfoGraphic = (props) => {
  const image = props.image;
  const title = props.title;
  const blob = props.blob;
  return(
    <div onClick={()=> props.actions.setIGBlog(blob || props.children)} className="IG-item">
      <div className="IG-item-img"><img src={image} width="100%" height="100%"/></div>
      <br />
      <div>{title}</div>
    </div>
  );
}

class IGList extends Component {
  constructor(props){
    super(props);
    this.list = props.list; //list of objets {title, image, blob}
    this.defaultBlob = <div style={{color: 'white'}}>NO BLOB FOUND</div>;
  }
  render(){
    const header = <div className="IG-list-header">ACCOUNTS</div>;

    if(this.list && this.list.length > 0)
      return (
        <div className="IG-list">
          {header}
          <div className="IG-list-wrap">
            {this.list.map((item, i) => {
              return <InfoGraphic key={i} actions={this.props} title={item.title} image={item.image} blob={item.blob}>{this.defaultBlob}</InfoGraphic>
            })}
          </div>
        </div>
      );

    // NO ACCOUNTS FOUND
    return (
      <div className="IG-list">
        {header}
        <div style={{fontSize:'0.7rem', marginTop:5, marginBottom:5}}>NO ACCOUNTS FOUND</div>
      </div>
    ); 
  }
}


export default connect(null, {setIGBlog}) (IGList);