import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {accTypes} from '../../../server/config.json';
import {Cookies} from 'react-cookie';
import { InfoGraphicList, InfoGraphicDisplay, InfoGraphic } from '../../components';
import AccountData from './Account_Data';
import { setInfoGraphicBlob } from '../../actions';
const cookie = new Cookies();


   // // MOCK DATA
    // #############
    const list = [
      // { _id: '34344j34j34j34k34',
      //   name: 'CS3-P0T4T03D',
      //   profilePicture: 'http://www.seriouseats.com/recipes/images/2016/10/20161004-baked-potato-vicky-wasik-10-1500x1125.jpg',
      //   type: accTypes[0]
      // },
      // {
      //   _id: 'jhsdkjhsdkjhsdkjhsd',
      //   name: 'New Account',
      //   profilePicture: 'https://orig00.deviantart.net/41fb/f/2012/351/a/2/random_character_1_by_mnrart-d5odgq0.gif',
      //   blob:<div>SOME OTHER DATA</div>
      // }
    ];
    // #############



class MemberHome extends Component {
  constructor(props){
    super(props);
    this.data = props.user.contentOutlets ||  list
    this.testGraphData = [
      {
        title: 'Generated with title',
        description: 'bananas sold to potatoes',
        type: 'Bar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      },
      {
        type: 'Radar',
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        }
      }
    ];
  }

  removeDups = (accounts) => {
    const filtered = [];
    const reduced = accounts.filter((account) => {
      if(!filtered.includes(account.channelID)) {
        filtered.push(account.channelID);
        return true;
      }
      return false;
    });

    return reduced;
  }



  render(){
    if(!accTypes.includes(this.props.user.type) || !this.props.authenticated || (!cookie.get('access_token') && !window.localStorage.getItem('access_token'))) return <div />;

    if(!accTypes.includes(this.props.user.type)) return <div className="no_user">NO ACCOUNT SET</div>;


    const accounts = this.props.user.type === accTypes[1] ? this.removeDups(this.data) : list;

    return (
      <div className='controlpanel'>
        <InfoGraphicList title="Accounts" accounts={accounts.length} color="rgb(32, 48, 62)" >
          {
            this.props.user.type === accTypes[0] ? (
              <InfoGraphic {...this.props.user} >
                <AccountData overviewDataPoints={this.testGraphData} {...this.props.user} />
              </InfoGraphic>
            )
            :null
          }
          {
            accounts.map((item, i) => {
              return (
                <InfoGraphic key={i} {...item} >
                  <AccountData overviewDataPoints={this.testGraphData} {...item} />
                </InfoGraphic>
              );
            })
          }

        </InfoGraphicList>
        <InfoGraphicDisplay toggle={0}/>
      </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth,
    user: state.user,
  };
};

export default connect(mapStateToProps, {setInfoGraphicBlob})(MemberHome);
