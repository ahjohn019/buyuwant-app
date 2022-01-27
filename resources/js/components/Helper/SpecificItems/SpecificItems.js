import axios from "axios";
import { useEffect, useState } from "react";

const tagsDetails = ItemsId => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const trueData = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataTest = await axios.get(`/api/items/${ItemsId}`);
                setData(dataTest.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading !== true) {
        trueData.push(data);
    }

    return trueData;
};

export default tagsDetails;
