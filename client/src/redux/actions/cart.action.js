export const addToCartAction = (product) => {
    return {
        type: 'ADD_TO_CART',
        payload: product
    }
}

export const removeCartAction = (id) => {
    console.log(id)
    return {
        type: 'REMOVE_FROM_CART',
        payload: id
    }
}