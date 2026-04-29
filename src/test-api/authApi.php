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

// Always set headers
setCorsHeaders($allowed_origins);
header("Content-Type: application/json");

// ---- INSTANT RESPONSE FOR OPTIONS ----
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---- BASE URL & TOKEN ----
$baseUrl = "https://iTPVcapi.press2india.com/api/iTPVCentralAPI";
$token = "fh2elSTx97dxFMYNXhOVCAn7HK+n2sdamLRh13ZTnvE=";

// ---- API CALL FUNCTION ----
function callApi($url, $method = 'GET', $data = null, $token) {
    $ch = curl_init();
    $headers = [
        "Token: $token",
        "Content-Type: application/json"
    ];

    if ($method === 'GET' && !empty($data)) {
        $url .= '?' . http_build_query($data);
    }

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        $errorMsg = curl_error($ch);
        curl_close($ch);
        return json_encode(["error" => $errorMsg]);
    }

    curl_close($ch);

    // ---- Handle plain text or JSON response ----
    $trimmed = trim($response);
    $decoded = json_decode($trimmed, true);

    // If response isn't valid JSON, wrap it in a JSON structure
    if ($decoded === null && json_last_error() !== JSON_ERROR_NONE) {
        return json_encode([
            "statusCode" => $httpCode,
            "raw" => $trimmed
        ]);
    }

    return json_encode($decoded);
}

// ---- ROUTER ----
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'login':
        $mobile = $_GET['mobile'] ?? '';
        $result = callApi("$baseUrl/GetLoginInfoByMobile", 'GET', ["mobile" => $mobile], $token);
        echo $result;
        break;

    case 'register':
        $inputData = json_decode(file_get_contents("php://input"), true);
        $result = callApi("$baseUrl/RegisterUser", 'POST', $inputData, $token);
        echo $result;
        break;

    case 'customerDetails':
        $CustomerUniqueId = $_GET['CustomerUniqueId'] ?? '';
        $result = callApi("$baseUrl/GetCustomerDetailsById", 'GET', ["CustomerUniqueId" => $CustomerUniqueId], $token);
        echo $result;
        break;

    default:
        echo json_encode(["error" => "Invalid action"]);
}

exit();
