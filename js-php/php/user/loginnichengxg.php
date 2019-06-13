<?php
    @require_once('../config.php');
    $userid=$_GET['userId'];
    $userni=$_GET['userNi'];

    $str="UPDATE user set usernicheng = '$userni' where id= $userid ";


    $resouce = mysql_query($str);

    //获取受影响的行数
    $counthree = mysql_affected_rows();

    $jsonArr=array();
if($counthree){
    $jsonArr['flagnum']=1;
    $jsonArr['msg']='设置昵称成功';
}else{
    $jsonArr['flagnum']=0;
    $jsonArr['msg']='设置昵称失败,请刷新后重新尝试';
}
    

    echo json_encode($jsonArr);
    
?>