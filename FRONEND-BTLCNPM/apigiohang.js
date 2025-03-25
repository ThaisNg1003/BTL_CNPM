const express = require("express");
const app = express();
const port = 5000;

// Middleware để parse dữ liệu JSON
app.use(express.json());

// Dữ liệu sản phẩm mẫu
let products = [
  { id: 1, name: "Coca Cola", price: 15000, image: "image-url" },
  { id: 2, name: "Trà Chanh", price: 10000, image: "image-url" },
  { id: 3, name: "Pizza", price: 100000, image: "image-url" },
  // Thêm các sản phẩm khác vào đây
];

// API lấy danh sách sản phẩm
app.get("/api/products", (req, res) => {
  res.json(products);
});

// API thêm sản phẩm mới
app.post("/api/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// API cập nhật sản phẩm
app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const updatedProduct = req.body;
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex === -1) {
    return res.status(404).send("Sản phẩm không tìm thấy");
  }
  products[productIndex] = updatedProduct;
  res.json(updatedProduct);
});

// API xóa sản phẩm
app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  products = products.filter(p => p.id !== productId);
  res.status(204).send();
});

// Khởi động server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
