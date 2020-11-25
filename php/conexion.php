<?php

$user = 'root';
$password = '';

try {
    $mbd = new PDO('mysql:host=localhost;dbname=liam', $user, $password);
} catch (PDOException $e) {
    print "¡Error!: " . $e->getMessage() . "<br/>";
    die();
}

?>