<?php

 @require_once('../config.php');

 $idList = $_GET['idList'];

 $str = "DELETE from shouhuoinfo where id in ($idList) ";

 mysql_query( $str);

//获取受影响的行数
$count = mysql_affected_rows();
$jsonArr=array();
if($count>0){
    $jsonArr['flagnum']='1';
    $jsonArr['msg']='删除成功';
}else{
    $jsonArr['flagnum']='0';
    $jsonArr['msg']='删除失败,请刷新后重新删除';
}
echo json_encode($jsonArr);

 ?>