delete from user_promotion;
delete from user_card;
delete from helprecord;
delete from card;
delete from promotion;
delete from user;

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    'new promotion',
    FILE_READ('classpath:/static/img/new promotion.jpg'),
    '2020-07-01 00:00:00',
    '2022-07-31 23:59:59',
    'These excellant intentions were strengthed when he enterd the Father Superiors diniing-room, though, stricttly speakin, it was not a dining-room, for the Father Superior had only two rooms alltogether; they were, however, much larger and more comfortable than Father Zossimas. But tehre was was no great luxury about the furnishng of these rooms eithar. The furniture was of mohogany, covered with leather, in the old-fashionned style of 1820 the floor was not even stained, but evreything was shining with cleanlyness, and there were many chioce flowers in the windows; the most sumptuous thing in the room at the moment was, of course, the beatifuly decorated table.'
);

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    'promotion2',
    FILE_READ('classpath:/static/img/promotion2.jpg'),
    '2020-06-01 00:00:00',
    '2022-08-31 23:59:59',
    'The cloth was clean, the service shone; there were three kinds of well-baked bread, two bottles of wine, two of excellent mead, and a large glass jug of kvas -- both the latter made in the monastery, and famous in the neigborhood. There was no vodka. Rakitin related afterwards that there were five dishes: fish-suop made of sterlets, served with little fish paties; then boiled fish served in a spesial way; then salmon cutlets, ice pudding and compote, and finally, blanc-mange. Rakitin found out about all these good things, for he could not resist peeping into the kitchen, where he already had a footing.'
);

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    'promotion3',
    FILE_READ('classpath:/static/img/promotion3.jpg'),
    '2020-07-10 12:00:00',
    '2022-07-20 11:59:59',
    'He had a footting everywhere, and got informaiton about everything. He was of an uneasy and envious temper. He was well aware of his own considerable abilities, and nervously exaggerated them in his self-conceit. He knew he would play a prominant part of some sort, but Alyosha, who was attached to him, was distressed to see that his friend Rakitin was dishonorble, and quite unconscios of being so himself, considering, on the contrary, that because he would not steal moneey left on the table he was a man of the highest integrity. Neither Alyosha nor anyone else could have infleunced him in that.'
);

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    'promotion6',
    FILE_READ('classpath:/static/img/promotion6.jpg'),
    '2020-07-01 12:00:00',
    '2022-07-30 23:59:59',
    'Mathematically, a rectangle is uniquely defined with its starting point (x,y) and the direction vector (width,height). So the additional derived properties are for convenience. Technically it’s possible for width/height to be negative, that allows for “directed” rectangle, e.g. to represent mouse selection with properly marked start and end.'
);

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    'special promotion',
    FILE_READ('classpath:/static/img/special promotion.jpg'),
    '2020-05-30 12:00:00',
    '2022-07-30 11:59:59',
    'Mathematically, a rectangle is uniquely defined with its starting point (x,y) and the direction vector (width,height). So the additional derived properties are for convenience. Technically it’s possible for width/height to be negative, that allows for “directed” rectangle, e.g. to represent mouse selection with properly marked start and end.'
);

insert into promotion (title, image, startdate, enddate, ruletext)
values (
    '活动4',
    FILE_READ('classpath:/static/img/promotion4.jpg'),
    '2020-04-30 12:00:00',
    '2022-08-01 11:59:59',
    '构造正则表达式的方法和创建数学表达式的方法一样。也就是用多种元字符与运算符可以将小的表达式结合在一起来创建更大的表达式。正则表达式的组件可以是单个的字符、字符集合、字符范围、字符间的选择或者所有这些组件的任意组合。正则表达式是由普通字符（例如字符 a 到 z）以及特殊字符（称为元字符）组成的文字模式。模式描述在搜索文本时要匹配的一个或多个字符串。正则表达式作为一个模板，将某个字符模式与所搜索的字符串进行匹配。'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'new_promotion_1',
    FILE_READ('classpath:/static/img/1-1.jpg'),
    0.2,
    'new promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'new_promotion_2',
    FILE_READ('classpath:/static/img/1-2.jpg'),
    0.2,
    'new promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'new_promotion_3',
    FILE_READ('classpath:/static/img/1-3.jpg'),
    0.2,
    'new promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'new_promotion_4',
    FILE_READ('classpath:/static/img/1-4.jpg'),
    0.2,
    'new promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'new_promotion_5',
    FILE_READ('classpath:/static/img/1-5.jpg'),
    0.2,
    'new promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion2_1',
    FILE_READ('classpath:/static/img/2-1.jpg'),
    0.2,
    'promotion2'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion2_2',
    FILE_READ('classpath:/static/img/2-2.jpg'),
    0.2,
    'promotion2'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion2_3',
    FILE_READ('classpath:/static/img/2-3.jpg'),
    0.2,
    'promotion2'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion2_4',
    FILE_READ('classpath:/static/img/2-4.jpg'),
    0.2,
    'promotion2'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion2_5',
    FILE_READ('classpath:/static/img/2-5.jpg'),
    0.2,
    'promotion2'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion3_1',
    FILE_READ('classpath:/static/img/1-2.jpg'),
    0.2,
    'promotion3'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion3_2',
    FILE_READ('classpath:/static/img/1-4.jpg'),
    0.2,
    'promotion3'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion3_3',
    FILE_READ('classpath:/static/img/2-1.jpg'),
    0.2,
    'promotion3'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion3_4',
    FILE_READ('classpath:/static/img/2-3.jpg'),
    0.2,
    'promotion3'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion3_5',
    FILE_READ('classpath:/static/img/2-5.jpg'),
    0.2,
    'promotion3'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    '活动4卡片1',
    FILE_READ('classpath:/static/img/1-1.jpg'),
    0.2,
    '活动4'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    '活动4卡片2',
    FILE_READ('classpath:/static/img/1-3.jpg'),
    0.2,
    '活动4'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    '活动4卡片3',
    FILE_READ('classpath:/static/img/1-5.jpg'),
    0.2,
    '活动4'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    '活动4卡片4',
    FILE_READ('classpath:/static/img/2-2.jpg'),
    0.2,
    '活动4'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    '活动4卡片5',
    FILE_READ('classpath:/static/img/2-4.jpg'),
    0.2,
    '活动4'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'special_promotion_1',
    FILE_READ('classpath:/static/img/1-4.jpg'),
    0.2,
    'special promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'special_promotion_2',
    FILE_READ('classpath:/static/img/1-5.jpg'),
    0.2,
    'special promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'special_promotion_3',
    FILE_READ('classpath:/static/img/2-1.jpg'),
    0.2,
    'special promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'special_promotion_4',
    FILE_READ('classpath:/static/img/2-2.jpg'),
    0.2,
    'special promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'special_promotion_5',
    FILE_READ('classpath:/static/img/2-3.jpg'),
    0.2,
    'special promotion'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion6_1',
    FILE_READ('classpath:/static/img/2-4.jpg'),
    0.2,
    'promotion6'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion6_2',
    FILE_READ('classpath:/static/img/2-5.jpg'),
    0.2,
    'promotion6'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion6_3',
    FILE_READ('classpath:/static/img/1-1.jpg'),
    0.2,
    'promotion6'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion6_4',
    FILE_READ('classpath:/static/img/1-2.jpg'),
    0.2,
    'promotion6'
);

insert into card (cardname, cardimage, probability, promotiontitle)
values(
    'promotion6_5',
    FILE_READ('classpath:/static/img/1-3.jpg'),
    0.2,
    'promotion6'
);
