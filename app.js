// get all the add to cart buttons and attach click event listeners
const addBtns = document.querySelectorAll('button[id$="-add-btn"]');
addBtns.forEach(btn => btn.addEventListener('click', addToCart));

// get the view cart button and attach click event listener
const viewCartBtn = document.getElementById('view-cart-btn');
viewCartBtn.addEventListener('click', viewCart);

// get the cart items list and cart container
const cartItemsList = document.getElementById('cart-items');
const cartContainer = document.getElementById('cart-container');

// add to cart function
function addToCart(event) {
  const btn = event.target;
  const item = btn.parentNode;
  const itemName = item.querySelector('h2').textContent;
  const itemPrice = item.querySelector('p').textContent;
  const itemId = btn.getAttribute('id').replace('-add-btn', '');
  const itemQtySpan = item.querySelector(`#${itemId}-quantity`);
  const itemCartQtySpan = item.querySelector(`#${itemId}-cart-quantity`);

  if (itemQtySpan.textContent === '0') {
    alert('This item is out of stock!');
    return;
  }

  // add item to cart
  let itemAlreadyInCart = false;
  const cartItems = cartItemsList.querySelectorAll('li');
  cartItems.forEach(cartItem => {
    if (cartItem.dataset.itemId === itemId) {
      cartItem.dataset.itemQty++;
      const cartItemQtySpan = cartItem.querySelector('.cart-item-qty');
      cartItemQtySpan.textContent = cartItem.dataset.itemQty;
      itemAlreadyInCart = true;
    }
  });

  if (!itemAlreadyInCart) {
    const cartItem = document.createElement('li');
    cartItem.dataset.itemId = itemId;
    cartItem.dataset.itemQty = 1;
    cartItem.innerHTML = `${itemName} - ${itemPrice} <span class="cart-item-qty">1</span>`;
    cartItemsList.appendChild(cartItem);
  }

  // update cart count and item quantity
  itemQtySpan.textContent--;
  itemCartQtySpan.textContent++;
  updateCartCount();
}

// view cart function
function viewCart() {
  cartContainer.classList.toggle('show-cart');
}

// update cart count function
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const cartItems = cartItemsList.querySelectorAll('li');
  let totalCount = 0;
  cartItems.forEach(cartItem => {
    totalCount += parseInt(cartItem.dataset.itemQty);
  });
  cartCount.textContent = totalCount;
}
