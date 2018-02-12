import React, {Component} from 'react';
import Contract from './Contract';
import {connect} from 'react-redux';
import '../../styles/Contracts.css';
import {conTypes} from '../../../server/util';

class ContractList extends Component {
  constructor(props) {
    super(props);
    this.selected = 0;
    this.state = {contracts:null}
    this.contracts = props.user.contracts || [];
  }
  componentWillMount(){
    console.log(this.props.user.businessName);
    this.setState({
      contracts: this.contracts.filter((contract) => (contract.head === this.props.user.businessName && contract.type === conTypes[0]))
    });
  }
  select = (i) => this.setState({selected: i});

  render(){
    return (
      <div className="Contract-list"> 
        <div className="Contract-list-tabs">
          <div onClick={() => this.setState({contracts:this.contracts.filter((contract) => (contract.head === this.props.user.businessName && contract.type === conTypes[0]))})} className="Contract-list-tabs-tab">BUSINESS CONTRACTS</div>
          <div onClick={() =>  this.setState({contracts:this.contracts.filter((contract) => (contract.head === this.props.user.businessName && contract.type === conTypes[1] ))})} className="Contract-list-tabs-tab">MANAGER CONTRACTS</div>
        </div>
        <div className="Contract-list-wrapper">
          {
            this.state.contracts.length > 0 ? this.state.contracts.map((contract, i) => {
              return <Contract key={i} contract={contract}/>;
            }) : <div style={{width: '100%', textAlign: 'center'}}>NO CONTRACTS </div>
          }
        </div>
      </div>
    );
  }
} 

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(ContractList);