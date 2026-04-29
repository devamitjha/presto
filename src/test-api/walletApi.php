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
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Token");
}

setCorsHeaders($allowed_origins);
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---- BASE URL & TOKENS ----
$baseUrl = "https://itpvuatcapi.press2india.com/api/iTPVCentralAPI";
// Using the single valid token for both actions (preserving potential trailing space)
$validToken = "pTT2G/tcwHvBGCLMgiBw5Cp+yFeUTt8aL8aQ2plyOPsEWklWxFannkpPLWE4bb4E ";

$tokenTransactions = $validToken;
$tokenWallet = $validToken;

// ---- API CALL FUNCTION ----
function callApi($url, $method = 'GET', $data = null, $token) {
    $ch = curl_init();
    
    if ($method === 'GET' && !empty($data)) {
        $url .= (strpos($url, '?') !== false ? '&' : '?') . http_build_query($data);
    }

    $headers = [
        "Token: $token",
        "Content-Type: application/json"
    ];

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    if ($method === 'POST') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // DEBUG LOGGING
    $logData = "Time: " . date('Y-m-d H:i:s') . "\n";
    $logData .= "URL: $url\n";
    $logData .= "Method: $method\n";
    $logData .= "Token: $token\n";
    $logData .= "HTTP Code: $httpCode\n";
    $logData .= "Response: $response\n\n";
    file_put_contents("wallet_api_debug.log", $logData, FILE_APPEND);

    if (curl_errno($ch)) {
        $errorMsg = curl_error($ch);
        curl_close($ch);
        return json_encode(["error" => $errorMsg]);
    }

    curl_close($ch);
    return $response;
}

// ---- ROUTER ----
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'getTransactions':
        $contact = $_GET['Contact'] ?? '';
        $fromDate = $_GET['FromDate'] ?? '';
        $toDate = $_GET['ToDate'] ?? '';
        $result = callApi("$baseUrl/GetWalletTransactionByDate", 'GET', [
            "Contact" => $contact,
            "FromDate" => $fromDate,
            "ToDate" => $toDate
        ], $tokenTransactions);
        echo $result;
        break;

    case 'getWalletDetails':
        $contact = $_GET['Contact'] ?? '';
        $result = callApi("$baseUrl/GetWalletDetailsByContact", 'GET', ["Contact" => $contact], $tokenWallet);
        echo $result;
        break;

    case 'rechargeWallet':
        $inputData = json_decode(file_get_contents("php://input"), true);
        $result = callApi("$baseUrl/CustomerWalletCreateUpdate", 'POST', $inputData, $tokenWallet);
        echo $result;
        break;

    default:
        // Default behavior for backward compatibility
        $contact = $_GET['Contact'] ?? '';
        $fromDate = $_GET['FromDate'] ?? '';
        $toDate = $_GET['ToDate'] ?? '';
        if (!empty($contact) && !empty($fromDate) && !empty($toDate)) {
            $result = callApi("$baseUrl/GetWalletTransactionByDate", 'GET', [
                "Contact" => $contact,
                "FromDate" => $fromDate,
                "ToDate" => $toDate
            ], $tokenTransactions);
            echo $result;
        } else {
            echo json_encode(["error" => "Invalid action or missing parameters"]);
        }
}

exit();
