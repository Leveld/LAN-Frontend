import React, {Component} from 'react';
import {connect} from 'react-redux';
import {categories} from '../../../server/config.json';
import axios from 'axios';
import {apiServerIP} from 'capstone-utils';

class CampaignAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggles: {
        rules: false,
        info: true,
        tags: false
      },
      current: '',
      rules: [],
      tags: [],
      title: '',
      start: null,
      end: null,
      status: '',
      category: '',
      details: '',
      description: ''
    }
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
     const fields = {
       owner: {
         ownerType: 'Business', // 'User', 'ContentProducer', 'Business', 'Manager'
       	ownerID: this.props.user._id
       },
       status : 'Active', // 'Active', 'Inactive', 'Frozen', 'Terminated', 'Closed', 'Completed'
       preferredApplicant: {
         coType: 'YouTube',
         industry: e.target.industry.value
       },
       description: this.state.description
     };
     console.log(this.state.category)
     const token = window.localStorage.getItem('access_token') || cookie.get('access_token');
     console.log('token is ' + token);
     axios.post(`${apiServerIP}campaign`, {fields}, {headers: { Authorization: `Bearer ${token}`}})
     .then((res) => {
         //window.location.replace(res.data.url);
       console.log(res.data);
      this.parent.toggleForm();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  toggle = (section) => {
    const toggles = this.state.toggles;
    toggles[section] = !toggles[section];
    this.setState({toggles});
  }

  render(){
    return (
      // <div className="Campaign-add-wrapper">
      <div className="pane modal-campaign">

        <form className="modal-campaign--form" onSubmit={(e) => this.createCampaign(e)} >
          <h4 className="modal-campaign--header">Create A New Campaign</h4>
          <hr/>
          <div className="Campaign-add-form-content">
            <div className="modal-campaign--input-wrapper">
              <label>Title:</label>
              <input className="modal-campaign--input" autoComplete="off" type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
            </div>
            <div className="modal-campaign--input-wrapper">
              <label>Industry:</label>
              <input className="modal-campaign--input" name="industry" autoComplete="off" type="text" value={this.state.category} onChange={(e) => this.setState({category: e.target.value})}/>
            </div>
            <div className="modal-campaign--input-wrapper">
              <label className="modal-campaign--block">Description:</label>
              <textarea className="modal-campaign--input modal-campaign--block modal-campaign--textarea" scale="off" onChange={(e) => this.setState({description: e.target.value})} />
            </div>
            {/*
              <div className="Campaign-add-rule-wrapper">
                <div className="Campaign-add-rule-display">
                  {
                  this.state.rules.map((rule, i) => {
                    return (
                      <div className="Campaign-add-rule-item" key={i}>
                        <div> {i+1}.{rule.toUpperCase()}</div>
                        <div  className="Campaign-add-rule-remove-btn"><span onClick={()=> this.removeItem('rules',i)}>x</span></div>
                      </div>
                      )
                    })
                  }
                </div>
                <div className="Campaign-add-rule">
                  <div>Add a New Rule: </div>
                  <input id="rule-input" placeholder="New Rule" autocomplete="off" onKeyDown={(e) => this.inputKeyPress(e, this.addItem, 'rules', 'rule-input')} onChange={(e)=> this.setState({current: e.target.value})} autoFocus />
                  <div  className="Campaign-add-rule-add-btn" onClick={() => this.addItem('rules', 'ruleinput')}>+</div>
                </div>
              </div>
                */}

              {/*TAGS SECTION
              <div onClick={() => this.toggle('tags')} className="Campaign-add-rule-header">TAGS</div>
              */}
              {/*
                this.state.toggles.tags ?
                (
                  <div className="Campaign-add-rule-wrapper">
                    <div className="Campaign-add-rule-display">
                      {
                        this.state.tags.map((tag, i) => {
                          return (
                            <div className="Campaign-add-rule-item" key={i}>
                              <div > #{tag.toUpperCase()}</div>
                              <div  className="Campaign-add-rule-remove-btn"><span onClick={()=> this.removeItem('tags',i)}>x</span></div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="Campaign-add-rule">
                      <div>Add a New Tag: </div>
                      <input id="tag-input" placeholder="New Rule" autocomplete="off" onKeyDown={(e) => this.inputKeyPress(e, this.addItem, 'tags', 'tag-input')} onChange={(e)=> this.setState({current: e.target.value})} autoFocus />
                      <div  className="Campaign-add-rule-add-btn" onClick={() => this.addItem('tags', 'tag-input')}>+</div>
                    </div>
                  </div>
                )
                : null
              */}
          </div>

          <div>
            <input  className="button button--color-green modal-campaign--control" type="submit" value="Create" />
            <button className="button modal-campaign--control" onClick={() => this.parent.toggleForm()}>Cancel</button>
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
