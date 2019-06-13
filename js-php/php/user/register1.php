<?php
//该php用来提前检测用户名是否重复,以给予用户较好的体验
    @require_once('../config.php');
    $username = $_GET['userName'];

    $str="SELECT * from user where username = '$username'";

    $resouce=mysql_query($str);

    $List = mysql_fetch_array($resouce);

    $jsonArr = array();

    if(empty($List)){
        $jsonArr['flagnum']='1';
        $jsonArr['msg']='用户名可用';
    }else{
        $jsonArr['flagnum']='0';
        $jsonArr['msg']='用户名重复';
    }

    echo json_encode($jsonArr);




?>