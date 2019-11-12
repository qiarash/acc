import axios from 'axios'
import store from 'store'

const apiUrl = "https://conduit.productionready.io/api/"
const paginationSize = 10

export const apiCall = (path, method = 'get', payload) => new Promise((resolve, reject) => {
  let config = {
    url: apiUrl + path,
    method: method,
    headers: {
      "Content-Type": "application/json"
    }
  };

  let userToken = store.get('token')
  if (userToken)
    config.headers.Authorization = "Token " + userToken

  if (method !== "get" && payload) {
    config.data = payload;
  }

  axios(config).then(res => {
    const {data, status, statusText} = res;
    if (status < 299)
      resolve(data)
    else
      reject({error: statusText});

    }
  ).catch(error => {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      reject(error.response);
    } else if (error.request) {
      console.log(error.request);
      reject(error.request);
    } else {
      console.log("Error", error.message);
      reject(error.message);
    }
  })
})

export const getData = (resourceName, page = 1) => apiCall(`${resourceName}?limit=${paginationSize}&offset=${ (page - 1) * paginationSize}`)
export const getSingleResource = (resourceName, slug) => apiCall(`${resourceName}/${slug}`)
export const deleteResource = (resourceName, slug) => apiCall(`${resourceName}/${slug}`, 'DELETE')
export const addEditResource = (resourceName, payload, isEdit, slug) => apiCall(
  isEdit
  ? `${resourceName}/${slug}`
  : `${resourceName}/`,
isEdit
  ? 'PUT'
  : 'POST', {
  [resourceName.slice(0, -1)]: payload
})

export const loginApi = payload => apiCall(`users/login`, 'POST', {user: payload})
export const registerApi = payload => apiCall(`users`, 'POST', {user: payload})
export const getMe = payload => apiCall(`user`)
