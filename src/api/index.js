import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    var axiosInstance = axios.create({
        baseURL: config.serverURI,
    });

    // Alter defaults after instance has been created
    axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token');

    return axiosInstance({ method, url, data })
  }
}
