import "./style.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { toast } from "react-toastify";

function Filme(){
    const {id} = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: process.env.NEXT_PUBLIC_API_KEY
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Movie not found");
                navigate("/", {replace: true}) // Replace: true vai redirecionar para a pagina na qual eu defini, no caso a página de home
                alert("Movie not found!")
                return;
            })
        }

        loadFilme();

        return () =>{
            console.log("Componente foi desmontado");
        }

    },[navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix"); //Aqui estamos criando apenas uma chave para salvar o conteúdo no localStorage

        let filmesSalvos = JSON.parse(minhaLista) || []; //Estou convertendo para string porque quando enviamos uma lista precisamos converter. || [] significa: OU se nao tiver nada salvo, inicia como um array vazio.

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id) //Aqui estou fazendo a comparacao para saber se esse item já está na lista. some devolve true ou false

        if(hasFilme){
            toast.warn("THIS MOVIE IS ALREADY IN YOUR LIST!");
            return; //Para parar a execuçao do código
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success("Movie saved successfully!");
    }

    if(loading){
        return(
            <h2 className="loading">Loading information...</h2>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Synopsis</h3>
            <span>{filme.overview}</span>
            <strong>Evaluation: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Save</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a> {/* Target=blank é para abrir em outra aba. e o rel=external é só para os motores de busca entenderem que é um link externo. */}
                </button>

            </div>

        </div>
    )
}

export default Filme;