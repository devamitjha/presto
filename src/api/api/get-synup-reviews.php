<?php
// Allowed origins — add your mobile IP if needed
$allowedOrigins = [
    'https://uat.presstoindia.com',
    'http://uat.presstoindia.com',
    'https://www.presstoindia.com',
    'http://localhost:3000',
    'https://pressto.netlify.app',
    'http://192.168.1.100:3000' // Replace with your computer's IP if accessing from mobile
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// API endpoint — fetching Synup reviews without location ID
$endpoint = "https://api.synup.com/api/v4/rollup_interactions?tag=all&first=20&ratingFilters=%5B%5D&categories=%5B%5D&responseStatus=%5B%5D&siteUrls=%5B%5D&sortOrder=NEWEST_FIRST&searchString=";

// Your API key
$apiKey = 'fvwnn-2AgvJuIdQco8dGkBQ3raI';

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => $endpoint,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => [
        "Authorization: API $apiKey",
        "Content-Type: application/json"
    ],
]);

$response = curl_exec($curl);
$error = curl_error($curl);
curl_close($curl);

if ($error) {
    echo json_encode(["success" => false, "message" => $error]);
} else {
    echo $response;
}
