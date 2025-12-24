<?php
header("Access-Control-Allow-Origin:*");
include_once("./params.php");

$connectionString = "odbc:master";
$db = new PDO($connectionString);

$obj = json_decode(file_get_contents('php://input'));

$table = "報價工件表";
$id = "工件單號";




$sql = " UPDATE $table SET 
  品名=$workName,
  加工說明=$workNote,
  尺寸1=$size1,
  尺寸2=$size2,
  尺寸3=$size3,
  數量=$qty,
  單價=$price,
  成交價=$donePrice
  WHERE $id=$obj->id";

echo $sql;

$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
  $statement = $db->prepare($sql);
  $statement->execute();
} catch (PDOException $err) {
  print_r($err->getMessage());
}
