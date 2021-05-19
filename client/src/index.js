import React from 'react';
import ReactDom from 'react-dom';
import App from './App'
import './style/main.css'

import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:5000/"

axios.interceptors.request.use(async (config) => {

  let headers = config.headers

  if (localStorage.getItem('accessToken') && config.url !== "/authentication/token/refresh") {
    if (Math.floor(Date.now() / 1000) > localStorage.getItem('expires_in')) {
      await axios.post("/authentication/token/refresh", {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('refreshToken')}`
        }
      }).then((res) => {
        const { access_token, refresh_token, expires_in } = res.data
        localStorage.setItem("refreshToken", refresh_token)
        localStorage.setItem("accessToken", access_token)
        localStorage.setItem("expires_in", Math.floor(Date.now() / 1000) + expires_in)
      })
    }
    headers = { ...headers, 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  }

  // Do something before request is sent
  return {
    ...config,
    headers
  };
}, (error) => {

  // Do something with request error
  return Promise.reject(error);
});

ReactDom.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)