document.addEventListener("DOMContentLoaded", function () {
    // Ẩn/hiện menu danh mục
    function toggleMenu() {
        const menu = document.getElementById("menu");
        menu.classList.toggle("hidden");
    }

    // Cuộn đến danh mục được chọn
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }
    // Xử lý tìm kiếm gợi ý
    function showSuggestions() {
        const searchInput = document.getElementById("search").value.toLowerCase();
        const suggestionsBox = document.getElementById("suggestions");
        const products = document.querySelectorAll(".product");
        
        suggestionsBox.innerHTML = "";
        if (searchInput.length === 0) {
            suggestionsBox.style.display = "none";
            return;
        }

        let suggestions = [];
        products.forEach(product => {
            let name = product.getAttribute("data-name").toLowerCase();
            if (name.includes(searchInput)) {
                suggestions.push(name);
            }
        });

        if (suggestions.length > 0) {
            suggestionsBox.style.display = "block";
            suggestions.forEach(suggestion => {
                let div = document.createElement("div");
                div.textContent = suggestion;
                div.onclick = function () {
                    document.getElementById("search").value = suggestion;
                    suggestionsBox.style.display = "none";
                };
                suggestionsBox.appendChild(div);
            });
        } else {
            suggestionsBox.style.display = "none";
        }
    }

    // Xử lý giỏ hàng
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
        const cart = document.querySelector(".cart");
        cart.classList.toggle("collapsed");
    }
    
    function updateCart() {
        cartList.innerHTML = "";
        let total = 0;
        if (cart.length === 0) {
            emptyCartMsg.style.display = "block";
        } else {
            emptyCartMsg.style.display = "none";
        }

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
    // Gán các hàm vào window để gọi từ HTML
    window.toggleMenu = toggleMenu;
    window.toggleCart = toggleCart;
    window.scrollToSection = scrollToSection;
    window.showSuggestions = showSuggestions;
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.checkout = checkout;
});
