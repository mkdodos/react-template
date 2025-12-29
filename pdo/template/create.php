<?php
header("Access-Control-Allow-Origin:*");
include_once "./params.php";
$db = new PDO("odbc:master");

$sql =  "INSERT INTO $TABLE
          (尺寸1,尺寸2,尺寸3,數量,單價) values
          ($size1,$size2,$size3,$qty,$price)";


$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);

// echo $sql;

// 傳回新增完該筆ID
$sql = "SELECT top 1 $ID from $TABLE order by $ID desc";
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);
$lastId = $rs->fetch()[0];
echo $lastId;


// echo $quoteID;
// echo "add master";
// echo genID("報價表","報價單號",7);
?>