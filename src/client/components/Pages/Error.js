import React from 'react';

const Error = () => {
  let err = "STATUS 404";
  if(window.location.href.split('m=')[1]){
  err = window.location.href.split('m=')[1].split('%20').join(' ').split('%27').join('"');
  }
  return (
    <div className="Error-wrapper">
      <div className="Error-display">
        <div className="Error-title"> ERROR</div> 
        <div className="Error-message"> {err}</div>
      </div>
    </div>
  );
}

export default Error;