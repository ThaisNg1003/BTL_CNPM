// API thanh toán
app.post("/api/checkout", (req, res) => {
    if (cart.length === 0) {
      return res.status(400).send("Giỏ hàng trống");
    }
  
    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.productId);
      return sum + product.price * item.quantity;
    }, 0);
  
    const { paymentMethod } = req.body;
  
    // Giả sử thanh toán thành công
    const paymentStatus = paymentMethod === "cash" ? "Thanh toán tiền mặt thành công" : "Thanh toán qua QR thành công";
  
    // Xóa giỏ hàng sau khi thanh toán
    cart = [];
  
    res.json({
      message: paymentStatus,
      totalAmount: total,
      cart: []
    });
  });
  