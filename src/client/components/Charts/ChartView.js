import React from 'react';
import { render } from 'react-dom';
// import Hello from './Hello';
import { Doughnut, Radar, Line, Bar } from 'react-chartjs-2';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
};

const ViewStyles = {
  margin: '.5em',
  padding: '.5em',
  border: '1px solid #eee',
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'row'
};

const ViewItemStyles = {
  width: '100',
  border: '1px solid #eee'
};

const GraphViewStyles = {
  display: 'block'
};

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
    <div style={GraphViewStyles}>
    {
      (() => {
        switch (props.type) {
        case 'Doughnut':
          return <Doughnut data={props.data} />;
        case 'Radar':
          return <Radar data={props.data} />;
        case 'Line':
          return <Line data={props.data} />;
        case 'Bar':
          return <Bar data={props.data} />;
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
