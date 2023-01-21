import instance from './axios';

const tokenAuth = (token) => {
  if (token) {
    instance.defaults.headers.common['x-auth-token'] = token;
    //console.log(instance.defaults.headers)
  } else {
    delete instance.defaults.headers.common['x-auth-token'];
  }
};

export default tokenAuth;
