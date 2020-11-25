<?php


include('conexion.php');
$search = $_POST["search"];
$search = explode('/',$search);
$jsonM = array();
$sql = "SELECT * FROM uf WHERE YEAR(fecha)='$search[2]' AND MONTH(fecha)='$search[0]' AND DAY(fecha)='$search[1]'";
//print_r($sql);
foreach ($mbd->query($sql) as $row) {
    $jsonM[] = array(
        'id' => $row['id'],
        'fecha' => $row['fecha'],
        'uf' => $row['uf']
    );
}
$jsonM_s = json_encode($jsonM);
echo $jsonM_s;


?>