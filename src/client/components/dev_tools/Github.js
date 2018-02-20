import React, {Component} from 'react';
import axios from 'axios';
import '../../styles/Github_Client.css';
import {Cookies} from 'react-cookie';
const cookie = new Cookies();

export default class Github extends Component {
  constructor(){
    super();
    this.state = {access: false, user: null, display: <div> MAIN CONTENT </div>};
  }


  componentWillMount(){
    if(window.localStorage.getItem('gitT'))
    axios.get('https://api.github.com/user', {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
      .then((res) => {      
        return this.setState({access: true, user: res.data});
      });
  }

  findOrg = () => {
    axios.get('https://api.github.com/orgs/leveld', {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
    .then((res)=> 
      this.findRepos()
    )
    .catch((err)=> console.log(err));
  }
  findCommits = (repo) => {
    return axios.get (`https://api.github.com/repos/Leveld/${repo}/commits`, {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
    .then((res)=> {
      console.log(res.data);
      this.setState({display: 
      <div >
        {res.data.map((commit) => 
          <div style={{display: 'flex', width:'100%', flexDirection: 'row', border: '1px solid black'}}>
            <div style={{padding: '1%'}}>{commit.commit.author.name}</div>
            <div style={{flex: 1, whiteSpace: 'wrap', padding: '1%'}}>{commit.commit.message}</div>
            <div style={{padding: '1%'}}>{commit.commit.author.date}</div>
          </div> 
        )}
      </div>
    })}
    )
    .catch((err)=> console.log(err));
  }
  findPulls = (repo) => {
    return axios.get(`https://api.github.com/repos/Leveld/${repo}/pulls`, {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
    .then((res)=> {
    if(res.data.length === 0) return this.setState({display:<div>NO DATA</div>});
      console.log(res.data);
      this.setState({display: 
      <div >
        {res.data.map((pr) => <div onClick={()=> this.prDetails(repo, pr.number)}> {pr.title}</div>)}
      </div>
    })}
    )
    .catch((err)=> console.log(err));
  }
  findRepos = () => {
    axios.get('https://api.github.com/orgs/leveld/repos', {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
    .then((res)=> 
        
       { const data = res.data.map((repo) => {
          axios.get(`https://api.github.com/repos/leveld/${repo.name}/branches`)
          .then((r) => {
            const branches = [];
            r.data.forEach((branch) => {
              branches.push(<div>{branch.name}</div>);
            })
            return (
            <div >
              <div>{repo.name}</div>
              {branches}
              <span onClick={()=>this.findCommits(repo.name)}>Commits</span> <span onClick={()=>this.findPulls(repo.name)}>Pull Requests {repo.open_issues}</span>
            </div>
          );
          })
        });
        this.setState({display: data})
      }
      )
    .catch((err)=> console.log(err));
  }
  findUser = () => {
    axios.get('https://api.github.com/user', {headers:{Authorization: 'token ' + window.localStorage.getItem('gitT')}})
    .then((res) => { 
      console.log(res.data);
      this.setState({display: 
        <div>
          <img src={res.data.avatar_url} width="10%" />
          <div>
            <div>{res.data.name} </div>
            <div>{res.data.bio} </div>
          </div>
          <div>
            <span>
              Following: {res.data.following} | 
              Followers: {res.data.followers} |
              Repos: {res.data.public_repos} |
              Account: {String(res.data.plan.name).toUpperCase()}
              </span>
          </div>
        </div>
      });
    });
  }

  prDetails(repo, num){
    this.setState({display: <iframe src={`https://lambdaschool.com`} /> });
  }

  addGit = (e) => {
    e.preventDefault();
    e.target.gitT.value !== '' ? cookie.set('gitT', e.target.gitT.value, {path: '/'}) : alert('NO TOKEN SUPPLIED');
    axios.get('https://api.github.com/user', {headers:{Authorization: 'token ' + e.target.gitT.value}})
      .then((res) => {
        alert('Welcome ' + res.data.name);       
        return this.setState({access: true});
      })
      .catch((err) => {
        alert('ACCESS DENIED');
        window.localStorage.removeItem('gitT');
        this.setState({access:false})
      });
  }
  render(){
  
   return !this.state.access && !window.localStorage.getItem('gitT') ? (
      <div className="GH-client">
        <form onSubmit={(e) => this.addGit(e)} className="GH-form">
          <label>GITHUB ACCESS TOKEN</label>
          <input name="gitT" type="type" />
          <input type="submit" hidden/>
        </form>
      </div>
    )
    :
    (
      <div className="GH-client">
        <div className="GH-client-content">
          <div className="GH-client-nav">
            <div onClick={() => this.findOrg()} className="GH-client-nav-btn">

            </div>
            <div onClick={() => this.findUser()} className="GH-client-nav-btn">
              
            </div>
          </div>
          <hr/>
          <div style={{width: '100%',display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {this.state.display}
          </div>
          <br />
          <br />
        </div>  
      </div>
    );
  }
}