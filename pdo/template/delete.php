<?php

header("Access-Control-Allow-Origin:*");
include_once("./params.php");

// $_POST = json_decode(file_get_contents("php://input"), true);

$db = new PDO("odbc:master");

// $table = "報價表";
// $id = "報價單號";

$sql = "DELETE from $TABLE where $ID=$id";
echo $sql;
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");



try {
    $rs = $db->query($sql);
} catch (PDOException $err) {
    print_r($err->getMessage());
}
