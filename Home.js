const featuredProducts = document.querySelector(".featured-products");
const products = featuredProducts.querySelector(".grid");

fetchData("https://fakestoreapi.com/products")
    .then(data => {
        products.innerHTML = ""
        if (data.length > 0) {
            data.splice(0, 15).forEach(item => {
                products.innerHTML += `<div class="product">
                        <img src="${item.image}" alt="${item.title}">
                        <h3>${item.title}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>`;
            });

            tableBody(data)
        } else {
            products.innerHTML += "<h4>Products Unavailable</h4>";
        }
    })
    .catch(error => {
        console.log("error");
})



function fetchData(url) {
    return new Promise((resolve, reject) => {
        request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = () => {
            if (request.status >= 200 && request.status <= 300) {
                resolve(JSON.parse(request.responseText));
            } else {
                reject(request.statusText);
            };
        };

        request.onerror = () => {
            reject(request.statusText);
        }
    })
}

function tableBody(data) {
  const body = document.querySelector("#body");
  console.log(body);
  body.innerHTML = "";
  data.slice(0, 5).forEach((details) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${details.title}</td>
                    <td>$${details.price.toFixed(2)}</td>
                    <td>${details.description}</td>
                    <td>${details.size || "N/A"}</td>
                    <td>${details.weight || "N/A"}</td>
                `;
    body.appendChild(row);
  });
}

function binding(url) {
    fetchData.call(this, url)
        .then((data) => {
            tableBody.call(this,data);
        })
        .catch(err => {
            console.log("error");
        });
};

// binding("https://fakestoreapi.com/products");