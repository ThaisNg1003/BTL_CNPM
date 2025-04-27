<?php
include 'config.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Lấy danh sách đơn hàng
    $sql = "SELECT * FROM orders";
    $result = $conn->query($sql);
    $orders = [];
    while ($row = $result->fetch_assoc()) {
        $orders[] = $row;
    }
    echo json_encode($orders);
} elseif ($method === 'POST') {
    // Tạo đơn hàng mới
    $data = json_decode(file_get_contents('php://input'), true);
    $items = json_encode($data['items']); // Danh sách món ăn
    $total_price = $data['total_price'];
    $status = "Đang xử lý";
    $sql = "INSERT INTO orders (items, total_price, status) VALUES ('$items', '$total_price', '$status')";
    echo json_encode(["success" => $conn->query($sql)]);
} elseif ($method === 'PUT') {
    // Cập nhật trạng thái đơn hàng
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $status = $data['status'];
    $sql = "UPDATE orders SET status='$status' WHERE id=$id";
    echo json_encode(["success" => $conn->query($sql)]);
} elseif ($method === 'DELETE') {
    // Xóa đơn hàng
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $sql = "DELETE FROM orders WHERE id=$id";
    echo json_encode(["success" => $conn->query($sql)]);
}

$conn->close();
?>