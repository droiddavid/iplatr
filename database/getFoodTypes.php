<?php
	require_once 'dbHelper.php';

	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	$rows = $db->select("foodtypes",array());
	
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	
	echo "$json";
?>