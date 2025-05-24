<?php
header('Content-Type: application/json');
require_once '../config/database.php';

// Handle CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Get all wishes
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT * FROM wishes ORDER BY created_at DESC");
        $wishes = $stmt->fetchAll();
        echo json_encode(['status' => 'success', 'data' => $wishes]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to fetch wishes']);
    }
}

// Add new wish
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['name']) || !isset($data['attendance']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
        exit;
    }

    try {
        $stmt = $pdo->prepare("INSERT INTO wishes (name, attendance, guests, message) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $data['name'],
            $data['attendance'],
            $data['guests'] ?? null,
            $data['message']
        ]);
        
        echo json_encode([
            'status' => 'success',
            'message' => 'Wish added successfully',
            'id' => $pdo->lastInsertId()
        ]);
    } catch(PDOException $e) {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Failed to add wish']);
    }
}
?> 