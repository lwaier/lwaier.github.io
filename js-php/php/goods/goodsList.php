<?php
    @require_once('../config.php');
    $ziDuan = $_GET['ziDuan'];
    $paXuFangShi = $_GET['paXuFangShi'];
    $pageIndexNum = $_GET['pageIndexNum'];
    $dataEveryPage =$_GET['dataEveryPage'];
    $goodsKey=$_GET['goodsKey'];
    $goodsYiju=$_GET['goodsYiju'];
    //此处可以加一个加载依据 是按照名称加载 还是按照类型加载
    $num=($pageIndexNum-1)*$dataEveryPage;

    $str="SELECT * from goodslist WHERE $goodsYiju like '$goodsKey' order by $ziDuan $paXuFangShi limit $num , $dataEveryPage ";
  
    $resouce = mysql_query($str);

    $jsonArr=array();

    while($res=mysql_fetch_array($resouce)){
        $List = array();
        $List['id']=$res['id'];
        $List['goodsname']=$res['goodsname'];
        $List['goodsprivce']=$res['goodsprivce'];
        $List['goodstype']=$res['goodstype'];
        $List['goodsjieshao']=$res['goodsjieshao'];
        $List['goodstese']=$res['goodstese'];
        $List['goodsbrand']=$res['goodsbrand'];
        $List['goodsjifen']=$res['goodsjifen'];
        $List['goodsimg']=$res['goodsimg'];
        $List['goodsyuanjia']=$res['goodsyuanjia'];
        $jsonArr[]=$List;
    }

    echo json_encode($jsonArr);

?>