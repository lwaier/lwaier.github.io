<?php
    @require_once('../config.php');

    $str="SELECT * from brandinfo WHERE brandad='true' limit 0,6 ";

    $resouce = mysql_query($str);

    $jsonArr=array();

    while($res=mysql_fetch_array($resouce)){
        $List = array();
        $List['id']=$res['id'];
        $List['brandname']=$res['brandname'];
        $List['brandadimg']=$res['brandadimg'];
        $jsonArr[]=$List;
    }

    echo json_encode($jsonArr);

?>