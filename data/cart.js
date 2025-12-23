export  const cart = [];
export function addToCart(productId){
    const quantity = Number(document.querySelector(`.js-select-quantity-${productId}`).value);

 let matchingItem;
cart.forEach((cartItem) => {
  if(productId === cartItem.productId){
    matchingItem = cartItem;
  }
});
if(matchingItem){  
  matchingItem.quantity += quantity;
  }else{ 
  cart.push({
  productId, 
  quantity
}); 
 }
}

export function updateCartQuantity(){
let cartQuantity = 0;

cart.forEach((cartItem)=>{
 cartQuantity  += cartItem.quantity;
});

document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}