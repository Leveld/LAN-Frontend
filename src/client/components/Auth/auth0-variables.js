//import {authServerIP} from 'capstone-utils';
const authServerIP = 'https://leveld-auth.herokuapp.com';
export const AUTH_CONFIG = {
  domain: 'leveld.auth0.com',
  clientId: '59qiZ8qOFGyWC2d6ZJtK0v7ypEFV6KOs',
  callbackUrl: `${authServerIP}login`
}
