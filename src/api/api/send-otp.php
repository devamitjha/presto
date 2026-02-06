<?php
session_start();
header("Content-Type: application/json");

// Allow only specific origins (adjust as needed)
$allowed_origins = ['https://uat.presstoindia.com', 'https://www.presstoindia.com', 'http://localhost:3000', 'https://pressto.netlify.app/'];
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
    header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Credentials: true");
    exit(0);
}

// Decode JSON request body
$data = json_decode(file_get_contents("php://input"), true);
if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "Invalid JSON body."]);
    exit;
}

// Validate mobile number
if (!isset($data['mobile']) || empty(trim($data['mobile']))) {
    echo json_encode(["success" => false, "message" => "Mobile number is required."]);
    exit;
}

// Normalize phone number (force 91XXXXXXXXXX format)
$phone = preg_replace('/[^0-9]/', '', $data['mobile']);
if (strlen($phone) === 10) {
    $phone = '91' . $phone;
}
if (strlen($phone) !== 12 || !preg_match('/^91[0-9]{10}$/', $phone)) {
    echo json_encode(["success" => false, "message" => "Invalid mobile number."]);
    exit;
}

// Generate 6-digit OTP
$otp = rand(100000, 999999);

// Store OTP in session
$_SESSION['otp'][$phone] = [
    'code' => $otp,
    'created_at' => time()
];

// Prepare JSON payload for Karix API
$payload = [
    "ver" => "1.0",
    "key" => "aXdHDZ7N8RKtvmMdVhbbFA==",
    "encrpt" => "0",
    "messages" => [
        [
            "dest" => [$phone],
            "text" => "Use {$otp} as your OTP to register yourself with Pressto. The OTP is confidential and valid for 10 minutes. Never share your OTP with anyone unauthorized.",
            "send" => "PRESST",
            "dlt_entity_id" => "1001642900000018746",
            "dlt_template_id" => "1007748113908347645",
            "cust_ref" => "otp_" . uniqid(),
            "tag" => "pressto",
            "tag1" => "otp",
        ]
    ]
];

// Send OTP via Karix API using cURL
$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://japi.instaalerts.zone/httpapi/JsonReceiver',
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ],
]);

$response = curl_exec($curl);
$curl_error = curl_error($curl);
curl_close($curl);

// Optional debug logs (only for development)
file_put_contents("karix_payload.txt", $rawData);
file_put_contents("karix_log.txt", $response);

// Handle error
if ($curl_error || !$response) {
    error_log("SMS failed: " . $curl_error ?: 'No response');
    echo json_encode(["success" => false, "message" => "Failed to send OTP. Please try again."]);
    exit;
}

// Log (development only - remove or disable in production)
file_put_contents("logs/karix_log.txt", $response);

echo json_encode([
    "success" => true,
    "message" => "OTP sent successfully.",
    "otp" => $otp, // ⚠️ Remove this line in production
    "karix_response" => json_decode($response, true)
]);
