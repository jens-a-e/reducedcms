<?
/*==============================================================================
=            A simple PHP script to dump the contents of a directory           =
==============================================================================*/
$files = []; foreach (glob("content/*") as $filename) $files []= $filename;
file_put_contents ( "./db.json" , json_encode($files));