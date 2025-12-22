<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:text/html; charset=big5");
// 建立連線,傳回PDO物件
$db = new PDO("odbc:master");

// 接收參數
$custID = isset($_GET["custID"]) ? $_GET["custID"] : "";
$size1 = isset($_GET["size1"]) ? $_GET["size1"] : "";
$size2 = isset($_GET["size2"]) ? $_GET["size2"] : "";
$size3 = isset($_GET["size3"]) ? $_GET["size3"] : "";
$workName = isset($_GET["workName"]) ? $_GET["workName"] : "";
$workNote = isset($_GET["workNote"]) ? $_GET["workNote"] : "";
$quoteID = isset($_GET["quoteID"]) ? $_GET["quoteID"] : "";
$caseNo = isset($_GET["caseNo"]) ? $_GET["caseNo"] : "";


// 組合查詢條件
$where = "";


if ($custID) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 報價表.客戶編號  = '" . $custID . "'";
}


if ($size1) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 尺寸1  = " . $size1;
}


if ($size2) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 尺寸2  = " . $size2;
}


if ($size3) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 尺寸3  = " . $size3;
}

if ($workName) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 品名 LIKE '%" . $workName . "%'";
}

if ($workNote) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 加工說明 LIKE '%" . $workNote . "%'";
}

if ($quoteID) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 報價表.報價單號  = '" . $quoteID . "'";
}


if ($caseNo) {
  if ($where != "") {
    $where .= " AND ";
  }
  $where .= " 報價表.客戶案號  LIKE '%" . $caseNo . "%'";
}


if ($where != "")
  $where = " WHERE " . $where;




// 沒有傳查詢參數時,不處理以下查詢(避免傳回太多筆資料)

// if ($where == "") {
//   $rows = [];
//   $json = json_encode($rows, JSON_UNESCAPED_SLASHES);
//   $json = urldecode($json);
//   echo $json;
//   return;
// }

// 查詢字串(日期前後加上#,才能在 access 資料庫查詢)
// $query = "



// 55074
// 品名 SC\M440轉移軸外徑一次研磨

$query = "
  SELECT TOP 51
  工件單號 as id,

    報價表.報價單號 as quoteID,
        報價表.客戶編號 as custID ,
        客戶名稱 as custName ,
        尺寸1 as size1,
        尺寸2 as size2,
        尺寸3 as size3,
        IIf([尺寸1]>0,'Φ ' & [尺寸1] & ' * ') & [尺寸2] & IIf([尺寸3]>0,' * ' & [尺寸3]) as size,
        品名 as workName,
        加工說明 as workNote,
        單價 as price,
        成交價 as donePrice,
        數量 as qty,
        成交日期 as doneDate,        
        客戶案號 as caseNo,
        報價表.聯絡人 as contactor
        
  FROM (報價表 INNER JOIN 報價工件表 ON 報價表.報價單號 = 報價工件表.報價單號) INNER JOIN 客戶資料 ON 報價表.客戶編號 = 客戶資料.客戶編號
  $where 
  ORDER BY 報價表.報價單號 DESC, 報價工件表.工件單號 
 
";


// 轉成 BIG5 才能在 access 查詢
$query = mb_convert_encoding($query, "BIG5", "UTF-8");

// echo $query;
// return;

// 執行查詢
$sth = $db->prepare($query);
$sth->execute();

// 取得查詢結果的陣列
$arr = $sth->fetchAll(\PDO::FETCH_ASSOC);


//test
// print_r($arr);
// return;
//

// 組合資料
$json = "";
$rows = [];
for ($i = 0; $i < count($arr); $i++) {

  foreach ($arr[$i] as $key => $value) {
    $value = filterStr($value);
    $newarr[$key] = urlencode(trim($value));
  }


  // 移除.0結尾字串 (例123.0=>123)
  $newarr["price"] = preg_replace("/.0$/", "",$newarr["price"]);
  $newarr["size1"] = preg_replace("/.0$/", "",$newarr["size1"]);
  $newarr["size2"] = preg_replace("/.0$/", "",$newarr["size2"]);
  $newarr["size3"] = preg_replace("/.0$/", "",$newarr["size3"]);
  $rows[$i] = $newarr;
}


// array to json
// $json = json_encode($rows,JSON_UNESCAPED_SLASHES);
$json = json_encode($rows);


// 再用urldecode把資料轉回成中文格式

// $json = html_entity_decode($json);
$json = urldecode($json);

echo $json;

/************************************** */
// 將多餘的符號過濾掉
function filterStr($str)
{

  // '2022100408' 附註欄內容含有換行,要替換掉 
  $str = trim(preg_replace('/\s\s+/', ' ', $str));
  // '2022092716' 品名含有 " 要加上 \
  $str = str_replace('"', '\"', $str);
  // 查詢允強時出錯
  // 發現 報價工件表.工件單號 56499 56502 56500 56305
  // 加工說明欄位,有包含全型空白,要替換掉
  $str = str_replace("	", "", $str);

  return $str;
}
