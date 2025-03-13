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
    // Xử lý tìm kiếm gợi ý
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
            suggestions.push({ 
                name: product.getAttribute("data-name"), 
                element: product  // Lưu lại phần tử HTML của sản phẩm
            });
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
                
                // Cuộn đến sản phẩm tương ứng
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

// Xử lý điều hướng bàn phím (giữ nguyên như cũ)
function navigateSuggestions(event) {
    const suggestions = document.querySelectorAll(".suggestion-item");
    if (suggestions.length === 0) return;

    if (event.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % suggestions.length;
    } else if (event.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + suggestions.length) % suggestions.length;
    } else if (event.key === "Enter") {
        if (selectedIndex >= 0) {
            let selectedSuggestion = suggestions[selectedIndex].textContent;
            document.getElementById("search").value = selectedSuggestion;
            document.getElementById("suggestions").style.display = "none";

            // Tìm phần tử sản phẩm tương ứng và cuộn đến nó
            const matchingProduct = Array.from(document.querySelectorAll(".product"))
                .find(p => p.getAttribute("data-name") === selectedSuggestion);

            if (matchingProduct) {
                matchingProduct.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }

    suggestions.forEach(item => item.classList.remove("active"));
    if (selectedIndex >= 0) {
        suggestions[selectedIndex].classList.add("active");
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
////


