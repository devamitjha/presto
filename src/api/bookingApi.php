<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$action = isset($_GET['action']) ? $_GET['action'] : '';
$data = json_decode(file_get_contents("php://input"), true);

// Fabklean Credentials
$fabkleanToken = "ApiToken YTZkOWZjOTA3NzNmNTZkNTU2NDRlOTY0OGE2MGQ2YzFkZjkxZGI5YToxMTEyMToxNDY3NDEy";
$contextId = "11121";

if ($action == 'createUser') {
    $url = "https://support.fabklean.com/api/userInfos.json?contextId=" . $contextId;
    
    $payload = [
        "firstName" => $data['firstName'] . ' ' . ($data['lastName'] ?? ''),
        "countryCode" => "+91",
        "email" => $data['email'] ?? '',
        "phoneNumber" => $data['contact'],
        "source" => "WEBSITE",
        "address1" => [
            "addressLine" => $data['address'] ?? '',
            "addressLine2" => ""
        ],
        "externalKey" => $data['customerId'] ?? "",
        "uniqueCode" => $data['customerUniqueId'] ?? ""
    ];

    $response = postRequest($url, $payload, $fabkleanToken);
    echo $response;

} elseif ($action == 'schedulePickup') {
    $url = "https://support.fabklean.com/api/salesOrders/schedulePickup.json?contextId=" . $contextId;
    
    // Format shipping address
    $shippingAddress = ($data['address'] ?? '') . "\n" . ($data['city'] ?? '') . "\nIndia\nPin Code : " . ($data['pincode'] ?? '');

    $payload = [
        "routeCode" => "APT",
        "consumerPhoneNumber" => $data['contact'],
        "customerType" => "user",
        "invoiceStatus" => "DRAFT",
        "workflowStatus" => "PENDING",
        "partnerOrganizationId" => $contextId,
        "supplyPlace" => "PD",
        "value10" => "WEBSITE",
        "customerNotes" => $data['instructions'] ?? "",
        "shippingAddress" => $shippingAddress,
        "value6" => $data['pickupTime'] ?? "11:00 AM - 09:00 PM",
        "value7" => $data['pickupTime'] ?? "11:00 AM - 09:00 PM",
        "value8" => "Laundry Catalog",
        "promoCode" => "",
        "orderDate" => $data['pickupDate'] ?? date('Y-m-d'),
        "tags" => "fabklean",
        "expectedDate" => date('d/m/Y 00:00', strtotime($data['pickupDate'] ?? 'now')),
        "supplyDate" => strtotime($data['pickupDate'] ?? 'now') * 1000,
        "shippingLatitude" => 0,
        "shippingLongitude" => 0
    ];

    $response = postRequest($url, $payload, $fabkleanToken);
    echo $response;

} else {
    echo json_encode(["error" => "Invalid action"]);
}

function postRequest($url, $payload, $token) {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_HTTPHEADER => array(
            "Accept: application/json",
            "Authorization: " . $token,
            "Content-Type: application/json",
            "cache-control: no-cache"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    if ($err) {
        return json_encode(["error" => "cURL Error #:" . $err]);
    } else {
        return $response;
    }
}
?>
