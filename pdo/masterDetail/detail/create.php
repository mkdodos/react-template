<?php
header("Access-Control-Allow-Origin:*");
include_once "../../utils/genID.php";
include_once "./params.php";

$db = new PDO("odbc:master");

$table = "報價工件表";


$sql =  "INSERT INTO $table
          (報價單號,尺寸1) values
          ($quoteID,$size1)";



// echo $sql;


$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);

// echo $quoteID;
// echo "add master";
// echo genID("報價表","報價單號",7);
?>