import { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { BsFillStarFill } from "react-icons/bs";

function Favoritos(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        const minhaLista = localStorage.getItem("@primeflix");
        setFilmes(JSON.parse(minhaLista) || []);
    },[])

    function excluirFilme(id){
        let filtroFilmes = filmes.filter( (filme) =>{
            return (filme.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primeflix", JSON.stringify(filtroFilmes));
        toast.success("Movie successfully removed!");
    }


    return(
        <div className="meus-filmes">
            <h1>My movies</h1>

            {filmes.length === 0 && <span> You don't have any movies saved :( </span>}

            <ul>
                {filmes.map((filme)=>{
                    return(
                        <li key={filme.id}>
                            <div className="title">
                                <BsFillStarFill size={15} color="#310200"/>
                                <span>{filme.title}</span>
                            </div>

                            <div>
                                <Link to={`/filme/${filme.id}`}>See details</Link>
                                <button className="buttonDelete" onClick={() =>excluirFilme(filme.id)}>Delete</button>
                            </div>

                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;