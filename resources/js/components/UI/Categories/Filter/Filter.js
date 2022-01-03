import React, {useState, useEffect} from 'react';

//1. Connect Attributes API From DB
//2. Attributes API contains Items List
//3. Use Filter JS To Filter Out the Items After Selected
function filterVariants(){
    const [filterVariants, setFilterVariants] = useState([])

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const filterDetails = await axios.get('/api/variants');
                setFilterVariants({attribute:filterDetails.data.variants})
            } catch(error){
                console.error(error)
            }
        }
        fetchData()
    },[])

    console.log(filterVariants)

    return(
        <div>
            <p>Size</p>
            <p>Color</p>
            <p>Price Filter</p>
        </div>
    );
}

export default filterVariants;
