import { createContext, useEffect, useState } from "react";
import axios from "axios";
const FilmContext = createContext({})

function FilmsProvider({children}) {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const handleRequest = async() => {
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${search}`);
        setData(response.data);
        };
        if(!search) {
            handleRequest();
        } else {
            if(search.length >= 3) {
                handleRequest();
            }
            if(search.length === 0) {
                setData([]);
            }
        };
    }, [search]);

    const filmsProps = {
        data,
        search,
        setSearch,
    }

    return (
        <FilmContext.Provider value={filmsProps}>{children}</FilmContext.Provider>
    );
};

export { FilmContext, FilmsProvider };