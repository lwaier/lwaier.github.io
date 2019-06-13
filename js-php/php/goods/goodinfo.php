<?php
    @require_once('../config.php');
    $goodsId=$_GET['goodsId'];

    $str="SELECT * from goodinfo WHERE goodsid='$goodsId' ";

    $resouce = mysql_query($str);

    $jsonArr=array();
    $chushi=array();
    
    while($res=mysql_fetch_array($resouce)){
        $List = array();
        $List['leibie']=$res['leibie'];
        $List['leibieid']=$res['id'];
        $chushi[]=$List;
    }
    $jsonArr['leibie']=$chushi;
    
    $strtwo="SELECT * from goodslist WHERE id='$goodsId' ";

    //此处应该查找所有的信息 包括goodsbrandid 后期点击跳转到对应的店铺的
    //此处需要重新设计数据表,后期再优化!!
    $resoucetwo = mysql_query($strtwo);

    $chushitwo=array();

    $brandinfo=mysql_fetch_array($resoucetwo);

    //将good的价格和商品名输出
    $goodjiage = array();
    $goodjiage['goodsprivce']=$brandinfo['goodsprivce'];
    $goodjiage['goodsyuanjia']=$brandinfo['goodsyuanjia'];
    $goodjiage['goodsjieshao']=$brandinfo['goodsjieshao'];
    $goodjiage['goodsname']=$brandinfo['goodsname'];

    //将good的所属商家id和商家名输出
    $chushitwo['brandname']=$brandinfo['goodsbrand'];
    $chushitwo['brandid']=$brandinfo['goodsbrandid'];
    $selectyu=$brandinfo['goodsbrandid'];
    
    

    //查找到brand的图片和活动名
    $strthree="SELECT * from brandinfo WHERE id='$selectyu' ";

    $resoucethree = mysql_query($strthree);
    $brandinfo=mysql_fetch_array($resoucethree);

    $chushitwo['brandicon']=$brandinfo['brandnowdatebadimg'];
    $chushitwo['brandadname']=$brandinfo['brandadname'];
    $chushitwo['acitivetime']=$brandinfo['brandnowdatefutureactive'];




    $jsonArr['brandinfo']=$chushitwo;
    $jsonArr['goodjiage']=$goodjiage;

    echo json_encode($jsonArr);


    //输出对应商品应该有的类别 和所属的商家
    
?>