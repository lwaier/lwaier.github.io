<?php
    @require_once('../config.php');
    $goodsKey=$_GET['goodsKey'];
    $goodsYiju=$_GET['goodsYiju'];
    $str="SELECT count(*) from goodslist WHERE $goodsYiju like '$goodsKey' ";

    $resouce = mysql_query($str);

    $List=mysql_fetch_array($resouce);

    $jsonArr=array();

    $jsonArr['count']=$List[0];

    echo json_encode($jsonArr);
    
?>