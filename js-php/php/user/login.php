<?php

    @require_once('../config.php');

    $username = $_GET['userName'];
    $userpwd = $_GET['userPwd'];

    $str ="SELECT * from user WHERE username = '$username' OR usertel='$username' OR usermail='$username' OR usernicheng='$username'";

    $resouce = mysql_query($str);

    $List = mysql_fetch_array($resouce);

    $jsonArray=array();
    if($List==false){
        $jsonArray['flag']='0';
        $jsonArray['msg']='用户名不存在';
        echo json_encode($jsonArray);
    }else{
        if($List['userpwd']==$userpwd){
            $jsonArray['flag']='1';
            $jsonArray['msg']='登陆成功';
            $jsonArray['userid']=$List['id'];
            $jsonArray['username']=$List['username'];
            $jsonArray['usernicheng']=$List['usernicheng'];
            // $jsonArray['usertel']=$List['usertel'];
            // $jsonArray['usermail']=$List['usermail'];
            // $jsonArray['usersex']=$List['usersex'];
            echo json_encode($jsonArray);
        }else{
            $jsonArray['flag']='-1';
            $jsonArray['msg']='密码错误';
            echo json_encode($jsonArray);
        }
    }

?>