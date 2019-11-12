import axios from 'axios'

const apiUrl = "https://conduit.productionready.io/api/"
const paginationSize = 10

export const apiCall = (path, method = 'get', payload) => new Promise((resolve, reject) => {
  let config = {
    url: apiUrl + path,
    method: method,
    headers: {
      "Content-Type": "application/json",
    }
  };

  // if (userToken)
  //   config.headers.Authorization = "Bearer " + userToken

  if (method !== "get" && payload) {
    config.data = payload;
  }

  axios(config).then(res => {
    const {data, status, statusText} = res;
    if (status < 299)
        resolve(data)
    else
      reject({error: statusText});

  }).catch(error => {
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

export const getData = (resourceName, page = 1) => apiCall(`${resourceName}?limit=${paginationSize}&offset=${(page-1)*paginationSize}`)
export const getSingleResource = (resourceName, slug) => apiCall(`${resourceName}/${slug}`)
