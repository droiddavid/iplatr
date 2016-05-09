<?php
	require_once 'dbHelper.php';
	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	// checking for blank values.
	if (empty($_POST['firstName'])) $errors['firstName'] = 'First name is required.';
	if (empty($_POST['lastName'])) $errors['lastName'] = 'Last name is required.';
	if (empty($_POST['email'])) $errors['email'] = 'Email is required.';
	if (empty($_POST['password'])) $errors['password'] = 'Password is required.';
	if (empty($_POST['accountType'])) $errors['accountType'] = 'AccountType is required.';

	$firstName     =	$_POST['firstName'];
	$lastName      =	$_POST['lastName'];
	$email         =	$_POST['email'];
	$password      =	$_POST['password'];
	$accountType   =	$_POST['accountType'];

	$rows = $db->insert("person", array('firstname' => $firstName, 'lastname' => $lastName, 'emailaddress' => $email, 'password' => $password, 'accountType' => $accountType), array('firstname', 'lastname', 'emailaddress', 'password', 'accountType'));

    print_r(json_encode($rows,JSON_NUMERIC_CHECK));
?>



















