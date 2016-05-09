<?php
require_once 'config.php'; // The mysql database connection script

// set up the connection variables
$db_name  = 'iforkandspoon';
$hostname = 'localhost';
$username = 'root';
$password = 'mysqlpass';

// connect to the database
// var $dbh
$dbh = new PDO("mysql:host=$hostname;dbname=$db_name", $username, $password);

// a query get all the records from the users table
// var $sql
$sql = 'SELECT id, firstname, lastname, type FROM person';

// use prepared statements, even if not strictly required is good practice
// var $stmt
$stmt = $dbh->prepare( $sql );

// execute the query
$stmt->execute();

// fetch the results into an array
$result = $stmt->fetchAll( PDO::FETCH_ASSOC );

// convert to json
$json = json_encode( $result );

// echo the json string
return $json;

?>