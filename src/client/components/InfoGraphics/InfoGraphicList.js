import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setInfoGraphicBlob } from '../../actions';
import { InfoGraphicDisplay } from './InfoGraphicDisplay';
import InfoGraphic from './InfoGraphic';

<<<<<<< HEAD:src/client/components/InfoGraphics/InfoGraphicList.js
import '../../styles/InfoGraphics.css';
=======
const InfoGraphic = (props) => {
  const image = props.image;
  const title = props.title;
  const blob = props.blob;
  const bgColor = props.bgColor;
  const txtColor = props.txtColor;
  return(
    <div onClick={()=> props.actions.setIGBlog(blob || props.children)} style={{backgroundColor: bgColor, color: txtColor}} className="IG-item">
      <div className="IG-item-img"><img src={image} width="100%" height="100%"/></div>
      <br />
      <div>{title}</div>
    </div>
  );
}
>>>>>>> 32ef78c7f01ba5ab889770b51b8a2bad6272f738:src/client/components/INFO_GRAPHICS/components/IGList.js

class InfoGraphicList extends Component {
  constructor(props){
    super(props);
    this.list = props.list; //list of objets {title, image, blob}
<<<<<<< HEAD:src/client/components/InfoGraphics/InfoGraphicList.js
    this.defaultBlob = <div style={{ color: 'white' }}>NO BLOB FOUND</div>;
    this.color = props.color;
=======
    this.defaultBlob = <div style={{color: 'white'}}>NO BLOB FOUND</div>;
    this.bgColor = props.bgColor;
>>>>>>> 32ef78c7f01ba5ab889770b51b8a2bad6272f738:src/client/components/INFO_GRAPHICS/components/IGList.js
  }

  render(){
    const header = <div className="IG-list-header">ACCOUNTS</div>;

    if(this.list && this.list.length > 0)
      return (
        <div className="IG-list">
          {header}
          <div style={{background: this.bgColor}} className="IG-list-wrap">
            {this.list.map((item, i) => {
              return (
                <InfoGraphic key={i}  txtColor={item.txtColor} bgColor={item.bgColor} actions={this.props} title={item.title} image={item.image} blob={item.blob}>
                  {this.defaultBlob}
                </InfoGraphic>
              );
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


export default connect(null, { setInfoGraphicBlob }) (InfoGraphicList);
