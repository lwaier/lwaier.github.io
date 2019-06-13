<?php

 @require_once('../config.php');

 $userid = $_GET['userId'];

 $str = "SELECT * from shouhuoinfo where userid='$userid' ";
 $recouce = mysql_query($str);
 $jsonarr = array();
    while($item=mysql_fetch_array($recouce)){
        $obj=array();
        $obj['id']=$item['id'];
        $obj['shouhuoren']=$item['shouhuoren'];
        $obj['shouhuophone']=$item['shouhuophone'];
        $obj['shouhuodiqu']=$item['shouhuodiqu'];
        $obj['shouhuojiedao']=$item['shouhuojiedao'];
        $obj['moren']=$item['moren'];
        $jsonarr[]=$obj;
    }
    echo json_encode($jsonarr);


?>