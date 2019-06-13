<?php

    @require_once('../config.php');

    $str="SELECT * from brandinfo WHERE brandnowdatebottomad='true' limit 0,8 ";

    $resouce = mysql_query($str);

    $jsonArr=array();

    while($res=mysql_fetch_array($resouce)){
        $List = array();
        $List['id']=$res['id'];
        $List['brandname']=$res['brandname'];
        $List['brandnowdatebadimg']=$res['brandnowdatebadimg'];
        $jsonArr[]=$List;
    }

    echo json_encode($jsonArr);



?>