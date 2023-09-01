<?php 
$url = 'https://api.trusted.net/v1/conversions';
$ACTION_ID = '0fd5c3de-0648-4c48-9b2c-3ec4f385ad19';

$conversionDto = array(
  'clickId' => $_GET["tclid"] ? $_GET["tclid"] : "",
  // 'referenceId' => 'myReferenceId',
  'actionId'=> $ACTION_ID,
  'dateTime' => date('Y-m-d h:i:s'),
  'isTest' => 0,
);
$data = json_encode($conversionDto);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
if ($response === false) {
	// echo 'Error creating conversion: ' . curl_error($ch);
} else {
	// echo 'Conversion created successfully: ' . $response;
}
curl_close($ch);
?>