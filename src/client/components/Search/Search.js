import React, {Component} from 'react';
import axios from 'axios';
import {apiServerIP} from 'capstone-utils';
import {Link} from 'react-router-dom';


class Search extends Component {
  constructor(){
    super();
    this.state = {users:[], display: [], type: 'name'};
  }
  componentWillMount(){
    //get all users
    axios.get(`${apiServerIP}users`, {headers:{Authorization: window.localStorage.getItem('access_token')}})
    .then((res) => {
      this.setState({users: res.data});
    })
  }

  filter = (input) => {
    if(input === "") return this.setState({display: []});
    const filtered = this.state.users.filter((user) => String(user[this.state.type]).toLocaleLowerCase().startsWith(input.toLocaleLowerCase()));
    this.setState({display: filtered});
  }

  render() {
    return (
      <form style={{background: '#00AA5d', display: 'flex', flexDirection: 'column' }}> 
      <div style={{display: 'flex', flexDirection:'row', flex: 1, fontSize: '0.5rem'}}>
        <select onChange={(e)=> this.setState({type: e.target.value})} style={{flex:1}}>
          <option value="name">NAME</option>
          <option value="id">ID</option>
          <option value="type">TYPE</option>
        </select>
        
        <input onChange={(e)=> this.filter(e.target.value)} type="text" style={{width: '90%', fontSize: '1rem'}}/>
        </div>
        
        {this.state.display.map((user) => <Link to={`/profile?id=${user.id}&type=${user.type}`} style={{textDecoration: 'none', marginLeft: 5}}>{user.name}</Link>)}
      </form>
    );
  }
}

export default Search;