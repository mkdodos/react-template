<?php

header("Access-Control-Allow-Origin:*");

$_POST = json_decode(file_get_contents("php://input"), true);

$db = new PDO("odbc:master");

$table = "報價工件表";
$id = "工件單號";

$sql = "DELETE from $table where $id=" . $_POST['id'];
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
    $rs = $db->query($sql);
} catch (PDOException $err) {
    print_r($err->getMessage());
}
