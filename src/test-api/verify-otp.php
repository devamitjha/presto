<?php
session_start();
header("Content-Type: application/json");

// Allow only specific origins
$allowed_origins = ['https://uat.presstoindia.com', 'https://www.presstoindia.com', 'http://localhost:3000'];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

// Function to normalize mobile number into 91XXXXXXXXXX format
function normalizePhone($mobile) {
    $phone = preg_replace('/[^0-9]/', '', $mobile);
    if (strlen($phone) === 10) $phone = '91' . $phone;
    return $phone;
}

// Decode request
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['mobile']) || !isset($data['otp'])) {
    echo json_encode(["success" => false, "message" => "Mobile and OTP are required."]);
    exit;
}

$phone = normalizePhone($data['mobile']);
$enteredOtp = trim($data['otp']);

// Check if OTP exists for this number
if (!isset($_SESSION['otp'][$phone])) {
    echo json_encode(["success" => false, "message" => "No OTP found for this number."]);
    exit;
}

$otpData = $_SESSION['otp'][$phone];
$otpAge = time() - $otpData['created_at'];

// OTP expiry check (10 minutes)
if ($otpAge > 600) {
    unset($_SESSION['otp'][$phone]);
    echo json_encode(["success" => false, "message" => "OTP expired. Please request a new one."]);
    exit;
}

// OTP match check
if ($enteredOtp == $otpData['code']) {
    unset($_SESSION['otp'][$phone]);
    echo json_encode(["success" => true, "message" => "OTP verified successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid OTP."]);
}
