import React from 'react';
import { render } from 'react-dom';
// import Hello from './Hello';
import { Doughnut, Radar, Line, Bar } from 'react-chartjs-2';

const ban = {
  datasets: [
    {
      data: [10, 20, 30]
    }
  ],
  labels: ['Red', 'Yellow', 'Blue']
};

const ban2 = {
  datasets: [
    {
      data: [24, 20, 30, 45, 93, 12]
    }
  ],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
};

const ChartView = (props) => {
  return (
    <div className='chartContainer'>
    {
      (() => {
        switch (props.type) {
        case 'Doughnut':
          return <Doughnut {...props} />;
        case 'Radar':
          return <Radar {...props} />;
        case 'Line':
          return <Line {...props} />;
        case 'Bar':
          return <Bar {...props} />;
        case 'Number':
          <em>{props.data}</em>;
        default:
          return 'Chart data missing.';
        }
      })()
    }
    </div>
  );
};


export default ChartView;
