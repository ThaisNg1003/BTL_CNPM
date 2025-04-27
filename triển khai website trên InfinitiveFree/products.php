<?php
include 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Lấy danh sách sản phẩm
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);
    $products = [];
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
    echo json_encode($products);
} elseif ($method === 'POST') {
    // Thêm sản phẩm
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $price = $data['price'];
    $description = $data['description'];
    $image = $data['image'];
    $sql = "INSERT INTO products (name, price, description, image) VALUES ('$name', '$price', '$description', '$image')";
    echo json_encode(["success" => $conn->query($sql)]);
} elseif ($method === 'PUT') {
    // Cập nhật sản phẩm
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $name = $data['name'];
    $price = $data['price'];
    $description = $data['description'];
    $image = $data['image'];
    $sql = "UPDATE products SET name='$name', price='$price', description='$description', image='$image' WHERE id=$id";
    echo json_encode(["success" => $conn->query($sql)]);
} elseif ($method === 'DELETE') {
    // Xóa sản phẩm
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $sql = "DELETE FROM products WHERE id=$id";
    echo json_encode(["success" => $conn->query($sql)]);
}

$conn->close();
?>