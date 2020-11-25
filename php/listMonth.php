<?php


include('conexion.php');
$search = $_POST["search"];
//print_r($search);
$jsonM = array();

$sql = "SELECT * FROM uf WHERE month(fecha)=".$search;
foreach ($mbd->query($sql) as $row) {
    $jsonM[] = array(
        'id' => $row['id'],
        'fecha' => $row['fecha'],
        'uf' => $row['uf']
    );
}
$jsonM_s = json_encode($jsonM);
echo $jsonM_s;
