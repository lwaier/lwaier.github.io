<?php
    @require_once('../config.php');
    
    $userid = $_GET['userId'];
    $shouhuoren = $_GET['shouHuoRen'];
    $shouhuophone = $_GET['shouHuoPhone'];
    $shouhuodiqu = $_GET['shouHuoDiQu'];
    $shouhuojiedao = $_GET['shouHuoJieDao'];
    $moren = $_GET['moRen'];


     //检测是否已存在
     $strone = "SELECT count(*) FROM shouhuoinfo WHERE userid = '$userid' and shouhuoren = '$shouhuoren' and shouhuophone = '$shouhuophone' and shouhuodiqu = '$shouhuodiqu'  and shouhuojiedao = '$shouhuojiedao' " ;
    
     $resouce = mysql_query($strone);
     
     $List = mysql_fetch_array($resouce);
 
     $count = $List[0] ;
  
     $jsonArr = array();
 
     if($count<1){
         //检测是否有重复数据 没有则进 有则不进
        $strtwo = "SELECT count(*) from shouhuoinfo WHERE userid = '$userid' ";
        $resoucetwo = mysql_query($strtwo);
        $Listtwo = mysql_fetch_array($resoucetwo);
        $counttwo = $Listtwo[0] ;
    
        if($counttwo>0){
            //检测是否是首次设置 否则进 
            if($moren){
                //检测是否将其设置为默认 是则进
                $strsix="UPDATE shouhuoinfo SET moren = 'false' WHERE userid ='$userid'";
                mysql_query($strsix);
                //获取受影响的行数
                $counthree = mysql_affected_rows();
                
                if($counthree>=0){
                    $strfive="INSERT INTO shouhuoinfo(userid,shouhuoren,shouhuophone,shouhuodiqu,shouhuojiedao,moren) VALUES('$userid','$shouhuoren','$shouhuophone','$shouhuodiqu','$shouhuojiedao','true')";
                    mysql_query($strfive);
                    //获取受影响的行数
                    $counfour = mysql_affected_rows();
                    if($counfour>0){
                        $jsonArr['flagnum']='1';
                        $jsonArr['msg']='添加成功,已将其设置为默认';
                    }else{
                        $jsonArr['flagnum']='0';
                        $jsonArr['msg']='添加失败,请重新添加哦';
                        //如果失败,此处应该将刚刚改为false的地址重新该为true,避免用户表里面丢失默认地址;
                    }
                }  
            }else{
                $strfour="INSERT INTO shouhuoinfo(userid,shouhuoren,shouhuophone,shouhuodiqu,shouhuojiedao,moren) VALUES('$userid','$shouhuoren','$shouhuophone','$shouhuodiqu','$shouhuojiedao','false')";
                mysql_query($strfour);
                //获取受影响的行数
                $counfive = mysql_affected_rows();
                if($counfive>0){
                    $jsonArr['flagnum']='1';
                    $jsonArr['msg']='添加成功';
                }else{
                    $jsonArr['flagnum']='0';
                    $jsonArr['msg']='添加失败';
                }
            
            }
        }else{
            $strthree="INSERT INTO shouhuoinfo(userid,shouhuoren,shouhuophone,shouhuodiqu,shouhuojiedao,moren) VALUES('$userid','$shouhuoren','$shouhuophone','$shouhuodiqu','$shouhuojiedao','true')";
            mysql_query($strthree);
            //获取受影响的行数
            $countfour = mysql_affected_rows();
            if($countfour>0){
                $jsonArr['flagnum']='1';
                $jsonArr['msg']='添加成功,由于您没有更多地址,无论您是否将其设置为默认地址,我们都已将其设置为默认地址';
            }else{
                $jsonArr['flagnum']='1';
                $jsonArr['msg']='添加失败,请重新添加';
            }
        }

     }else{
        $jsonArr['flagnum']='0';
        $jsonArr['msg']='该地址已经存在哦,请不到重复添加';
     }

     echo json_encode($jsonArr);



?>