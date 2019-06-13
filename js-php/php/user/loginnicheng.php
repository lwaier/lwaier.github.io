<?php
    @require_once('../config.php');
    $userid=$_GET['userId'];

    $str="SELECT usernicheng from user WHERE id= $userid ";


    $resouce = mysql_query($str);

    $List=mysql_fetch_array($resouce);

    $jsonArr=array();

    $jsonArr['usernicheng']=$List[0];

    echo json_encode($jsonArr);
    
?>