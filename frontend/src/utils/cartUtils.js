export const addDecimals = (num) => {
    return (Math.round(num*100)/100).toFixed(2);//to 2 decimal places
}

export default addDecimals;

export const updateCart = (state) => {
     //calculate items price
     state.itemsPrice = addDecimals(state.cartItems.reduce((acc,item)=> acc + item.price*item.qty,0 ));
            
     //calculate shipping price(order is over 100$ it's free)
     state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0:10);
     
     //calculate tax price
     state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
     //calculate items price

     state.totalPrice = Number(Number(state.itemsPrice) +
     Number(state.shippingPrice) + 
     Number(state.taxPrice)).toFixed(2);
 
     localStorage.setItem('cart', JSON.stringify(state));
     return state;
}