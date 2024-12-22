const cartProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 1200.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },
  {
    id: 2,
    name: "Headphones",
    price: 150.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 3,
    name: "Mouse",
    price: 25.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 4,
    name: "Airpods",
    price: 120.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },
];

function initialCart() {
  // localStorage.clear();
  if (!localStorage.getItem("cartProducts")) {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
}

document.addEventListener("DOMContentLoaded", () => {

  initialCart();

  const a = document.getElementById("cards");
  const b = document.getElementById("price");
  const c = document.getElementById("checkout-btn");
  const d = document.querySelector(".btn-total");

  function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

    a.innerHTML = "";

    if (cartItems.length > 0) {
      cartItems.forEach((ele, ind) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
            <img src="${ele.image}" alt="${ele.name}">
            <div class="product-details">
            <h3>${ele.name}</h3>
            <p>$${ele.price}</p>
            <div class="quantity-btn">
            <input id = "quantity" type="number" value="${ele.quantity}" min="1" max="30"/>
            <button type="button" class="btn">Remove</button>
            </div>
            </div>`;
      
        a.appendChild(div);

        const removeBtn = div.querySelector(`.btn`);
        const quantityInput = div.querySelector(`#quantity`);

        removeBtn.addEventListener("click", () => {
          cartItems.splice(ind, 1);
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));
          loadCartItems();
        });

        quantityInput.addEventListener("change", (event) => {
          ele.quantity = parseInt(event.target.value);
          localStorage.setItem("cartProducts", JSON.stringify(cartItems));
          updateTotal();
        });
      });
      updateTotal()
    } else {
      d.style.display = "none"
      a.innerHTML = `<p>Your cart is Empty!!<br>Please add Items to display</p>`

    }
  }
  loadCartItems();
  c.addEventListener("click", () => {
    alert("Proceeding to checkout");
  });

  function updateTotal() {
    let total = 0;
    const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartItems.forEach((ele) => {
      total += ele.price * ele.quantity;
    });
    b.textContent = `Total: $${total.toFixed(2)}`;
  }
});


