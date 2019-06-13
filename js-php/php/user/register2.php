<?php

    @require_once('../config.php');
    
    $username = $_GET['userName'];
    $userpwd = $_GET['userPwd'];

    //register1.php已经做了重复验证,这里不再考虑重复验证,其实还是有风险
    //因为我这整个项目没有考虑页面密码安全和php接口安全(为什么不考虑勒,因为我还不是全栈哈哈
    // 接口安全是必须存在的,我有时间会学习的)

    $jsonArr = array();
    if(is_numeric($username)){
        //这里是手机用户注册
        $str ="INSERT INTO user(username,userpwd,usertel) VALUES('$username','$userpwd','$username')";
        mysql_query($str);
        $count=mysql_affected_rows();
        if($count>0){
            $jsonArr['flagnum']='1';
            $jsonArr['msg']='手机用户注册成功';
            echo json_encode($jsonArr);
        }else{
            $jsonArr['flagnum']='0';
            $jsonArr['msg']='注册失败,请刷新重新注册';
            echo json_encode($jsonArr);
        }
    }else{
        //这里是邮箱用户注册
        $str ="INSERT INTO user(username,userpwd,usermail) VALUES('$username','$userpwd','$username')";
        mysql_query($str);
        $count=mysql_affected_rows();
        if($count>0){
            $jsonArr['flagnum']='1';
            $jsonArr['msg']='邮箱用户注册成功';
            echo json_encode($jsonArr);
        }else{
            $jsonArr['flagnum']='0';
            $jsonArr['msg']='注册失败,请刷新重新注册';
            echo json_encode($jsonArr);
        }
    }





?>