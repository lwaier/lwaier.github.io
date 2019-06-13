<?php

    @require_once('../config.php');

    $id=$_GET['goodId'];
    $num = $_GET['goodNum'];

    $str="UPDATE gouwuche SET goodnum = $num  WHERE id = $id ";

    $resouce = mysql_query($str);

    $jsonArr=array();

//获取受影响的行数
$counthree = mysql_affected_rows();
    
    if($counthree>0){
        $jsonArr['flagnum']='1';
        $jsonArr['msg']='更新成功';
    }else{
        $jsonArr['flagnum']='0';
        $jsonArr['msg']='更新失败';
    }

   echo json_encode($jsonArr);

//输出对应商品对应的图片

?>