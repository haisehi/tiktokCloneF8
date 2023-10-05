import axios, { Axios } from "axios";

//Creating an instance
const request = axios.create({
    baseURL: 'https://tiktok.fullstack.edu.vn/api/'
})

export const get = async (path,opion={}) => {
    const response = await request.get(path,opion);
    return response.data;
}

export default request