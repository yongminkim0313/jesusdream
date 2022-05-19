import Axios from "axios";
export function refreshToken() {
    const data = Axios.post('/token')
    return data;
}