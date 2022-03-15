export const addItemToCart = (cartItems, newItem) => {
    const isExists = cartItems.find((cartItem) => cartItem.id === newItem.id)

    if(isExists)
    {
        return cartItems.map(cartItem => {
            if(cartItem.id === newItem.id)
            {
                return {...cartItem, quantity: cartItem.quantity + 1};
            }
            return cartItem;
        });
    }

    return [...cartItems, {...newItem, quantity: 1}];
}