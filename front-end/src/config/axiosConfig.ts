import axios from 'axios';
axios.defaults.withCredentials = true
export const baseURL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/'

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
});

instance.interceptors.response.use((data: any ) => {
    if(data.hasOwnProperty('data'))
        return data.data
    return data
})

export default instance