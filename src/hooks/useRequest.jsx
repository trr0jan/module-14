import { useState, useEffect } from "react";
import axios from "axios";

const useRequest = (url, search) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const handleRequest = async() => {
        const response = await axios.get(url);
        setData(response.data);
        console.log(response);
        }
        
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
    
    return (data);
};
export default useRequest;