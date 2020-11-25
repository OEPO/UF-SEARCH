<?php

include('conexion.php');

function getYear($mbd) {
    $json = array();
    $sql = "SELECT * FROM uf";
    foreach ($mbd->query($sql) as $row) {
        $json[] = array(
            'id' => $row['id'],
            'fecha' => $row['fecha'],
            'uf' => $row['uf']
        );
    }
    $json_s = json_encode($json);
    echo $json_s;
}

getYear($mbd);


?>
