import axios from "axios";
import { useEffect, useState } from "react";

const tagsDetails = tagsId => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(
                    `/api/tag-details/filter/${tagsId}`
                );
                setData(response.tagsFilter);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    return {
        data,
        loading
    };
};

export default tagsDetails;
