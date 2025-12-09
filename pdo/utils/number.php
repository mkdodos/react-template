<?php
$origin = "123.0";
// 移除.0結尾字串 (例123.0=>123)
$replaced = preg_replace("/.0$/", "", $origin);
echo $replaced;


// chrome 搜尋 php remove string 
// AI 摘要 
$original_string = "Hello 123 world 456!";
// Removes all numbers
$new_string = preg_replace("/[0-9]+/", "", $original_string);
echo $new_string; // Output: Hello  world !
