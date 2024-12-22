document.addEventListener("DOMContentLoaded", () => {
  class product {
    constructor(name, description, price, image) {
      this.name = name;
      this.image = image;
      this.description = description;
      this.price = price;
    }
    display() {
      return `
      <div class="card-img">
      <img src="${obj.image}" alt="${obj.name}">
      </div>
      <div class="card-body">
      <h3>${obj.name}</h3>
      <p>${obj.description}</p>
      <p><strong>$${obj.price.toFixed(2)}</strong></p>
      <input type="number" min="1" max="10" value="1">
      <button type="button" data="${obj.name}" price="${
        obj.price
      }" class="clickBtn">Add to Cart</button>
      </div>
    `;
    }
  }

  class discount extends product {
    constructor(name, description, price, image, discount) {
      super(name, description, price, image);
      this.discount = discount;
    }
    display() {
      const discountPrice = parseInt(this.price) * ((100 - this.discount) / 100);

      return `
      <div class="card-img">
      <img src="${this.image}" alt="${this.name}">
      </div>
      <div class="card-body">
      <h3>${this.name}</h3>
      <p>${this.description}</p>
      <p><strong>$${discountPrice.toFixed(2)}</strong></p>
      <span>${this.discount}% OFF</span>
      <input type="number" min="1" max="10" value="1">
      <button type="button" data="${
        this.name
      }" price="${discountPrice}" class="clickBtn">Add to Cart</button>
      </div>
    `;
    }
  }

  function addDiscountCard() {
    const newDiscountedProduct = new discount(
      "Dummy Product",
      "This is the dummy discounted product",
      200.99,
      "https://via.placeholder.com/400x300?text=Discount+Product",
      30
    );
    console.log(newDiscountedProduct.display());
    // let discountCard = document.createElement("div");
    // discountCard.setAttribute("class", "card");
    // discountCard.innerHTML = newDiscountedProduct.display();
    // productContainer.appendChild(discountCard);
    // console.log(productContainer.children);
    return newDiscountedProduct;
  }

  const productContainer = document.querySelector(".product-cards");

  async function fetchData() {
    const response = await fetch("Products.json");
    try {
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      data.push(addDiscountCard());
      window.products = data;
      console.log(products);
      displayData(data);
      // addDiscountCard();
      clickButton();
    } catch (error) {
      console.log("Error:", error);
    }
  }

  function displayData(data) {
    productContainer.innerHTML = "";
    data.forEach((obj) => {
      if (obj.name == "Dummy Product") {
         let discountCard = document.createElement("div");
        discountCard.setAttribute("class", "card");
        newDiscountedProduct = addDiscountCard();
         discountCard.innerHTML = newDiscountedProduct.display();
        productContainer.appendChild(discountCard);
        return;
      }

      let card = document.createElement("div");
      card.setAttribute("class", "card");

      card.innerHTML = `
      <div class="card-img">
      <img src="${obj.image}" alt="${obj.name}">
      </div>
      <div class="card-body">
      <h3>${obj.name}</h3>
      <p>${obj.description}</p>
      <p><strong>$${obj.price.toFixed(2)}</strong></p>
      <input type="number" min="1" max="10" value="1">
      <button type="button" data="${obj.name}" price="${
        obj.price
      }" class="clickBtn">Add to Cart</button>
      </div>
    `;
      productContainer.appendChild(card);
    });
  }
  fetchData();

  const input = document.getElementById("search");
  const dropdown = document.querySelector("#price");
  let arr;
  let filteredData;

  function handleFilter() {
    if (dropdown.value) {
      arr = dropdown.value.split("-");
      filteredData = products.filter((product) => {
        const isNameMatch = product.name
          .trim()
          .toLowerCase()
          .includes(input.value.trim().toLowerCase());
        const isDescriptionmatch = product.description
          .trim()
          .toLowerCase()
          .includes(input.value.trim().toLowerCase());
        const isPrceMatch =
          product.price > Number(arr[0]) && product.price < Number(arr[1]);

        return (isNameMatch || isDescriptionmatch) && isPrceMatch;
      });
    } else {
      filteredData = products.filter((product) => {
        return (
          product.name
            .trim()
            .toLowerCase()
            .includes(input.value.trim().toLowerCase()) ||
          product.description
            .trim()
            .toLowerCase()
            .includes(input.value.trim().toLowerCase())
        );
      });
    }
    displayData(filteredData);
  }

  function debounce(func, delay) {
    let timerId;
    return function (...args) {
      clearTimeout(timerId);
      timerId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  input.addEventListener("input", debounce(handleFilter,500));
  dropdown.addEventListener("change", handleFilter);

  function clickButton() {
    document.querySelectorAll(".clickBtn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const data = event.target.getAttribute("data");
        const price = event.target.getAttribute("price");
        const quantity = event.target.previousElementSibling.value;
        addToCart(data, price, quantity);
      });
    });
  }

  function addToCart(data, price, quantity) {
    const arrayProducts =
      JSON.parse(localStorage.getItem("cartProducts")) || [];
    const existingProduct = arrayProducts.find((item) => item.name == data);
    if (existingProduct) {
      arrayProducts.find((item) => item.name == data).quantity =
        parseInt(existingProduct.quantity) + parseInt(quantity);
    } else {
      const newProduct = {
        id: arrayProducts.length + 1,
        name: data,
        price: price,
        quantity: quantity,
        image: `https://via.placeholder.com/400x300?text=Product`,
      };
      arrayProducts.push(newProduct);
    }
    console.log(arrayProducts);
    localStorage.setItem("cartProducts", JSON.stringify(arrayProducts));
  }
});

// console.log(localStorage.getItem("cartProducts"));
