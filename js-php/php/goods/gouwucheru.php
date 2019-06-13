<?php
@require_once('../config.php');

    $userId = $_GET['userId'];
    $goodsId = $_GET['goodsId'];
    $lieBie = $_GET['lieBie'];
    $lieBieId = $_GET['lieBieId'];
    $lieBieTwo = $_GET['lieBieTwo'];
    $lieBieTwoId = $_GET['lieBieTwoId'];
    $goodNum = $_GET['goodNum'];
    $goodName = $_GET['goodName'];
    $goodPrivce = $_GET['goodPrivce'];
    $goodImgGou = $_GET['goodImgGou']; 
    

    //检测是否已存在
    $strone = "SELECT count(*) FROM gouwuche WHERE userid = '$userId' and goodsid = '$goodsId' and liebieid = '$lieBieId' and liebietwoid = '$lieBieTwoId'  and dingdanxianshi = 'true' " ;
    
    $resouce = mysql_query($strone);
    
    $List = mysql_fetch_array($resouce);

    $count = $List[0] ;

    $jsonArr = array();

    if($count>0){
        //更新数量即可,返回前端信息为完成或未完成更新
        //获取原本的数量
        $strfour = "SELECT goodnum FROM gouwuche WHERE userid = '$userId' and goodsid = '$goodsId' and liebieid = '$lieBieId' and liebietwoid = '$lieBieTwoId'";
        $resouce = mysql_query($strfour);
        $List = mysql_fetch_array($resouce);
        $chushinum = $List[0];

        $xinnum = $chushinum + $goodNum ;

        $strtwo = "UPDATE gouwuche set goodnum='$xinnum' WHERE userid = '$userId' and goodsid = '$goodsId' and liebieid = '$lieBieId' and liebietwoid = '$lieBieTwoId'";
        
        mysql_query($strtwo);

        //获取受影响的行数
        $counttwo = mysql_affected_rows();

        if($counttwo>0){
            $jsonArr['flagnum']='2';
            $jsonArr['msg']='更新商品成功';
            $jsonArr['startnum']=$chushinum;
            $jsonArr['addnum']=$goodNum;
            $jsonArr['xinnum']=$xinnum;
            $jsonArr['goodname']=$goodName;
            $jsonArr['lieBie']=$lieBie;
            $jsonArr['lieBieTwo']=$lieBieTwo;

           
        }else{
            $jsonArr['flagnum']='0';
            $jsonArr['msg']='更新商品失败,请刷新后重新添加';
        }

        
    }else{
        
        //新增即可,返回前端信息为完成或未完成新增
        $strthree="INSERT INTO gouwuche(userid,goodsid,liebie,liebieid,liebietwo,liebietwoid,goodnum,goodname,goodprivce,goodimg,dingdanxianshi) VALUES('$userId','$goodsId','$lieBie','$lieBieId','$lieBieTwo','$lieBieTwoId','$goodNum','$goodName','$goodPrivce','$goodImgGou','true')";
        
        mysql_query($strthree);
        //获取受影响的行数
        $counthree = mysql_affected_rows();

        if($counthree>0){
            $jsonArr['flagnum']='1';
            $jsonArr['msg']='新增商品成功';
            $jsonArr['addnum']=$goodNum;
            $jsonArr['goodname']=$goodName;
            $jsonArr['lieBie']=$lieBie;
            $jsonArr['lieBieTwo']=$lieBieTwo;
            
            
        }else{
            $jsonArr['flagnum']='0';
            $jsonArr['msg']='新增商品失败,请刷新后重新添加';
        }
    
    }


    echo json_encode($jsonArr); 
?>