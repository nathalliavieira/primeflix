import { useEffect, useState } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

///movie/now_playing?api_key=c34fa18945cd0b82058906878b8baaf3

function Home(){
    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilmes() {
            const response = await api.get("movie/now_playing",{
                params:{
                    api_key: process.env.API_KEY
                }
            })

            setFilmes(response.data.results.slice(0, 10))
            setLoading(false);
        }

        loadFilmes();

    },[])

    if(loading){
        return(
            <h2 className="loading">Loading movies...</h2>
        )
    }

    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) =>{
                    return(
                        <article key={filme.id}>

                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} /> 
                            <Link to={`/filme/${filme.id}`}>Access</Link>

                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;