<?php
	require_once 'dbHelper.php';

	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	if (empty($_POST['email'])) { $errors['email'] = 'Email address is required.'; }
	if (empty($_POST['password'])) { $errors['password'] = 'Password is required.'; }

	$email 	= 	$_POST['email'];
	$password 	= 	$_POST['password'];

	$rows = $db->select("person",array('emailaddress'=>$email, 'password'=>$password));
	
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	
	echo "$json";

?>