<?php
	require_once 'dbHelper.php';

	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	if (!isset($_POST['personId'])) {
        $errors['personId'] = 'Person ID is required.';
    }

	$personId 	= 	$_POST['personId'];

	$rows = $db->select("food",array('personId'=>$personId));
	
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	
	echo "$json";
?>