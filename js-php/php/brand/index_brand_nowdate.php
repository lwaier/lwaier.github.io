<?php
    @require_once('../config.php');

    $str="SELECT * from brandinfo WHERE brandnowdatead='true' limit 0,4 ";

    $resouce = mysql_query($str);

    $jsonArr=array();

    while($res=mysql_fetch_array($resouce)){
        $List = array();
        $List['id']=$res['id'];
        $List['brandname']=$res['brandname'];
        $List['brandadimg']=$res['brandadimg'];
        $List['brandadname']=$res['brandadname'];
        $List['brandnowdatefutureactive']=$res['brandnowdatefutureactive'];
        $jsonArr[]=$List;
    }

    echo json_encode($jsonArr);

?>