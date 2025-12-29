import {cart,removeFromCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formateCurrency } from "./utils/money.js";


let cartSummary = ``;

cart.forEach((cartItem)=>{
  const productId =cartItem.productId;

  let matchingProduct;
  products.forEach((product)=>{
    if(product.id == productId){
      matchingProduct =  product;
    }
  });
 cartSummary +=` <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${matchingProduct.name}
      </div>
      <div class="product-price">
        $${formateCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>

        <div class="update-quantity-link  js-update-container  js-update-link-${matchingProduct.id}">
          <span class="link-primary">Update</span>
          <div class="js-input-save-container update-hidden"></div>
        </div>
        <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
});

document.querySelector('.js-order-summary').innerHTML = cartSummary;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click',()=>{
const productId = link.dataset.productId;
console.log(productId);
removeFromCart(productId);

const container = document.querySelector(`.js-cart-item-container-${productId}`);
container.remove();
updateCartQuantity();
});
});

function updateCartQuantity(){
  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-checkout-quantity').innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();

 document.querySelectorAll(`.js-update-container`).forEach((link)=>{
link.addEventListener('click',()=>{
  const updateContainer =document.querySelector('.js-input-save-container');
  const updateHtml =`
  <input class="quantity-input" type="number" >
  <span class="save-quantity-link link-primary">save</span>`;
  updateContainer.innerHTML = updateHtml;
    updateContainer.classList.remove('update-hidden');
  updateContainer.classList.add('update-show');
});
});

