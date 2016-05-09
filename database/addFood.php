<?php
	require_once 'dbHelper.php';
	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	// checking for blank values.
	if (empty($_POST['personId'])) $errors['personId'] = 'Person Id is required.';
	if (empty($_POST['foodType'])) $errors['foodType'] = 'Food type is required.';
	if (empty($_POST['foodName'])) $errors['foodName'] = 'Food name is required.';
	if (empty($_POST['description'])) $errors['description'] = 'Description is required.';

	$personId 		= 	$_POST['personId'];
	$foodType		=	$_POST['foodType'];
	$foodName 		= 	$_POST['foodName'];
	$description 	= 	$_POST['description'];

	$rows = $db->insert("food", array('personId' => $personId, 'foodType' => $foodType, 'foodName' => $foodName, 'description' => $description ), array('personId', 'foodType', 'foodName', 'description'));

	// convert to json
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	//The echoed value will appear as part of the response.
	echo "$json";

	// echo the json string
	//return $json;

?>