<?php
	require_once 'dbHelper.php';
	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	// checking for blank values.
	if (empty($_POST['menuTitle'])) $errors['menuTitle'] = 'Menu Title is required.';
	if (empty($_POST['dateCreated'])) $errors['dateCreated'] = 'DateCreated is required.';
	if (empty($_POST['status'])) $errors['status'] = 'Status is required.';

	$personId		=	$_POST['personId'];
	$menuTitle 		= 	$_POST['menuTitle'];
	$dateCreated 	= 	$_POST['dateCreated'];
	$status 		= 	$_POST['status'];

	$rows = $db->insert("menus", array('personId' => $personId, 'title' => $menuTitle, 'created' => $dateCreated, 'status' => $status ), array('personId','title','created','status'));

	//$rows = $db->select("person",array('emailAddress'=>$email, 'password'=>$password));


	// convert to json
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	//The echoed value will appear as part of the response.
	echo "$json";

	// echo the json string
	//return $json;

?>

