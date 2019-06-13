<?php

 @require_once('../config.php');

 $userid = $_GET['userId'];

 $str = "SELECT * from gouwuche where userid=$userid and dingdanxianshi='true' ORDER BY 'gooodsid' ";
 $recouce = mysql_query($str);
 $jsonarr = array();
    while($item=mysql_fetch_array($recouce)){
        $obj=array();
        $obj['id']=$item['id'];
        $obj['goodsid']=$item['goodsid'];
        $obj['liebie']=$item['liebie'];
        $obj['liebieid']=$item['liebieid'];
        $obj['liebietwo']=$item['liebietwo'];
        $obj['liebietwoid']=$item['liebietwoid'];
        $obj['goodnum']=$item['goodnum'];
        $obj['goodname']=$item['goodname'];
        $obj['goodprivce']=$item['goodprivce'];
        $obj['goodimg']=$item['goodimg'];
        $jsonarr[]=$obj;
    }
    echo json_encode($jsonarr);


?>