<?php



$TABLE="報價工件表";
$ID="工件單號";

$obj = json_decode(file_get_contents('php://input'));

// create update 共用



$id = empty($obj->id)?'Null':$obj->id;
$quoteID = empty($obj->quoteID)?'Null':"'".$obj->quoteID."'";

$workNote = empty($obj->workNote)?'Null':"'".$obj->workNote."'";
$workName = empty($obj->workName)?'Null':"'".$obj->workName."'";

$size1 = empty($obj->size1)?'Null':"'".$obj->size1."'";
$size2 = empty($obj->size2)?'Null':"'".$obj->size2."'";
$size3 = empty($obj->size3)?'Null':"'".$obj->size3."'";

$qty = empty($obj->qty)?'Null':"'".$obj->qty."'";
$price = empty($obj->price)?'Null':"'".$obj->price."'";
$donePrice = empty($obj->donePrice)?'Null':"'".$obj->donePrice."'";

?>