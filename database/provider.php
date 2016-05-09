<?php
	require_once 'dbHelper.php';
	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	// checking for blank values.
	if (empty($_POST['emailAddress'])) {
		$errors['emailAddress'] = 'emailAddress is required.';
		
		//The echoed value will appear as part of the response.
		//echo 'EmailAddress is required.';
	}

	if (empty($_POST['password'])) {
		$errors['password'] = 'password is required.';	
		//The echoed value will appear as part of the response.
		//echo 'Password is required.';
	}

	$email 	= 	$_POST['emailAddress'];
	$password = $_POST['password'];


	$rows = $db->select("person",array('emailAddress'=>$email, 'password'=>$password));
	// convert to json
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	//The echoed value will appear as part of the response.
	echo "$json";

	// echo the json string
	//return $json;

?>