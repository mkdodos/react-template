<?php
header("Access-Control-Allow-Origin:*");
include_once "../../utils/genID.php";
include_once "./params.php";

$db = new PDO("odbc:master");

$table = "報價表";

$quoteID = genID("報價表","報價單號",7); 
$sql =  "INSERT INTO $table
          (客戶編號,客戶案號,聯絡人,經辦人,報價單號) values
          ($custID,$caseNo,$contactor,$presentor,$quoteID)";



// echo $sql;


$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);

echo $quoteID;
// echo "add master";
// echo genID("報價表","報價單號",7);
?>