
<?php
$hostname = "localhost";
$database = "DATABASE";
$username = "USERNAME";
$password = "PASSWORD";


try {
  $conn = new PDO("mysql:host=$hostname;dbname=$database;charset=utf8", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
} catch (PDOException $e) {
  die('Connection Failed: ' . $e->getMessage());
}

?>