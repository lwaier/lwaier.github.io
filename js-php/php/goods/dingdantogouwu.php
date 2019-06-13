<?php

 @require_once('../config.php');

 $id = $_GET['Id'];

 $str = "UPDATE gouwuche SET dingdanxianshi = 'true' WHERE id in($id) ";

 $recouce = mysql_query($str);
 $countfour = mysql_affected_rows();
 $jsonArr =array();
if($countfour>0){
    $jsonArr['flagnum']='1';
    $jsonArr['msg']='返回购物车成功';
}else{
    $jsonArr['flagnum']='1';
    $jsonArr['msg']='返回购物车失败';
}
echo json_encode($jsonArr)
?>