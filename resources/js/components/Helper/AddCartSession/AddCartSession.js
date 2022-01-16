const handleSubmit = async (
    itemsId,
    authToken,
    historyPath,
    qty,
    variantSelection
) => {
    try {
        if (authToken < 0) {
            historyPath.push("/login");
        } else {
            await axios({
                method: "post",
                url: "/api/cart/addSession",
                params: {
                    items_id: itemsId,
                    quantity: qty,
                    variant: variantSelection
                },
                headers: {
                    Authorization: "Bearer " + authToken
                }
            }).then(() => {
                historyPath.push("/checkout");
            });
        }
    } catch (error) {
        console.error(error);
    }
};

export default handleSubmit;
