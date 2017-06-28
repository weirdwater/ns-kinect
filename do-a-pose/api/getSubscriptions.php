<?php
	require "config.php";

	$result = [
		"error" => false,
		"error_description" => null,
		"subscriptions" => []
	];

	$conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
	if ($conn->connect_error) {
		$result["error"] = true;
		$result["error_description"] = "Connection to database failed: " . $conn->connect_error;
	} 

	if(isset($_GET["workshopId"])) {
		$workshopId = $_GET["workshopId"];
		$sql = "SELECT * FROM `dap_subscriptions` WHERE `workshopId` = 1 ORDER BY `id` DESC;";
		$sqlresult = $conn->query($sql);
		if ($sqlresult->num_rows > 0) {
			// output data of each row
			while($row = $sqlresult->fetch_assoc()) {
				$subscription = [
					"id" => $row["id"],
					"email" => $row["email"],
					"skeletonImage" => $row["skeletonImage"],
					"city" => $row["city"],
					"workshopId" => $row["workshopId"],
					"complete" => $row["complete"],
					"chosen" => $row["chosen"]
				];
				array_push($result["subscriptions"], $subscription);
			}
		} else {
			$result["error"] = true;
			$result["error_description"] = "No results found";
		}
	} else {
		$result["error"] = true;
		$result["error_description"] = "Not all required parameters set";
	}

	echo json_encode($result);
?>