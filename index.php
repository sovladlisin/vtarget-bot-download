<?php


$_SERVER["DOCUMENT_ROOT"] = realpath(dirname(__FILE__)."/..");
print_r($_SERVER['DOCUMENT_ROOT']);

$start = '/usr/local/bin/node '.$_SERVER['DOCUMENT_ROOT'].'/node3.js https://www.shutterstock.com/ru/image-photo/family-couple-arguing-mad-husband-yelling-635833835?noReload=true';
//  print_r($start);
print_r($start);
exec($start,$out);
print_r($out);


