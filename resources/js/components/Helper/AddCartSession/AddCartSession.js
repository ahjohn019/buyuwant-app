
const handleSubmit = (itemsId, authToken, historyPath, qty) => {   
    if(authToken < 0){
        historyPath.push('/login')
    } else {
        axios({
            method:'post',
            url:'/api/cart/addSession',
            params: {items_id: itemsId, quantity: qty},
            headers: { 
                'Authorization': 'Bearer '+ authToken
              }
        }).then(()=>{
            historyPath.push("/checkout")
        })
    }
}



export default handleSubmit;