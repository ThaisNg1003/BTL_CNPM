let cart = [];

function toggleMenu() {
    document.getElementById("menu").classList.toggle("hidden");
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
}

const foodItems = ["Coca Cola", "Pepsi", "Pizza", "Bánh ngọt"];
function scrollToProduct(productName) {
    let products = document.querySelectorAll(".product");

    for (let product of products) {
        if (product.dataset.name.toLowerCase() === productName.toLowerCase()) {
            product.scrollIntoView({ behavior: "smooth", block: "center" });
            product.style.border = "2px solid #d32f2f"; // Tô viền để nổi bật sản phẩm
            setTimeout(() => product.style.border = "", 2000); // Xóa viền sau 2 giây
            break;
        }
    }
}

function showSuggestions() {
    let input = document.getElementById("search").value.toLowerCase();
    let suggestionsBox = document.getElementById("suggestions");

    if (input === "") {
        suggestionsBox.style.display = "none";
        return;
    }

    let suggestions = foodItems.filter(item => item.toLowerCase().includes(input));
    suggestionsBox.innerHTML = "";
    suggestionsBox.style.display = suggestions.length > 0 ? "block" : "none";

    suggestions.forEach(suggestion => {
        let div = document.createElement("div");
        div.textContent = suggestion;
        div.onclick = () => {
            document.getElementById("search").value = suggestion;
            suggestionsBox.style.display = "none";
            scrollToProduct(suggestion); // Gọi hàm cuộn đến sản phẩm
        };
        suggestionsBox.appendChild(div);
    });
}

function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - ${item.price} VND x ${item.quantity}`;
        cartItems.appendChild(li);
    });

    document.getElementById("total-price").textContent = total;
}

function checkout() {
    alert("Thanh toán thành công!");
    cart = [];
    updateCart();
}
