<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Token");

// Get parameters
$contact = isset($_GET['Contact']) ? $_GET['Contact'] : '';
$fromDate = isset($_GET['FromDate']) ? $_GET['FromDate'] : '';
$toDate = isset($_GET['ToDate']) ? $_GET['ToDate'] : '';

if (empty($contact) || empty($fromDate) || empty($toDate)) {
    echo json_encode(["message" => "Missing parameters", "data" => []]);
    exit;
}

// API URL
$url = "https://itpvuatcapi.press2india.com/api/iTPVCentralAPI/GetWalletTransactionByDate?Contact=" . urlencode($contact) . "&FromDate=" . urlencode($fromDate) . "&ToDate=" . urlencode($toDate);

// Token
$token = "pTT2G/tcwHvBGCLMgiBw5Cp+yFeUTt8aL8aQ2plyOPsEWklWxFannkpPLWE4bb4E ";

// Initialize cURL
$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    CURLOPT_HTTPHEADER => array(
        "Token: " . $token,
        "cache-control: no-cache"
    ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo json_encode(["message" => "cURL Error #:" . $err, "data" => []]);
} else {
    echo $response;
}
?>
