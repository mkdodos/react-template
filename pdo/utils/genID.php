<?php
// 以原有單號最大值為基礎,取得+1的號碼,作為新增用
// 報價單號為民國年
// 工作單號為西元年
// 取得單號方式有些微不同 

// echo genID([資料表],[id欄位],[單號位數]);
echo genID("進貨表", "工作單號", 8);
// echo genID("報價表","報價單號",7);

function genID($table, $idName, $digits)
{

    $db = new PDO("odbc:master");
    // 取得原有單號最大值
    $query = "SELECT MAX($idName) as id FROM $table ";
    $query = mb_convert_encoding($query, "BIG5", "UTF-8");
    $sth = $db->prepare($query);
    $sth->execute();
    $arr = $sth->fetchAll(\PDO::FETCH_ASSOC);
    // 單號 (例:114121102)
    $id = $arr[0]["id"];
    // 單號前7位
    $idYmd = substr($id, 0, $digits);
    // 單號後2位
    $idNum = substr($id, $digits, 2);
    // 依單號位數取得西元年或民國年
    // 當天日期年月日
    if ($digits == 7) {
        $today = (date("Y") - 1911) . date("md");
    } else {
        $today = date("Ymd");
    }


    // 比對同一天,原單號+1,不同天以該日期做為前7位加上01
    if ($idYmd == $today) {
        $num = intval($idNum) + 1;
        // 小於10補0
        if ($num < 10) {
            $num = "0" . $num;
        }
        $num = $idYmd . $num;
    } else {
        $num = $today . "01";
    }

    return $num;
}
