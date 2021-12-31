
const handleSubmit = (itemsId, authToken, historyPath, qty, variantSelection) => {   
    if(authToken < 0){
        historyPath.push('/login')
    } else {
        axios({
            method:'post',
            url:'/api/cart/addSession',
            params: {items_id: itemsId, quantity: qty, variant:variantSelection},
            headers: { 
                'Authorization': 'Bearer '+ authToken
              }
        }).then(()=>{
            historyPath.push("/checkout")
        })
    }
}

export default handleSubmit;