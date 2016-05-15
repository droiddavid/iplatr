<?php
	require_once 'dbHelper.php';

	$db = new dbHelper();

	$_POST = json_decode(file_get_contents('php://input'), true);

	if (!isset($_POST['menuId'])) { $errors['menuId'] = 'menuId is required.'; }
	if (!isset($_POST['personId'])) { $errors['personId'] = 'personId is required.'; }

	$menuId = $_POST['menuId'];
	$personId = $_POST['personId'];

	$rows = $db->select("platters",array('menuId'=>$menuId, 'userId'=>$personId));
	
	$json = json_encode( $rows,JSON_NUMERIC_CHECK );
	
	echo "$json";
?>