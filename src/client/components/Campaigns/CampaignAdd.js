import React, {Component} from 'react';
import {connect} from 'react-redux';
import {categories} from '../../../server/config.json';

class CampaignAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {toggles: {rules: false, info: true, tags: false},current: '', rules: [], tags: [], title: 'Untitled', start: null, end: null}
    this.parent = props.parent;
  }
  addItem = (type, inputID) => {
    if(this.state.current !== '' || this.state.current.length > 0) {
      const items = this.state[type].concat();
      if(!items.includes(this.state.current)) {
        items.push(this.state.current);
        document.getElementById(inputID).value = "";
        this.setState({[type]:items, current: ''});
      }
    }
  }


  inputKeyPress = (e, cb, type, inputID) => { if(e.keyCode === 13){e.preventDefault(); cb(type, inputID);}}

  removeItem = (type, index) => {
    
    const items = this.state[type].concat();
    items.splice(index, 1);
    this.setState({[type]:items});
    
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

        <form className="Campaign-add-form" onSubmit={(e) => this.createCampaign(e)} >
          <div className="Campaign-add-form-header">Create A New Campaign</div>
          <div className="Campaign-add-form-header-info">
              <span style={{color:'red'}}>UserID: </span> {this.props.user._id} 
              <span style={{color:'red', marginLeft: '20px'}}>Company: </span>{this.props.user.businessName}
          </div>
          <div className="Campaign-add-form-content">
           

              {/*INFO SECTION*/}
              <div onClick={() => this.toggle('info')} className="Campaign-add-rule-header">INFO</div>                          
              {
                this.state.toggles.info ?
                  <div className="Campaign-add-info">
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label>Title</label>
                      <input autocomplete="off" type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
                    </div>
                  
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label>Start</label>
                      <input type="date" onChange={(e) => this.setState({start: e.target.value})}/>
                      <label>End</label>
                      <input type="date" onChange={(e) => this.setState({end: e.target.value})}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label>Categories:</label>
                      <select>
                        {
                          categories.map((cat) => <option value={cat}>{cat}</option>)
                        }
                      </select>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                      <label>Details:</label>
                      <textarea scale="off" />
                    </div>

                  </div>
                : null
              }

              {/* RULES SECTION */}
              <div onClick={() => this.toggle('rules')} className="Campaign-add-rule-header">RULES</div>            
              {
                this.state.toggles.rules ? 
                (
                  <div className="Campaign-add-rule-wrapper">
                    <div className="Campaign-add-rule-display">
                      {/*RULES COLLECTION*/}
                      {
                        this.state.rules.map((rule, i) => {
                          return (
                            <div className="Campaign-add-rule-item" key={i}>
                              <div style={{overflow: 'hidden'}} > {i+1}.{rule.toUpperCase()}</div>
                              <div  className="Campaign-add-rule-remove-btn"><span onClick={()=> this.removeItem('rules',i)}>x</span></div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="Campaign-add-rule">
                      <div style={{margin: '0 1%'}}>Add a New Rule: </div>
                      <input id="rule-input" placeholder="New Rule" autocomplete="off" onKeyDown={(e) => this.inputKeyPress(e, this.addItem, 'rules', 'rule-input')} onChange={(e)=> this.setState({current: e.target.value})} autoFocus />
                      <div  className="Campaign-add-rule-add-btn" onClick={() => this.addItem('rules', 'ruleinput')}>+</div> 
                      <div style={{margin: '0 1%'}}>Total Rules: {this.state.rules.length} </div>
                    </div>
                  </div>
                ) 
                : null
              }

              {/*TAGS SECTION*/}
              <div onClick={() => this.toggle('tags')} className="Campaign-add-rule-header">TAGS</div>                          
              {
                this.state.toggles.tags ? 
                (
                  <div className="Campaign-add-rule-wrapper">
                    <div className="Campaign-add-rule-display">
                      {/*TAGS COLLECTION*/}
                      {
                        this.state.tags.map((tag, i) => {
                          return (
                            <div className="Campaign-add-rule-item" key={i}>
                              <div style={{overflow: 'hidden'}} > #{tag.toUpperCase()}</div>
                              <div  className="Campaign-add-rule-remove-btn"><span onClick={()=> this.removeItem('tags',i)}>x</span></div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="Campaign-add-rule">
                      <div style={{marginRight: '1%'}}>Add a New Tag: </div>
                      <input id="tag-input" placeholder="New Rule" autocomplete="off" onKeyDown={(e) => this.inputKeyPress(e, this.addItem, 'tags', 'tag-input')} onChange={(e)=> this.setState({current: e.target.value})} autoFocus />
                      <div  className="Campaign-add-rule-add-btn" onClick={() => this.addItem('tags', 'tag-input')}>+</div> 
                      <div style={{marginLeft: '1%'}}>Total Tags: {this.state.tags.length} </div>
                    </div>
                  </div>
                ) 
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