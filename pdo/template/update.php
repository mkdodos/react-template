<?php
header("Access-Control-Allow-Origin:*");
include_once("./params.php");

$connectionString = "odbc:master";
$db = new PDO($connectionString);

$obj = json_decode(file_get_contents('php://input'));

// $table = "報價表";
// $id = "報價單號";


// $contactor = empty($obj->contactor)?'Null':"'".$obj->contactor."'";
// $caseNo = empty($obj->caseNo)?'Null':"'".$obj->caseNo."'";
// $custID = empty($obj->custID)?'Null':"'".$obj->custID."'";





$sql = " UPDATE $TABLE SET 
  尺寸1=$size1,
  尺寸2=$size2
  WHERE $ID=$id";

echo $sql;

$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
  $statement = $db->prepare($sql);
  $statement->execute();
} catch (PDOException $err) {
  print_r($err->getMessage());
}
