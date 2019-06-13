<?php

 @require_once('../config.php');

 $id = $_GET['Id'];

 $str = "SELECT * from brandinfo WHERE id =$id";

 $recouce = mysql_query($str);
 $jsonarr = array();
    while($item=mysql_fetch_array($recouce)){
        $obj=array();
        $obj['id']=$item['id'];
        $obj['brandname']=$item['brandname'];
        $obj['brandnowdatebadimg']=$item['brandnowdatebadimg'];
        $obj['brandnowdatefutureactive']=$item['brandnowdatefutureactive'];
        $obj['brandadname']=$item['brandadname'];
        $jsonarr[]=$obj;
    }
    echo json_encode($jsonarr);

?>