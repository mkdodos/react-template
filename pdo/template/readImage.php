<?php
// 讀取放在網站以外的資料夾檔案
// php open file outside root
// https://stackoverflow.com/questions/13357994/access-a-file-which-is-located-before-outside-the-server-root-directory

// header('Content-Type: image/png');
 header('Content-Type: application/pdf');
$quoteID = $_GET['quoteID'];


// $filePath = "D:\database\Dropbox\報價單\峻發\\" . $id . ".jpg";
// $filePath = "D:\database\Dropbox\報價單\峻發\\114102708.jpg";
// $filePath = "D:\Dropbox\報價單\網站圖\\$quoteID.jpg";
$filePath = "D:\Dropbox\報價單\網站圖\\$quoteID.pdf";
// $filePath = "D:\database\quote\\25010809.jpg";
$filePath = mb_convert_encoding($filePath, "BIG5", "UTF-8");

readfile($filePath);

// if (file_exists($filePath)) {
//    readfile($filePath);
// } else {
//     echo "The file $filename does not exist";
// }

