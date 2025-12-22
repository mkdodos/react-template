<?php
$obj = json_decode(file_get_contents('php://input'));

// create update 共用
// 客戶,案號,聯絡人
$custID = empty($obj->custID)?'Null':"'".$obj->custID."'";
$caseNo = empty($obj->caseNo)?'Null':"'".$obj->caseNo."'";
$contactor = empty($obj->contactor)?'Null':"'".$obj->contactor."'";
$presentor = empty($obj->presentor)?'Null':"'".$obj->presentor."'";

$size1 = empty($obj->size1)?'Null':"'".$obj->size1."'";
$size2 = empty($obj->size2)?'Null':"'".$obj->size2."'";
$size3 = empty($obj->size3)?'Null':"'".$obj->size3."'";

?>