import axios, { Axios } from "axios";

//Creating an instance
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const get = async (path, opion = {}) => {
    const response = await httpRequest.get(path, opion);
    return response.data;
}

export default httpRequest