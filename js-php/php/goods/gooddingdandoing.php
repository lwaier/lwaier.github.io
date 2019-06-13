<?php

 @require_once('../config.php');

 $idList = $_GET['idList'];

 $str = "update gouwuche set dingdanxianshi='doing' where id in ($idList) ";

 mysql_query( $str);

//获取受影响的行数
$count = mysql_affected_rows();
$jsonArr=array();
if($count>0){
    $jsonArr['flagnum']='1';
    $jsonArr['msg']='结算成功';
}else{
    $jsonArr['flagnum']='0';
    $jsonArr['msg']='结算失败,请刷新后重新结算,不会影响您的余额的哟';
}
echo json_encode($jsonArr);

 ?>