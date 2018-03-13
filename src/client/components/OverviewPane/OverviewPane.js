import React from 'react';
// import '../../styles/OverviewPane.css';

const OverviewPane = (props) => {
  return <div className="pane">
      {props.title && <h3>{props.title}</h3>}
      {props.dataView}
      {props.description && <p>{props.description}</p>}
  </div>;
};

export default OverviewPane;
