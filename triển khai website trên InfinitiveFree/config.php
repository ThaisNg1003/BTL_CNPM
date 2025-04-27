<?php
$servername = "sqlXXX.n12res.com"; // Thay bằng host của bạn
$username = "N12"; // Thay bằng username của bạn
$password = "Thai1003"; // Thay bằng password của bạn
$dbname = "N12"; // Thay bằng tên database

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}
?>
