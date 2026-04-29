<?php
// ---- CORS SETTINGS ----
$allowed_origins = [
    'https://uat.presstoindia.com',
    'https://www.presstoindia.com',
    'http://localhost:3000',
    'https://pressto.netlify.app'
];

function setCorsHeaders($allowed_origins) {
    if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    } else {
        header("Access-Control-Allow-Origin: https://www.presstoindia.com"); // fallback
    }

    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

setCorsHeaders($allowed_origins);
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$keyId = "rzp_test_cPCzfkyyITyRB3";
$keySecret = "bB0N927IjcYzRZRGiwWA0M4m";

$inputData = json_decode(file_get_contents("php://input"), true);
$action = $_GET['action'] ?? '';

if ($action === 'createPaymentLink') {
    $amount = $inputData['amount'] ?? 0;
    $contact = $inputData['contact'] ?? '';
    $email = $inputData['email'] ?? '';
    $name = $inputData['name'] ?? '';

    if ($amount <= 0) {
        echo json_encode(["error" => "Invalid amount"]);
        exit;
    }

    $url = "https://api.razorpay.com/v1/payment_links/";
    
    $payload = [
        "amount" => $amount * 100, // in paise
        "currency" => "INR",
        "accept_partial" => false,
        "description" => "Wallet Recharge for $name",
        "customer" => [
            "name" => $name,
            "contact" => $contact,
            "email" => $email
        ],
        "notify" => [
            "sms" => true,
            "email" => true
        ],
        "reminder_enable" => true,
        "callback_url" => "http://localhost:3000/profile?tab=wallet&payment=success",
        "callback_method" => "get"
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_USERPWD, "$keyId:$keySecret");
    curl_setopt($ch, CURLOPT_HTTPHEADER, ["Content-Type: application/json"]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        echo json_encode(["error" => curl_error($ch)]);
    } else {
        echo $response;
    }
    curl_close($ch);
} else {
    echo json_encode(["error" => "Invalid action"]);
}
exit();
