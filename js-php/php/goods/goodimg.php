<?php

    @require_once('../config.php');

    $goodsId=$_GET['goodsId'];

    $str="SELECT * from goodimg WHERE goodsid='$goodsId' ";

    $resouce = mysql_query($str);

    $jsonArr=array();


    while($res=mysql_fetch_array($resouce)){
        $list = array();
        $list['imgid']=$res['id'];
        $list['imgsrc']=$res['goodimg'];
        $jsonArr[]=$list;
    };

   echo json_encode($jsonArr);

//输出对应商品对应的图片

?>