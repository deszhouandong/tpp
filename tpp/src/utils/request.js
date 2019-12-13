import axios from 'axios'
// import qs from 'qs'
import lodash from 'lodash'
// const { pathToRegexp, match, parse, compile } = require("path-to-regexp");

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
    headers:{
      'Content-Type':'application/json',
    'Authorization': '86a0485c-a53e-4f5f-8cea-4928cb041289' // headers塞token
    },
  } = options

  const cloneData = lodash.cloneDeep(data)
  console.log(cloneData, "=====cloneData=====")
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      return axios.post(url, cloneData,{headers})
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  console.log(options, "======options======")
  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = response.data
    return {
      success: true,
      message: statusText,
      status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let status
    let otherData = {}
    if (response) {
      const { data, statusText } = response
      otherData = data
      status = response.status
      msg = data.message || statusText
    } else {
      status = 600
      msg = 'Network Error'
    }
    return { success: false, status, message: msg, ...otherData }
  })
}
