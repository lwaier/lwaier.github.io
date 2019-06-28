-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- 主机： 10.20.118.180:3306
-- 生成日期： 2019-06-28 09:05:01
-- 服务器版本： 5.7.17-baidu-rds-3.0.0.1-log
-- PHP 版本： 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `b_5xpagsrj2crh6a`
--

-- --------------------------------------------------------

--
-- 表的结构 `brandinfo`
--

CREATE TABLE `brandinfo` (
  `id` int(11) NOT NULL,
  `brandname` varchar(255) DEFAULT NULL,
  `brandtype` varchar(255) DEFAULT NULL,
  `brandad` varchar(255) DEFAULT NULL,
  `brandadimg` varchar(255) DEFAULT NULL,
  `brandnowdatead` varchar(255) DEFAULT NULL,
  `brandadname` varchar(255) DEFAULT NULL,
  `brandnowdatefutureactive` varchar(255) DEFAULT NULL,
  `brandnowdatebottomad` varchar(255) DEFAULT NULL,
  `brandnowdatebadimg` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `brandinfo`
--

INSERT INTO `brandinfo` (`id`, `brandname`, `brandtype`, `brandad`, `brandadimg`, `brandnowdatead`, `brandadname`, `brandnowdatefutureactive`, `brandnowdatebottomad`, `brandnowdatebadimg`) VALUES
(1, '奔仔童鞋', '鞋子', 'true', 'banner1.jpg', NULL, '为宝贝买鞋子不需要促销哦 我们努力为天下的母亲争取到了最低的价格哦', 'june 15 2019 12:59:00', NULL, NULL),
(2, '佰可衣', '女装', 'true', 'banner2.png', NULL, '男朋友给女朋友买衣服买一送一', 'june 7 2019  10:59:00', NULL, NULL),
(3, '花花公子', '男装', 'true', 'banner3.jpg', 'true', '花花公子59元2件', 'june 3 2019 12:59:00', NULL, NULL),
(4, '烟花烫', '女装', NULL, 'nowad1.jpg', 'true', '满199元减100元', 'june 10 2019 12:59:00', NULL, NULL),
(5, 'bobdoghouse旗舰店', '鞋子', NULL, 'nowad3.jpg', 'true', '1折起', 'june 15 2019 12:59:00', NULL, NULL),
(6, '珂卡芙', '鞋子', NULL, 'nowad2.jpg', 'true', '1折起', 'june 20 2019 12:59:00', NULL, NULL),
(7, '宝贝帝童', '童装', NULL, NULL, NULL, '童装好好看啊 不需要促销哦', 'june 21 2019 12:59:00', 'true', 'nowbottom1.png'),
(8, '新威师康威', '女装', NULL, NULL, NULL, '买三送一 大牌甩卖', 'june 10 2019 23:59:00', 'true', 'nowbottom2.png'),
(9, '浪莎服饰', '女装', NULL, NULL, NULL, '买二送一 最新潮流', 'june 12 2019 23:59:00', 'true', 'nowbottom3.png'),
(10, '韩芙蓉', '女装', NULL, NULL, NULL, '8折起 你的美我们承包了', 'june 1 2019 23:59:00', 'true', 'nowbottom4.png'),
(11, '唯铭德', '数码电器', NULL, NULL, NULL, '9.5折 品质数码', 'june 2 2019 23:59:00', 'true', 'nowbottom5.png'),
(12, '祺杰仕', '男装', NULL, NULL, NULL, NULL, 'june 3 2019 12:59:00', 'true', 'nowbottom6.png'),
(13, '晨光文具', '文体', NULL, NULL, NULL, NULL, 'june 4 2019 8:59:00', 'true', 'nowbottom7.png'),
(14, '汉古海稻', '保健', NULL, NULL, NULL, NULL, 'june 5 2019  10:59:00', 'true', 'nowbottom8.png'),
(15, '淘金服饰专营店', '男装', NULL, NULL, NULL, '59元三件任选', 'june 5 2019  10:59:00', NULL, 'goodsbrand1.png'),
(16, '爱婴堡母婴用品小店', '母婴', NULL, '', NULL, '为孩子,不省促销钱!!!', 'june 10 2019  10:59:00', NULL, 'goodsbrand2.png'),
(17, '乔丹悠悠专营店', '文体', NULL, NULL, NULL, '满99减10,满199减20', 'june 5 2019  13:59:00', NULL, 'goodsbrand3.png');

-- --------------------------------------------------------

--
-- 表的结构 `goodimg`
--

CREATE TABLE `goodimg` (
  `id` int(11) NOT NULL,
  `goodimg` varchar(255) DEFAULT NULL,
  `goodsid` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goodimg`
--

INSERT INTO `goodimg` (`id`, `goodimg`, `goodsid`) VALUES
(1, 'goodimg1.jpg', '5'),
(2, 'goodimg2.jpg', '5'),
(3, 'goodimg3.jpg', '5'),
(4, 'goodimg4.jpg', '5'),
(5, 'goodimg5.jpg', '5'),
(7, 'goodimg6.jpg', '1'),
(8, 'goodimg7.jpg', '1'),
(9, 'goodimg8.jpg', '1'),
(10, 'goodimg9.jpg', '1'),
(11, 'goodimg10.jpg', '1'),
(25, 'goodimg15.jpg', '2'),
(24, 'goodimg14.jpg', '2'),
(23, 'goodimg13.jpg', '2'),
(22, 'goodimg12.jpg', '2'),
(21, 'goodimg11.jpg', '2');

-- --------------------------------------------------------

--
-- 表的结构 `goodinfo`
--

CREATE TABLE `goodinfo` (
  `id` int(11) NOT NULL,
  `leibie` varchar(255) DEFAULT NULL,
  `goodsid` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goodinfo`
--

INSERT INTO `goodinfo` (`id`, `leibie`, `goodsid`) VALUES
(1, '白图ITS黑色', '5'),
(2, '白图ITS红色', '5'),
(3, '白图ITS蓝色', '5'),
(4, '黑图ITS白色', '5'),
(5, '黑图ITS灰色', '5'),
(6, '宝贝红', '1'),
(7, '宝贝青', '1'),
(8, '宝贝粉', '1'),
(9, '白色/苔藓绿', '2'),
(10, '白色/黑色', '2'),
(11, '白色/新乔丹红', '2'),
(12, '黑色/白色', '2'),
(13, '白色/伽马蓝', '2'),
(14, NULL, NULL);

-- --------------------------------------------------------

--
-- 表的结构 `goodinfotwo`
--

CREATE TABLE `goodinfotwo` (
  `id` int(255) NOT NULL,
  `liebietwo` varchar(255) DEFAULT NULL,
  `goodsid` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goodinfotwo`
--

INSERT INTO `goodinfotwo` (`id`, `liebietwo`, `goodsid`) VALUES
(1, 'M', '5'),
(2, 'L', '5'),
(3, 'XL', '5'),
(4, '2XL', '5'),
(5, '3XL', '5'),
(6, '4XL', '5'),
(7, '5XL', '5'),
(8, '41', '2'),
(9, '41.5', '2'),
(10, '42', '2'),
(11, '42.5', '2'),
(12, '43', '2'),
(13, '43.5', '2'),
(14, '44', '2'),
(15, '44.5', '2'),
(16, '45', '2');

-- --------------------------------------------------------

--
-- 表的结构 `goodslist`
--

CREATE TABLE `goodslist` (
  `id` int(11) NOT NULL,
  `goodsname` varchar(255) DEFAULT NULL,
  `goodsprivce` double(255,2) DEFAULT NULL,
  `goodstype` varchar(255) DEFAULT NULL,
  `goodsjieshao` varchar(255) DEFAULT NULL,
  `goodstese` varchar(255) DEFAULT NULL,
  `goodsbrand` varchar(255) DEFAULT NULL,
  `goodsbrandid` varchar(255) DEFAULT NULL,
  `goodsjifen` varchar(255) DEFAULT NULL,
  `goodsimg` varchar(255) DEFAULT NULL,
  `goodsyuanjia` double(255,2) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `goodslist`
--

INSERT INTO `goodslist` (`id`, `goodsname`, `goodsprivce`, `goodstype`, `goodsjieshao`, `goodstese`, `goodsbrand`, `goodsbrandid`, `goodsjifen`, `goodsimg`, `goodsyuanjia`) VALUES
(1, '法拉利多功能扭扭车', 50.20, '母婴', '法拉利多功能儿童扭扭车1-3岁宝宝滑行车四轮带音乐溜溜玩', '上新', '爱婴堡母婴用品小店', '16', '10', 'good1.jpg', 169.00),
(2, '乔丹男鞋运动鞋休闲鞋', 119.00, '鞋子', '乔丹男鞋板鞋2017冬季新款皮面低帮滑板鞋休闲小白鞋学生', '上新', '乔丹悠悠专营店', '17', '20', 'good2.jpg', 219.00),
(3, '欧诗漫水氧活能礼盒', 299.00, '美妆', '', '上新', '广客隆美妆专营店', NULL, '30', 'good3.jpg', 599.00),
(4, '南极人纯棉纯色枕套', 25.00, '家纺', '', '上新', '南极人苏棉纺小店', NULL, '5', 'good4.jpg', 149.00),
(5, '美英吉普男士短袖T恤', 29.00, '男装', '美英吉普夏季男士纯棉短袖T恤韩版休闲运动半袖体恤衫宽松大', '上新', '淘金服饰专营店', '15', '6', 'good5.jpg', 138.00),
(6, '乔丹夏新款运动男短裤', 69.00, '文体', '', '上新', '乔丹悠悠专营店', NULL, '10', 'good6.jpg', 199.00),
(7, '飞织运动休闲板鞋男', 59.00, '鞋子', '', '上新', '帆汀男鞋小店', NULL, '10', 'good7.jpg', 159.00),
(8, '女U领修身莱卡棉内衣', 39.00, '女装', '', '上新', '乐清舒适内衣小店', NULL, '8', 'good8.jpg', 128.00),
(9, '可爱长颈鹿小猴身高贴', 14.00, '居家', '', '上新', '家饰界家装家具旗舰店', NULL, '2', 'good9.jpg', 29.00),
(10, '依思q中粗跟女凉鞋', 59.00, '鞋子', '', '上新', 'exull/依思Q官方旗舰店', NULL, '10', 'good10.jpg', 399.00),
(11, '美国苹果微弹牛仔长裤', 78.00, '男装', '', '上新', '韩芙蓉小店', NULL, '15', 'good11.jpg', 488.00),
(12, '36色儿童彩色旋转蜡笔', 11.00, '母婴', '', '上新', '优生活母婴生活小店', NULL, '1', 'good12.jpg', 88.00),
(13, '睡衣女士春长袖冰丝夏', 39.00, '女装', '', '上新', '伊瑞丝旗舰店', NULL, '8', 'good13.jpg', 90.00),
(14, '送膜 华为荣耀手机壳', 24.00, '配饰', '', '上新', '机斗士小店', NULL, '2', 'good14.jpg', 49.00),
(15, '时尚千鸟格衬衫两件套', 139.00, '女装', '', '上新', '北极绒服饰专营店', NULL, '25', 'good15.jpg', 669.00),
(16, '优雅蝴蝶结修身连衣裙', 129.00, '女装', '', '上新', '北极绒服饰专营店', NULL, '22', 'good16.jpg', 669.00),
(17, '包头蝴蝶结方头单鞋女', 59.00, '鞋子', '', '上新', '玛丹曼格官方旗舰店', NULL, '59', 'good17.jpg', 299.00),
(18, '小米锅巴90g/份', 8.00, '美食', '', '剩3天', '良品铺子旗舰店', NULL, '8', 'good18.jpg', 30.00),
(19, '免打孔卫生间置物架', 18.00, '居家', '', '上新', '伊瑞丝旗舰店', NULL, '2', 'good19.jpg', 99.00),
(20, 'v领收腰中长款长袖', 159.00, '女装', '', '上新', '北极绒服饰专营店', NULL, '30', 'good20.jpg', 699.00),
(21, '韩版百搭简约斜挎小包', 43.00, '箱包', '', '上新', '首尔花园专营店', NULL, '15', 'good21.jpg', 299.00),
(22, '春夏方头单鞋外穿拖鞋', 69.00, '鞋子', '', '上新', '丽黛娇人小店', NULL, '20', 'good22.jpg', 308.00),
(23, '美国马球夏季男POLO衫', 99.00, '男装', '', '上新', '美国保罗POLO男装专营店', NULL, '30', 'good23.jpg', 599.00),
(24, '松紧腰夏季雪纺连衣裙', 49.00, '女装', '', '上新', '酷伽女装小店', NULL, '10', 'good24.jpg', 399.00),
(25, '翻领短袖印花连衣裙', 199.00, '女装', '', '上新', '北极绒服饰专营店', NULL, '40', 'good25.jpg', 499.00),
(26, '性感一字肩显瘦连体裤', 44.00, '女装', '', '上新', '微密码女装旗舰店', NULL, '8', 'good26.jpg', 199.00),
(27, '小白鞋女休闲板鞋女鞋', 66.00, '鞋子', '', '上新', '玛丹曼格官方旗舰店', NULL, '20', 'good27.jpg', 299.00),
(28, '家用大屏精准体重秤', 30.00, '文体', '', '上新', '悦炫健身专营店', NULL, '10', 'good28.jpg', 88.00),
(29, '男士V领舒适亚麻套装', 79.00, '男装', '', '上新', '三个耳朵潮男专营店', NULL, '20', 'good29.jpg', 398.00);

-- --------------------------------------------------------

--
-- 表的结构 `gouwuche`
--

CREATE TABLE `gouwuche` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `goodsid` int(11) DEFAULT NULL,
  `liebie` varchar(255) DEFAULT NULL,
  `liebieid` int(11) DEFAULT NULL,
  `liebietwo` varchar(255) DEFAULT NULL,
  `liebietwoid` int(11) DEFAULT NULL,
  `goodnum` int(11) DEFAULT NULL,
  `goodname` varchar(255) DEFAULT NULL,
  `goodprivce` double DEFAULT NULL,
  `goodimg` varchar(255) DEFAULT NULL,
  `dingdanxianshi` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `gouwuche`
--

INSERT INTO `gouwuche` (`id`, `userid`, `goodsid`, `liebie`, `liebieid`, `liebietwo`, `liebietwoid`, `goodnum`, `goodname`, `goodprivce`, `goodimg`, `dingdanxianshi`) VALUES
(104, 23, 2, '白色/黑色', 10, '41', 8, 7, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'true'),
(105, 24, 2, '白色/黑色', 10, '41', 8, 1, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'true'),
(101, 25, 2, '白色/伽马蓝', 13, '43.5', 13, 1, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'doing'),
(98, 25, 1, '宝贝红', 6, '', 0, 3, '法拉利多功能扭扭车', 50.2, 'goodimg6.jpg', 'doing'),
(99, 25, 2, '白色/伽马蓝', 13, '41', 8, 1, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'doing'),
(103, 23, 2, '白色/苔藓绿', 9, '41', 8, 4, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'true'),
(96, 23, 5, '白图ITS黑色', 1, 'M', 1, 1, '美英吉普男士短袖T恤', 29, 'goodimg1.jpg', 'doing'),
(106, 23, 2, '白色/新乔丹红', 11, '44.5', 15, 7, '乔丹男鞋运动鞋休闲鞋', 119, 'goodimg15.jpg', 'true');

-- --------------------------------------------------------

--
-- 表的结构 `shouhuoinfo`
--

CREATE TABLE `shouhuoinfo` (
  `id` int(11) NOT NULL,
  `userid` int(11) DEFAULT NULL,
  `shouhuoren` varchar(255) DEFAULT NULL,
  `shouhuophone` varchar(255) DEFAULT NULL,
  `shouhuodiqu` varchar(255) DEFAULT NULL,
  `shouhuojiedao` varchar(255) DEFAULT NULL,
  `moren` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `shouhuoinfo`
--

INSERT INTO `shouhuoinfo` (`id`, `userid`, `shouhuoren`, `shouhuophone`, `shouhuodiqu`, `shouhuojiedao`, `moren`) VALUES
(42, 25, '搜索', '14517020089', '甘肃&nbsp;&nbsp;陇南&nbsp;&nbsp;宕昌', '对对对', 'true'),
(41, 25, '单2', '13517020089', '内蒙古&nbsp;&nbsp;赤峰&nbsp;&nbsp;阿鲁旗', '金融港', 'false'),
(39, 24, '13185031290', '13185031290', '甘肃&nbsp;&nbsp;张掖&nbsp;&nbsp;临泽', '二七区二二群', 'true'),
(37, 24, '单声豪', '13185031290', '江苏&nbsp;&nbsp;南通&nbsp;&nbsp;启东', '131', 'false'),
(38, 24, '李伟', '13185031290', '湖北&nbsp;&nbsp;仙桃&nbsp;&nbsp;仙桃', '3111', 'false'),
(40, 25, '单', '13517020089', '天津&nbsp;&nbsp;北辰&nbsp;&nbsp;', '金融港', 'false');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `usertel` varchar(255) DEFAULT NULL,
  `usermail` varchar(255) DEFAULT NULL,
  `usernicheng` varchar(255) DEFAULT NULL,
  `userpwd` varchar(255) DEFAULT NULL,
  `usersex` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `username`, `usertel`, `usermail`, `usernicheng`, `userpwd`, `usersex`) VALUES
(25, '13517020089', '13517020089', NULL, '啊啊啊', 'a123456', NULL),
(24, '13185031291', '13185031291', NULL, '我是单声豪', '123456', NULL),
(23, '13185031290', '13185031290', NULL, '我是大雷的学生', '123456', NULL);

--
-- 转储表的索引
--

--
-- 表的索引 `brandinfo`
--
ALTER TABLE `brandinfo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goodimg`
--
ALTER TABLE `goodimg`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goodinfo`
--
ALTER TABLE `goodinfo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goodinfotwo`
--
ALTER TABLE `goodinfotwo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `goodslist`
--
ALTER TABLE `goodslist`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `gouwuche`
--
ALTER TABLE `gouwuche`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `shouhuoinfo`
--
ALTER TABLE `shouhuoinfo`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `brandinfo`
--
ALTER TABLE `brandinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 使用表AUTO_INCREMENT `goodimg`
--
ALTER TABLE `goodimg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- 使用表AUTO_INCREMENT `goodinfo`
--
ALTER TABLE `goodinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- 使用表AUTO_INCREMENT `goodinfotwo`
--
ALTER TABLE `goodinfotwo`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- 使用表AUTO_INCREMENT `goodslist`
--
ALTER TABLE `goodslist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- 使用表AUTO_INCREMENT `gouwuche`
--
ALTER TABLE `gouwuche`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- 使用表AUTO_INCREMENT `shouhuoinfo`
--
ALTER TABLE `shouhuoinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
