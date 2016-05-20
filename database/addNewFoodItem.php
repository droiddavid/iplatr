<?php
	require_once 'dbHelper.php';
	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	// checking for blank values.
	if (empty($_POST['personId'])) $errors['personId'] = 'Person Id is required.';
	if (empty($_POST['name'])) $errors['foodName'] = 'Food name is required.';
	if (empty($_POST['type'])) $errors['foodType'] = 'Food type is required.';
	if (empty($_POST['description'])) $errors['description'] = 'Description is required.';

	$personId 		= 	$_POST['personId'];
	$name 			= 	$_POST['name'];
	$type			=	$_POST['type'];
	$description 	= 	$_POST['description'];

	$rows = $db->insert("food", array('personId' => $personId, 'name' => $name, 'type' => $type, 'description' => $description ), array('personId', 'name', 'type', 'description'));

	// convert to json
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	//The echoed value will appear as part of the response.
	echo "$json";

	// echo the json string
	//return $json;

?>