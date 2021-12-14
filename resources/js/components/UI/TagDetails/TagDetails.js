import axios from 'axios';
import { useEffect, useState } from 'react';

const tagsDetails = (tagsId) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data: response } = await axios.get('/api/tag-details')
            const finalData = response.tagsDetails.filter(tag => tag.tags_id == tagsId)
            setData(finalData);
          } catch (error) {
            console.error(error)
          }
          setLoading(false);
        };
        fetchData();
      }, []);
    
    return {
        data,
        loading,
    };
}
    

export default tagsDetails;