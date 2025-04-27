document.addEventListener("DOMContentLoaded", function () {
    function toggleMenu() {
        document.getElementById("menu").classList.toggle("hidden");
    }

    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    document.getElementById("search").addEventListener("input", showSuggestions);
    document.getElementById("search").addEventListener("keydown", navigateSuggestions);

    let selectedIndex = -1;

    function showSuggestions() {
        const searchInput = document.getElementById("search").value.toLowerCase();
        const suggestionsBox = document.getElementById("suggestions");
        const products = document.querySelectorAll(".product");
        
        suggestionsBox.innerHTML = "";
        selectedIndex = -1;

        if (searchInput.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        let suggestions = [];
        products.forEach(product => {
            let name = product.getAttribute("data-name").toLowerCase();
            if (name.includes(searchInput)) {
                suggestions.push({ name: product.getAttribute("data-name"), element: product });
            }
        });

        if (suggestions.length > 0) {
            suggestionsBox.style.display = "block";
            suggestions.forEach((suggestion, index) => {
                let div = document.createElement("div");
                div.textContent = suggestion.name;
                div.classList.add("suggestion-item");
                div.setAttribute("data-index", index);
                div.onclick = function () {
                    document.getElementById("search").value = suggestion.name;
                    suggestionsBox.style.display = "none";
                    suggestion.element.scrollIntoView({ behavior: "smooth", block: "center" });
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            let noResult = document.createElement("div");
            noResult.textContent = "Không tìm thấy kết quả";
            noResult.classList.add("no-result");
            suggestionsBox.appendChild(noResult);
            suggestionsBox.style.display = "block";
        }
    }

    function navigateSuggestions(event) {
        const suggestions = document.querySelectorAll(".suggestion-item");
        if (suggestions.length === 0) return;

        if (event.key === "ArrowDown") {
            selectedIndex = (selectedIndex + 1) % suggestions.length;
        } else if (event.key === "ArrowUp") {
            selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
        } else if (event.key === "Enter") {
            event.preventDefault();
            let searchValue = document.getElementById("search").value;
            if (selectedIndex >= 0) {
                searchValue = suggestions[selectedIndex].textContent;
            }
            document.getElementById("search").value = searchValue;
            document.getElementById("suggestions").style.display = "none";
            
            const matchingProduct = Array.from(document.querySelectorAll(".product"))
                .find(p => p.getAttribute("data-name").toLowerCase() === searchValue.toLowerCase());

            if (matchingProduct) {
                matchingProduct.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }

        suggestions.forEach(item => item.classList.remove("active"));
        if (selectedIndex >= 0) {
            suggestions[selectedIndex].classList.add("active");
        }
    }

    let cart = [];
    const cartList = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const emptyCartMsg = document.getElementById("empty-cart-msg");

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function toggleCart() {
        document.querySelector(".cart").classList.toggle("collapsed");
    }
    
    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        emptyCartMsg.style.display = cart.length === 0 ? "block" : "none";

        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            let li = document.createElement("li");
            li.innerHTML = `${item.name} x${item.quantity} - ${item.price * item.quantity} VND 
                <button onclick="removeFromCart(${index})">Xóa</button>`;
            cartList.appendChild(li);
        });
        totalPriceEl.textContent = total.toLocaleString();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function checkout() {
        if (cart.length === 0) {
            alert("Giỏ hàng đang trống!");
            return;
        }
        alert("Thanh toán thành công!");
        cart = [];
        updateCart();
    }

    fetch("images.json")
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll(".product").forEach(product => {
                let productName = product.getAttribute("data-name").trim();
                let imgElement = product.querySelector("img"); 

                imgElement.src = data.images[productName] || "images/default.jpg";
            });
        })
        .catch(error => console.error("Lỗi tải ảnh:", error));
        
        function addProduct() {
    let formData = new FormData();
    formData.append("name", "Món ăn mới");
    formData.append("price", 50000);
    formData.append("description", "Món ăn đặc biệt");
    formData.append("image", document.getElementById("file").files[0]);

    fetch("backend/api/products.php", {
        method: "POST",
        body: formData
    }).then(response => response.json())
      .then(data => alert(data.message));
}

function checkout() {
    fetch("backend/api/notifications.php", {
        method: "POST"
    }).then(response => response.json())
      .then(data => alert(data.notification));

    alert("Thanh toán thành công!");
}

document.addEventListener("DOMContentLoaded", function () {
    function fetchProducts() {
        fetch("products.php")
            .then(response => response.json())
            .then(data => {
                console.log("Sản phẩm:", data);
                const productList = document.querySelector(".product-list");
                productList.innerHTML = "";
                data.forEach(product => {
                    let productHTML = `
                        <div class="product" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                            <img src="${product.image}" alt="${product.name}">
                            <p>${product.name}</p>
                            <p>${product.price} VND</p>
                            <button onclick="addToCart('${product.name}', ${product.price})">Thêm vào giỏ</button>
                        </div>`;
                    productList.innerHTML += productHTML;
                });
            })
            .catch(error => console.error("Lỗi tải sản phẩm:", error));
    }

    function addProduct(name, price, description, image) {
        fetch("products.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, price, description, image })
        }).then(fetchProducts);
    }

    function updateProduct(id, name, price, description, image) {
        fetch("products.php", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, name, price, description, image })
        }).then(fetchProducts);
    }

    function deleteProduct(id) {
        fetch("products.php", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        }).then(fetchProducts);
    }

    function placeOrder(cartItems, totalPrice) {
        fetch("orders.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cartItems, total_price: totalPrice })
        }).then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert("Đặt hàng thành công!");
                  cart = [];
                  updateCart();
              }
          });
    }

    fetchProducts();
    window.addProduct = addProduct;
    window.updateProduct = updateProduct;
    window.deleteProduct = deleteProduct;
    window.placeOrder = placeOrder;
});



    window.toggleMenu = toggleMenu;
    window.toggleCart = toggleCart;
    window.scrollToSection = scrollToSection;
    window.showSuggestions = showSuggestions;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.checkout = checkout;
});