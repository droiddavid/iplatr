<?php
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

// set up the connection variables
$db_name  = 'iforkandspoon';
$hostname = 'localhost';
$username = 'root';
$password = 'mysqlpass';

try {
	$mysqli = new PDO("mysql:host=$hostname;dbname=$db_name;charset=utf8", $username, $password, array(PDO::ATTR_EMULATE_PREPARES => false, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
	
	//The printed value will appear as part of the response.
	//print "Connection Established!";
}
catch(PDOException $e) {
    echo $e->getMessage();
}


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

// a query get all the records from the users table
// var $sql
$sql = "SELECT personid, firstname, lastname, emailaddress, type FROM person WHERE emailaddress = '$email' AND password = '$password'";
//The echoed value will appear as part of the response.
//echo "sql = '$sql'";

// use prepared statements, even if not strictly required is good practice
// var $stmt
$stmt = $mysqli->prepare( $sql );

// execute the query
$stmt->execute();

// fetch the results into an array
$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

// convert to json
$json = json_encode( $result );
//The echoed value will appear as part of the response.
//echo "$json";

// echo the json string
return $json;

?>