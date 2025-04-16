// DOM Elements
const addBtn = document.querySelector(".add");
const removeBtn = document.querySelector(".remove");
const addToCartBtn = document.querySelector(".add-cart-button");
const itemCounter = document.querySelector(".item-counter");

const cartIcon = document.querySelector(".cart img");
const cartMenu = document.querySelector(".cart-menu");
const cartItems = document.querySelector(".cart-items");
const checkoutBtn = document.querySelector(".checkout");
const cartCount = document.querySelector(".cart-count");

// Counts
let itemCount = 0;
let totalCartQty = 0;

// Functions 

// Update item count display
const updateItemCount = (newCount) => {
     itemCount = newCount;
     itemCounter.textContent = itemCount;
};

// Add/Remove item count
addBtn.addEventListener("click", () => updateItemCount(itemCount + 1));
removeBtn.addEventListener("click", () => {
     if (itemCount > 0) updateItemCount(itemCount - 1);
});

// Update total quantity in cart icon
const updateTotalCartQty = () => {
     const items = document.querySelectorAll(".cart-item");
     totalCartQty = 0;

     items.forEach(item => {
          totalCartQty += parseInt(item.dataset.quantity);
     });

     cartCount.textContent = totalCartQty;
};

// empty cart UI
const showEmptyCartMessage = () => {
     cartItems.classList.add("empty");
     cartItems.innerHTML = `<p class="cart-empty">Your cart is empty.</p>`;
     checkoutBtn.classList.add("empty");
};

// Cart Menu display
cartIcon.addEventListener("click", () => {
     cartMenu.classList.toggle("active");
});

// Add item to cart
const addItemToCart = (name, price, imageSrc) => {
     const existingItem = [...cartItems.querySelectorAll(".cart-item")].find(
          item => item.querySelector(".cart-item-name")?.textContent === name
     );

     // Update quantity and total price
     if (existingItem) {
          const oldQty = parseInt(existingItem.dataset.quantity);
          const newQty = oldQty + itemCount;
          existingItem.dataset.quantity = newQty;

          const priceLine = existingItem.querySelector(".cart-item-details");
          priceLine.innerHTML = `$${price.toFixed(2)} x ${newQty} <span class="total-price">$${(newQty * price).toFixed(2)}</span>`;
     }
     // Create new cart item
     else {
          const cartItem = document.createElement("div");
          cartItem.classList.add("cart-item");
          cartItem.dataset.quantity = itemCount;

          cartItem.innerHTML = `
               <img src="${imageSrc}" alt="${name}" />
               <div>
                    <p class="cart-item-name">${name}</p>
                    <p class="cart-item-details">$${price.toFixed(2)} x ${itemCount} <span class="total-price">$${(price * itemCount).toFixed(2)}</span></p>
               </div>
               <button class="delete-item"></button>
          `;
          cartItems.appendChild(cartItem);

          // Delete button 
          const deleteBtn = cartItem.querySelector(".delete-item");
          deleteBtn.addEventListener("click", () => removeItemFromCart(cartItem));
     }

     // Update total & UI
     updateTotalCartQty();
     if (cartItems.classList.contains("empty")) {
          cartItems.classList.remove("empty");
          cartItems.querySelector(".cart-empty")?.remove();
          checkoutBtn.classList.remove("empty");
     }
};

// Add to cart button
addToCartBtn.addEventListener("click", () => {
     if (itemCount === 0) return;

     const name = document.querySelector(".product-name").textContent;
     const price = parseFloat(document.querySelector(".current-price").textContent.replace("$", ""));
     const imageSrc = document.querySelector(".list-images div.active img").getAttribute("src");

     addItemToCart(name, price, imageSrc);
     cartMenu.classList.add("active");
     updateItemCount(0);
});

// Remove item from cart
const removeItemFromCart = (cartItem) => {
     cartItem.remove();
     updateTotalCartQty();

     const remainingItems = cartItems.querySelectorAll(".cart-item");
     if (remainingItems.length === 0) {
          showEmptyCartMessage();
     }
};
