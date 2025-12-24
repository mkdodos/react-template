<?php
header("Access-Control-Allow-Origin:*");
include_once "../../utils/genID.php";
include_once "./params.php";

$db = new PDO("odbc:master");

$table = "報價工件表";
$id = "工件單號";




$sql =  "INSERT INTO $table
          (品名,加工說明,報價單號,尺寸1,尺寸2,尺寸3,數量,單價) values
          ($workName,$workNote,$quoteID,$size1,$size2,$size3,$qty,$price)";



$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);

// 傳回新增完該筆ID
$sql = "SELECT top 1 $id from $table order by $id desc";
$sql = mb_convert_encoding($sql, "BIG5", "UTF-8");
$rs = $db->query($sql);
$lastId = $rs->fetch()[0];
echo $lastId;


// echo $quoteID;
// echo "add master";
// echo genID("報價表","報價單號",7);
?>