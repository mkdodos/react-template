<?php
$filename = '/path/to/foo.txt';

$filename = "D:\database\Dropbox\報價單\峻發\\114102708.jpg";

$filename = mb_convert_encoding($filename, "BIG5", "UTF-8");

if (file_exists($filename)) {
    echo "The file $filename exists";
} else {
    echo "The file $filename does not exist";
}
?>