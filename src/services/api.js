//  base da url: https://api.themoviedb.org/3/
//ULR da API: /movie/now_playing?api_key=c34fa18945cd0b82058906878b8baaf3

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;