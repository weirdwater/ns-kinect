<?php
session_start();

require "config.php";

if (!isset($_SESSION['photo_session_id'])) {
		$_SESSION["photo_session_id"] = rand();
}

$session_id = $_SESSION["photo_session_id"]; // User session id

// make dir if it doenst exist
$path = "../canvas_uploads/";
$url_path = $path;
if (!file_exists($path)) {
	mkdir($path, 0755, true);
}

$result = [
	"error" => false,
	"error_description" => null,
	"file_location" => null,
	"email" => null
];

$actual_image_name = $session_id."nr".time().".png";

$finalFileLocation = null;
$email = null;

// save image
if(isset($_POST['imgBase64']) && isset($_POST['email'])) {
	$result["email"] = $_POST['email'];
	$img = $_POST['imgBase64'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$fileData = base64_decode($img);
	file_put_contents( $path . $actual_image_name, $fileData);

	// generate and echo json image location
	$finalFileLocation = $url_path . $actual_image_name;
	$email = $result["email"];
	$result["file_location"] = $finalFileLocation;
} else {
	$result["error"] = true;
	$result["error_description"] = "Not all required POST parameters are set.";
}

$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if ($conn->connect_error) {
    $result["error"] = true;
	$result["error_description"] = "Connection to database failed: " . $conn->connect_error;
} 

$sql = "INSERT INTO `dap_subscriptions` (`id`, `email`, `skeletonImage`, `city`, `workshopId`, `complete`, `chosen`) VALUES (NULL, '$email', '$finalFileLocation', 'Utrecht', '1', '1', '0');";
if ($conn->query($sql) !== TRUE) {
    $result["error"] = true;
	$result["error_description"] = "Insert in database failed";
}

echo json_encode($result);
?>