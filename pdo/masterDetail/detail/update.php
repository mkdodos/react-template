<?php
header("Access-Control-Allow-Origin:*");

$connectionString = "odbc:master";
$db = new PDO($connectionString);

$obj = json_decode(file_get_contents('php://input'));

$table = "報價表";
$id = "報價單號";


$contactor = empty($obj->contactor)?'Null':"'".$obj->contactor."'";
$caseNo = empty($obj->caseNo)?'Null':"'".$obj->caseNo."'";
$custID = empty($obj->custID)?'Null':"'".$obj->custID."'";


$sql = " UPDATE $table SET 
  客戶編號=$custID,
  客戶案號=$caseNo,
  聯絡人=$contactor  
  WHERE $id='$obj->quoteID'";

echo $sql;

$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");

try {
  $statement = $db->prepare($sql);
  $statement->execute();
} catch (PDOException $err) {
  print_r($err->getMessage());
}
