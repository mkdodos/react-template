<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:text/html; charset=big5");
// 建立連線,傳回PDO物件
$db = new PDO( "odbc:master");

// 接收參數
$id = isset($_GET["id"]) ? $_GET["id"] : "";


// 查詢字串(日期前後加上#,才能在 access 資料庫查詢)
$query = "

SELECT 
  
  客戶編號 as id,
  客戶名稱 as custName,
  電話 as tel,
  住址 as addr
  FROM [客戶資料]   
  


"
 ;

if($id!=""){
  $query.=" where 客戶編號='{$id}'";
} 



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


  $rows[$i] = $newarr;
}

// $test['data']=$rows;

// array to json
$json = json_encode($rows,JSON_UNESCAPED_SLASHES);
// $json = json_encode($test,JSON_UNESCAPED_SLASHES);

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

  return $str;

}

?>
