<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:text/html; charset=big5");
// 建立連線,傳回PDO物件
$db = new PDO( "odbc:master");

// 接收參數
$year = isset($_GET["year"]) ? $_GET["year"] : "";
$month = isset($_GET["month"]) ? $_GET["month"] : "";



// 組合查詢條件
$where = "";


if ($year) {
  if ($where != "") {
    $where .= " AND ";
  }
 $where.= " Year([入廠日])=".$year;
}


if ($month) {
  if ($where != "") {
    $where .= " AND ";
  }
 $where.= " Month([入廠日])=".$month;
}



if ($where != "")
  $where = " WHERE " . $where;


// 查詢字串(日期前後加上#,才能在 access 資料庫查詢)
$query = "

SELECT  
  TOP 100
    工作單號 as id,
    入廠日 as inDate 
  FROM 進貨表   
  $where
  ORDER BY 入廠日 DESC,工作單號 DESC

"
 ;


//  $query = "

// SELECT  
//   TOP 100
//     工件單號 as id,
//     加工說明 as workNote    
//   FROM 報價工件表   
//   $where
  

// "
//  ;


$query = "

SELECT TOP 50 
  工件單號 as id,

    報價表.報價單號 as quoteID,
        報價表.客戶編號 as custID ,
        客戶名稱 as custName ,
        尺寸1 as size1,
        尺寸2 as size2,
        尺寸3 as size3,
        IIf([尺寸1]>0,'Φ' & [尺寸1] & '*') & [尺寸2] & IIf([尺寸3]>0,'*' & [尺寸3]) as size,
        品名 as workName,
        加工說明 as workNote,
        單價 as price,
        成交價 as donePrice,
        數量 as qty,
        成交日期 as doneDate,        
        客戶案號 as caseNo
        
  FROM (報價表 INNER JOIN 報價工件表 ON 報價表.報價單號 = 報價工件表.報價單號) INNER JOIN 客戶資料 ON 報價表.客戶編號 = 客戶資料.客戶編號
  $where 
  ORDER BY 報價表.報價單號 DESC, 報價工件表.工件單號 
";


// 轉成 BIG5 才能在 access 查詢
$query = mb_convert_encoding($query, "BIG5", "UTF-8");

// echo $query;

// 執行查詢
$sth = $db->prepare($query);
$sth->execute();

// 取得查詢結果的陣列
$arr = $sth->fetchAll(\PDO::FETCH_ASSOC);

// 組合資料
$json = "";
$rows = [];
for ($i = 0; $i < count($arr); $i++) {
  
  foreach ($arr[$i] as $key => $value) {    
    $value = filterStr($value);
    $newarr[$key] =urlencode(trim($value));    
  }

   // 原始日期 2022-01-05 00:00:00 將時分秒去掉    
  //  $newarr["inDate"] = substr( $newarr["inDate"] , 0 , 10 );

  $rows[$i] = $newarr;
}


// array to json
$json = json_encode($rows,JSON_UNESCAPED_SLASHES);


// 再用urldecode把資料轉回成中文格式
$json = urldecode($json);

echo $json;

/************************************** */
// 將多餘的符號過濾掉
function filterStr($str) {

  // '2022100408' 附註欄內容含有換行,要替換掉 
  $str = trim(preg_replace('/\s\s+/', ' ', $str));
  // '2022092716' 品名含有 " 要加上 \
  $str = str_replace('"', '\"', $str);

   $str = str_replace("	", "", $str);

  return $str;

}

?>
