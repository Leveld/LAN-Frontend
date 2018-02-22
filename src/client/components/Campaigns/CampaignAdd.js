import React, {Component} from 'react';
import {connect} from 'react-redux';

class CampaignAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {toggles: {rules: false},current: '', rules: []}
    this.parent = props.parent;
  }
  addRule = () => {
    if(this.state.current !== '' || this.state.current.length > 0) {
      const rules = this.state.rules.concat();
      if(!rules.includes(this.state.current)) {
        rules.push(this.state.current);
        document.getElementById('rule-input').value = "";
        this.setState({rules: rules, current: ''});
      }
    }
  }

  inputKeyPress = (e, cb) => { if(e.keyCode === 13){e.preventDefault(); cb();}}

  removeRule = (index) => {
    
    const rules = this.state.rules.concat();
    rules.splice(index, 1);
    this.setState({rules});
    
  }

  createCampaign = (e) => {
    e.preventDefault();
    alert('ADD CAMPAIGN ROUTE');
    this.parent.toggleForm();
  }

  toggle = (section) => {
    const toggles = this.state.toggles;
    toggles[section] = !toggles[section];
    this.setState({toggles});
  }

  render(){
    return (
      <div className="Campaign-add-wrapper">

        <form className="Campaign-add-form" onSubmit={(e) => this.createCampaign(e)}>
          <div className="Campaign-add-form-content">
            <div className="Campaign-add-form-header">Create A New Campaign</div>
            <div className="Campaign-add-form-header-info"><span style={{color:'red'}}>UserID</span>: {this.props.user._id}</div>
            {/* RULES SECTION */}
            <div onClick={() => this.toggle('rules')} className="Campaign-add-rule-header">RULES</div>            
            {
              this.state.toggles.rules ? (<div className="Campaign-add-rule-wrapper">
              <div className="Campaign-add-rule-display">
                {/*RULES COLLECTION*/}
                {
                  this.state.rules.map((rule, i) => {
                    return (
                      <div className="Campaign-add-rule-item" key={i}>
                        <div style={{overflow: 'hidden'}} > {i+1}.{rule.toUpperCase()}</div>
                        <div  className="Campaign-add-rule-remove-btn"><span onClick={()=> this.removeRule(i)}>x</span></div>
                      </div>
                    )
                  })
                }

              </div>
              <div className="Campaign-add-rule">
                <div style={{marginRight: '1%'}}>Add a New Rule: </div>
                <input id="rule-input" placeholder="New Rule" onKeyDown={(e) => this.inputKeyPress(e, this.addRule)} onChange={(e)=> this.setState({current: e.target.value})} autoFocus />
                <div  className="Campaign-add-rule-add-btn" onClick={() => this.addRule()}>+</div> 
                <div style={{marginLeft: '1%'}}>Total Rules: {this.state.rules.length} </div>
              </div>
            </div>) 
             : null
          }
            
          </div>

          {/*Controls*/}
          <div className="Campaign-add-form-controls">
            <button onClick={() => this.parent.toggleForm()}>Cancel</button>
            <input type="submit" value="Create" />
          </div>
        </form>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(CampaignAdd);