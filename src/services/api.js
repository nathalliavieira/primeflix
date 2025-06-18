//  base da url: https://api.themoviedb.org/3/
//ULR da API: /movie/now_playing?api_key=

import axios from "axios";

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3/"
});

export default api;