import React, {Component} from 'react';
import Contract from './Contract';
import '../../styles/Contracts.css';

export default class ContractList extends Component {
  constructor(props) {
    super(props);
    this.user = props.user || {name: "Track 7 Dev", 
    contracts: [
      {title: 'MA Contract 1', CP: 'Track 7 Dev', type: 'MA', head: "business name", owner:"JON"},
      {title: 'MA Contract 2', CP: 'Track 7 Dev', type: 'MA', head: "business name", owner:"JAKE"},
      {title: 'MA Contract 3', CP: 'Track 7 Dev', type: 'MA', head: "business name", owner:"BILL"},
      {title: 'MA Contract 4', CP: 'Track 7 Dev', type: 'MA', head: "business name", owner:"BILL"},
      {title: 'MA Contract 5', CP: 'Track 7 Dev', type: 'MA', head: "business name", owner:"PAT"},
      {title: 'BA Contract 1', CP: 'Track 7 Dev', type: 'BA', head: "business name", owner:"BUSINESS"},
      {title: 'BA Contract 2', CP: 'Track 7 Dev', type: 'BA', head: "business name", owner:"BUSINESS"},
      {title: 'BA Contract 3', CP: 'Track 7 Dev', type: 'BA', head: "business name", owner:"BUSINESS"},
      {title: 'BA Contract 4', CP: 'Track 7 Dev', type: 'BA', head: "business name", owner:"BUSINESS"},
      {title: 'BA Contract 5', CP: 'Track 7 Dev', type: 'BA', head: "business name", owner:"BUSINESS"},

    ], managers: ["JON", "JAKE", "BILL", "PAT"]};
    this.selected = 0;
    this.state = {contracts:this.user.contracts.filter((contract) => (contract.head === 'business name' && contract.type === 'BA'))}
  }
  select = (i) => {
    this.setState({selected: i});
  }

  render(){
    return (
      <div className="Contract-list"> 
        <div className="Contract-list-tabs">
          <div onClick={() => this.setState({contracts:this.user.contracts.filter((contract) => (contract.head === 'business name' && contract.type === 'BA'))})} className="Contract-list-tabs-tab">BUSINESS CONTRACTS</div>
          <div onClick={() =>  this.setState({contracts:this.user.contracts.filter((contract) => (contract.head === 'business name' && contract.type === 'MA' ))})} className="Contract-list-tabs-tab">MANAGER CONTRACTS</div>
        </div>
        <div className="Contract-list-wrapper">
          {
            this.state.contracts.map((contract) => {
              return <Contract contract={contract}/>;
            })
          }
        </div>
      </div>
    );
  }
}   