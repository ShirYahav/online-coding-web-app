import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../utils/config";

const CodeBlocksList = () => {

    const [codeBlocks, setCodeBlocks] = useState([]);

    useEffect(() => {
        const fetchCodeBlocks = async () => {
            try {
                const response = await axios.get(config.getCodeBlocks);
                console.log(response.data);
                setCodeBlocks(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCodeBlocks();
    }, []);

    
    return <>hello</>
}

export default CodeBlocksList;