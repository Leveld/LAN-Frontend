import auth0 from 'auth0-js';
import {Cookies} from 'react-cookie';
import { AUTH_CONFIG } from './auth0-variables';

const cookie = new Cookies();

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    audience: `https://${AUTH_CONFIG.domain}/userinfo`,
    responseType: 'code',
    scope: 'openid'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    cookie.remove('type');
    this.auth0.authorize();
    this.handleAuthentication;
  }

  handleAuthentication =() => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // redirect user
        console.log(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  }

  setSession(authResult) {
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
     window.localStorage.setItem('access_token', authResult.accessToken);
     window.localStorage.setItem('id_token', authResult.idToken);
     window.localStorage.setItem('expires_at', expiresAt);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // redirect user
  }

  isAuthenticated() {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
