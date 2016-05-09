<?php

// set up the connection variables
$db_name  = 'iforkandspoon';
$hostname = 'localhost';
$username = 'root';
$password = 'mysqlpass';

try {
	$mysqli = new PDO("mysql:host=$hostname;dbname=$db_name;charset=utf8", $username, $password, array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	print "Connection Established!";
}
catch(PDOException $e) {
    echo $e->getMessage();
}

// Getting posted data and decodeing json
$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['menuTitle'])) $errors['menuTitle'] = 'Menu Title is required.';
if (empty($_POST['dateCreated'])) $errors['dateCreated'] = 'DateCreated is required.';
if (empty($_POST['status'])) $errors['status'] = 'Status is required.';

$personId		=	$_POST['personId'];
$menuTitle 		= 	$_POST['menuTitle'];
$dateCreated 	= 	$_POST['dateCreated'];
$status 		= 	$_POST['status'];

$query	=	"INSERT INTO menus(personId, title, created, status) VALUES ('$personId', '$menuTitle', '$dateCreated', '$status');";
echo "query: $query";

$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

echo $json_response = json_encode($result);


?>