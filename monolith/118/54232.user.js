﻿// ==UserScript==
// @name           eRepublik CN
// @namespace      eRepublik CN
// @description    eRepublik CN edited version by blanco
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {

"Shop": "商城",
"Press": "媒体",
"Contact": "联系我们",
"Jobs": "工作机会",
"Terms of Service": "服务条款",
"Privacy": "隐私条款",
"eRepublik Laws": "游戏规则",
"Affiliates": "合作伙伴",
"Extra storage": "超大存储空间",
"Wellness Box": "体力盒子",
"Guest": "访客",
"Day": "第",
"of the New World": "天（新世界）",
"Take the": " 只需",
"tour and find out why it's such a great game" : " 来看看为什么说这是一款伟大的游戏",
"4 step" : " 四步",
"It's" : " 绝对",
"Please type in your password" : "请输入您的密码",
"Wrong password" : "密码错误",
"login" : "登录",
"Complete the catpcha challenge:" : "请输入验证码：",
"Type the two words" : "请输入上图显示的两个单词：",
"Incorrect. Try again." : "不正确，请重试。",
"The challenge solution was incorrect." : "您输入的验证码不正确。",

"Buy Wellness Box" : "购买体力盒子",

"Basic damage" : "基本破坏力",





"for 10 shouts/day and more" : " 获得每天10次以上发言机会",




"no active battles" : "无激活战役",
"Buy extra storage" : "购买更多空间",
"Buy wellness" : "购买体力",
"days" : "日",
"months" : "月",
"years" : "年",
"online" : "在线",
"Check your unlocked features" : "查看您的已激活功能",
"No shouts posted by this Citizen yet" : "该公民尚未发布任何言论",
"Fights" : "参与战争",
"Total damage:" : "综合破坏力:",
"Damage" : "破坏力",
"See all donations" : "查看所有捐赠",
"Show all donations" : "显示所有捐赠",
"Price with taxes" : "含税价格",
"Show candidate list" : "展示侯选人名单",
"Show candidates list" : "显示侯选人名单",
"See candidate list" : "查看侯选人名单",
"No candidate proposed" : "无侯选人被提名",
"Candidate" : "侯选人",
"candidates" : "全部侯选人",
"be a candidate for congress" : "成为国会议员侯选人",
"You haven't worked today." : "您今天尚未工作",
"You have not worked today." : "您今天尚未工作",
"Skill" : "技能",
"Apply" : "申请",
"You are already an employee. To get this job please quit your current job." : "您目前已经在一家公司就职. 要接受新工作，请您先辞去当前的工作.",
"Work" : "工作",
"Back to company" : "返回公司",
"Back to army" : "返回军队",
"You haven't trained today" : "您今天尚未训练",
"You have not trained today" : "您今天尚未训练",
"Train" : "训练",
"Training" : "训练点数",
"Train bonus" : "训练奖励",
"Strength gained" : "获得力量",
"Show my offers" : "显示我的报价",
"Post new offer" : "张贴新的报价",
"Exchange rate" : "汇率",
"Job market" : "劳工市场",
"Get Wellness" : "购买体力",
"eRepublik Birthday" : "游戏中的生日",
"Get Extra Storage" : "购买额外空间",
"Show all employees" : "显示所有员工",
"Show active wars" : "显示进行中的战事",
"Basic productivity" : "基本生产力.",
"Total productivity" : "综合生产力.",
"Work Bonus" : "工作奖励",
"more events" : "更多事件",
"National" : "本国事件",
"International" : "国际事件",
"Top rated" : "热门新闻",
"Latest" : "最新发布",
"Shouts" : "公民之声",
"Shout" : "发话",
"Shout something:" : "说些什么:",
"Official" : "官方",
"Everyone" : "所有人",
"Daily salary" : "日薪",
"Last presence" : "最后上线",
"Salary / day" : "薪水 / 日",
"Never worked" : "从未工作",
"Today" : "今天",
"Yesterday" : "昨天",
"Minimum country wage :" : "国家最低工资保障:",
"Company page" : "公司页面",
"Search citizen" : "搜索公民",
"Rec exchange rate" : "参考汇率",
"Sell" : "出售",
"Industry" : "产业",
"Create new company" : "创建新的公司",
"Create company" : "创建公司",
"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : "《电子共和国》中的黄金为游戏中的虚拟货币，仅用于购买《电子共和国》中的附加功能。",
"Select amount" : "选择数量",
"Go to eRepublik" : "前往《电子共和国》",
"Citizen fee" : "公民费",
"Gross domestic product (GDP)" : "国民生产总值 (GDP)",
"Monthly exports" : "月出口量",
"Monthly imports" : "月进口量",
"Inflation" : "通货膨胀",
"Country President" : "国家元首",
"General" : "总",
"Send message" : "发送消息",
"Add as a friend" : "加为好友",
"Remove friend" : "删除好友",
"Offer a gift" : "赠送礼物",
"Pending" : "未确定",
"Accepted" : "已通过",
"Rejected" : "己否决",
"ACCEPTED" : "己通过",
"REJECTED" : "己否决",
"You are not a president or a congress member in this country." : "您不是该国家的总统或国会议员.",
"Law proposals" : "法律提案",
"War status" : "战况",
"Active wars" : "进行中的战事",
"Ended wars" : "已结束的战事",
"Countries involved" : "参与国家",
"All countries" : "所有国家",
"Company market" : "公司转让",
"Buy" : "购买",
"Apply" : "申请",
"Show all members" : "显示所有成员",
"Show results" : "显示结果",
"Final Results" : "最终结果",
"Member of" : "成员",
"No. of votes" : "获得选票",
"Total votes:" : "总投票数：",
"You cannot work today because the company does not have enough raw materials for products. We have just sent an alert to the general manager about this issue." : "因该公司的生产所需的原材料不足,导致无法工作.我们已就此事向总经理发出警告信息",
"Become a citizen" : "注册账号",
"It's 100% free and only takes a minute or two" : "这是100%免费和只需要一两分钟",
"100% free" : "100%免费",
"and" : " ",
"only takes a minute or two" : "每天只需要一两分钟",
"Enter the new world" : "进入游戏",
"Citizen name" : "公民名称",
"Citizen Name" : "公民名称",
"Investigation Day" : "调查日",
"4-30 characters" : "4-30 字符",
"Password" : "密码",
"Retype" : "确认密码",
"Retype password" : "重新输入密码",
"Location" : "所在位置",
"Email must be valid for registration, so do not cheat" : "此Email地址用于注册游戏帐号，所以必须真实有效。",
"Birthday" : "生日",
"Gender" : "性别",
"I agree with the" : "我已接受",
"Sign up for the weekly newsletter" : "订阅周刊",
"Please choose your eRepublik citizen name" : "请选择您的《电子共和国》公民名称",
"Minimum number of characters is 6" : "最少6个字符",
"Please type in a password here" : "请输入密码",
"Please retype your password" : "请重新输入您的密码",
"Info" : "信息",
"Congress member candidates" : "国会议员候选人",
"Back" : "返回",
"Party members can apply for congressional candidature each month between the 16th and 23rd." : "党派成员可在每月的16日和23日之间申请成为国会议员候选人",
"Party president should decide the final list each month on the 24th" : "党主席应于每月24日确定最终的候选人名单",
"Each party can propose a maximum number of 3 candidates per region." : "每个党派在每个地区最多只能提出3名国会议员候选人",
"Forgot password?" : "忘记密码?",
"Remember me" : "记住密码",
"Land skill" : "开采技能",
"Manufacturing skill" : "生产技能",
"Constructions skill" : "建筑技能",
"Debate Area" : "争议地区",
"New" : "最新",
"Old" : "过去",
"Value added tax (VAT)" : "销售税(VAT)",
"VAT" : "销售税(VAT)",
"Import Tax" : "进口关税",
"Export Tax" : "出口关税",
"Income Tax" : "所得税",
"The law voting process takes 24 hours." : "法律投票程序将持续24小时",
"Only congress members and country presidents have the right to vote." : "只有国会议员和总统才有资格投票.",
"Show all law proposals" : "显示所有法律提案",
"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "您可以从党派页面加入某一党派，如果您找不到适合您的党派，您也可以自己创建一个党派。成为党派成员可以使您有机会成为国会议员，甚至总统。",
"You do not have a newspaper" : "您尚未开办报刊",
"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : "一份报纸是在《电子共和国》的世界中沟通联络信息的最有效途径。想了解更多相关信息请阅读《电子共和国》百科。创建您自己的报纸。",
"Weapon" : "武器",
"Items" : "道具",
"Money" : "金钱",
"Drag and drop items from your inventory to the donation area" : "从您的仓库拖放道具到捐赠地区",
"Your inventory" : "你的仓库",
"Donation" : "捐赠",
"Minimum Wage" : "最低工资",
"Defense System" : "防御系统",
"President Impeachment" : "弹劾总统",
"New Citizen Fee" : "新的公民费",
"Trading Embargo" : "贸易禁运",
"Issue Money" : "转移资金",
"Mutual Protection Pact" : "共同防御条约",
"Peace Proposal" : "停战协定",
"Declare War" : "宣战",
"Buy Constructions" : "购买设施",
"All donations" : "所有捐赠",
"My Organizations" : "我的组织",
"Conquer" : "占领",
"Secure" : "守住",
"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "为了登录组织帐号，您必须先退出您的公民帐号，然后用您的组织帐号和密码重新登陆。",
"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that we can officially change it to an organization."
: "如果您的公民帐号代表了一个在《电子共和国》beta版本中创建的组织(SO)，请通过使用联系表格（问题种类：其它）发送给我们相关的情况，以便我们能够正式地将其更改为组织帐号。",
"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned."  : "2008年12月15日以后，所有未转为组织帐号的的SO帐号将被视为非法帐号并予以封禁。",
"After 5 days the alerts are automatically deleted" : "5天后系统提示将被自动删除",
"Select All" : "全选",
"change your location" : "更改你的位置",
"train" : "训练",
"send initiations to your friends to join eRepublik" : "邀请你的朋友加入《电子共和国》",
"Name" : "名字",
"Country" : "国家",
"Experience points" : "经验值",
"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization",
"There are no offers on the marketplace for this industry" : "There are no offers on the marketplace for this industry",
"Minimum skill" : "最低技能",
"Minimum Skill" : "最低技能",
"You do not have the required skill for this position" : "您没有这职位所需的技能",
"Country - Society" : "国家 - 社会",
"There are no discovered resources in this region yet" : "那个地区还没有发现资源",
"You can get wellness from: " : "您可以获得体力来自..: ",
"Defense system" : "防御系统",
"Select a party" : "选择党派",
"to show it's Candidates" : "to show it's Candidates",
"Permanently banned" : "永久性黑名单",
"There are no active battles in this war" : "在这场战争里,没有进行中的战事",
"You are now an employee of this company" : "您现在是这家公司的雇员",
"Do you agree?" : "你同意吗?",
"One more thing..." : "再一件事 ...",
"Complete the captcha challenge in order to prove you are human" : "请输入验证码,防止自动注册.",
"War > Battlefield" : "战争 > 战场",
"Weak fight, Private!" : "战绩暗淡, 列兵!",
"Weak fight, Corporal!" : "战绩暗淡, 下士!",
"Weak fight, Sergeant!" : "战绩暗淡, 上士!",
"Weak fight, Lieutenant!" : "战绩暗淡, 中尉!",
"Weak fight, Captain!" : "战绩暗淡, 上尉!",
"Weak fight, Colonel" : "战绩暗淡, 上校!",
"Weak fight, General" : "战绩暗淡, 上将!",
"Weak fight, Field Marshal!" : "战绩暗淡, 元帅!",
"Good fight, Private!" : "战功显赫, 列兵!",
"Good fight, Corporal!" : "战功显赫, 下士!",
"Good fight, Sergeant!" : "战功显赫, 上士!",
"Good fight, Lieutenant!" : "战功显赫, 中尉!",
"Good fight, Captain!" : "战功显赫, 上尉!",
"Good fight, Colonel" : "战功显赫, 上校!",
"Good fight, General" : "战功显赫, 上将!",
"Good fight, Field Marshal!" : "战功显赫, 元帅!",
"Weapon quality" : "武器质量",
"You do not have any active job offers" : "目前没有职位空缺",
"National Rank" : "全国排名",
"Forfeit Points:" : "违规点数",
"Unlock Features" : "激活全部功能",
"Continue" : "继续",
"Experience level" : "经验等级",
"A taste of what you can do in eRepublik" : "《电子共和国》全部功能一览",

"Below are several career paths you can take in eRepublik, roll over each one to learn more or just click continue to enter eRepublik." : "Below are several career paths you can take in eRepublik, roll over each one to learn more or just click continue to enter eRepublik.",
"roll over" : "roll over",
"Hard worker" : "劳动模范",
"economics" : "经济",
"politics" : "政治",
"military" : "军事",
"media" : "媒体",
"manager" : "经理",
"Recruit" : "招募",
"Soldier" : "士兵",
"Super soldier" : "超级大兵",
"Ranked" : "上级",
"soldier" : "士兵",
"Battle hero" : "战斗英雄",
"Resistance" : "抗战",
"leader" : "领袖",
"Resistance" : "抗战",
"hero" : "英雄",
"Resistance hero" : "绿林豪杰",
"Society" : "社会",
"builder" : "建设者",
"Society builder" : "社交巨人",
"Voter" : "选民",
"Party Member" : "党员",
"Parlament candidate" : "议会候选人",
"Congress Member" : "国会议员",
"Party president candidate" : "党主席侯选人",
"Party founder" : "党派创建人",
"President candidate" : "总统侯选人",
"Country<br /> President" : "国家元首",
"Media mogul" : "传媒大亨",
"You have succesfully edited your profile" : "您成功修改个人数据",
"All industries" : "所有产业",
"You will receive 5 Gold for each citizen invited by you that reaches level 6." : "每个您邀请的公民达到Lv6 时,您将获得5枚黄金的奖励.",
"Your name:" : "您的名字:",
"Your friend's email:" : "您朋友的Email地址:",
"Use commas to separate multiple email addresses" : "用逗号分开每个Email地址",
"Add from adress Book" : "从通讯簿加入",
"Send invitation" : "发送邀请",
"Invites sent:" : "邀请已发送：",
"Please type your friend email address" : "请输入您朋友的Email地址",
"Your friendship request has been sent." : "您的添加好友要求已发送.",
"No activity" : "没有活动",
"You can login and start playing. Have fun!" : "你现在可以登录及游玩,HAVE FUN!",
"Click here to login now" : "点击这里登录",
"Remember me" : "记住我",
"Not a citizen yet?" : "还没成为公民?",
"Take the tour" : "游戏预览",
"Join now" : "立即注册",
"It's free" : "免费",
"Login" : "登录",
"My places > Company" : "公司",
"You do not have a job" : "你当前没有工作",
"Find a job or own a company. Having a job will allow you to get a salary each day you go to work (don't worry, in eRepublik it is much more fun and faster to go to work than in real life)." : "寻找工作或自己创建一家公司.您每天工作的时候都会得到薪水(别担心,在《电子共和国》里工作远比现实中轻松愉快.",
"Find a job" : "寻找工作!",
"Own a company" : "购买公司!",
"Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt." : "Having your own company may be a major source of wealth, but first you will need to make sure you have enough money to pay your future employees' salaries so that you don't go bankrupt.",
"Conquest wars" : "征服战争",
"Resistance wars" : "起义战争",
"Lieutenant" : "中尉",
"Captain" : "上尉",
"Colonel" : "上校",
"Field Marshall" : "元帅",
"Field Marshal" : "元帅",
"You do not have the necessary amount of Gold to start a resistance war." : "You do not have the necessary amount of Gold to start a resistance war.",
"Start a Resistance War" : "发动起义战争",
"Please enter a valid amount value with at most 2 decimals." : "请输入一个有效的价值数额至多两位数.",
"The company cannot trade with this country due to a trade embargo decided by Congress." : "The company cannot trade with this country due to a trade embargo decided by Congress.",
"The company offers no products in this market" : "该公司目前未向市场提供任何产品",
"News" : "新闻",
"more news" : "更多新闻",
"Supporting parties" : "支持政党",
"% of votes" : "得票百分比",
"Presidential candidates" : "总统候选人",
"No candidates applied yet" : "尚无候选人申请",
"Badges" : "徽章",
"RSS Feed" : "RSS Feed",
"Debates concerning economic activities." : "Debates concerning economic activities.",
"Sharing opinions concerning social interactions." : "Sharing opinions concerning social interactions.",
"The place for those who are interested in political activities." : "The place for those who are interested in political activities.",
"Keeping in touch with other citizen regarding the eRepublik warfare." : "Keeping in touch with other citizen regarding the eRepublik warfare",
"Discussions" : "讨论",
"Help" : "帮助",
"Contracts" : "合同",
"Rules" : "规则",
"Guidelines for a better New World." : "Guidelines for a better New World",
"Suggestions" : "建议",
"Imagination is the only limit for changing the future." : "Imagination is the only limit for changing the future",
"Open letters" : "开启信件",
"Contests" : "Contests",
"Announcements" : "公告",
"Buy or sell companies" : "买卖公司",
"Topics" : "主题",
"Posts" : "Posts",
"Last Message" : "最新讯息",
"The New World" : "新的世界",
"Join party" : "加入党派",
"Congratulations, you are now a party member! " : "恭喜!你现在是党员了!",
"Create newspaper" : "创建报纸",
"Requirements" : "要求",
"Cost" : "费用",
"Newspaper details" : "报纸信息",
"Newspaper name" : "报纸名称",
"Newspaper Avatar" : "报纸标志",
"only JPG files allowed" : "只允许JPG格式",
" Create " : "创建",
"Your account" : "你的账户",
"Organizations created by you:" : "您创建的组织:",
"You have not created any organization yet." : "你尚未创建任何组织.",
"Create organization" : "创建组织",
"Organization details" : "组织信息",
"Organization name" : "组织名称",
"Organization logo" : "组织标志",
"Your email address:" : " 您的Email地址:",
"eRepublik region" : "选择地区",
"Complete the challenge:" : "请输入验证码:",
"Register" : "注册",
"Countries" : "国家",
"Companies" : "公司",
"Parties" : "党派",
"Newspapers" : "报纸",
"Sales" : "销售",
"Subscribers" : "订阅读者",
"Region" : "地区",
"All regions" : "所有地区",
"Sort by" : "排序",
"No. of Employees" : "雇员人数",
"Top Citizens" : "公民排行榜",
"Top Companies" : "企业排行榜",
"Top Countries" : "国家排行榜",
"Top countries in eRepublik" : "《电子共和国》国家排行榜",
"top countries in eRepublik" : "《电子共和国》国家排行榜",
"What's happening in eRepublik?" : "《电子共和国》每日要闻",
"more discussions" : "更多讨论",
"Top Parties" : "党派列表",
"Top News" : "热门新闻",
"( Average Experience )" : "( 平均经验 )",
"Population number" : "人口数量",
"Unemployment rate" : "失业率",
"Exports" : "出口",
"Imports" : "进口",
"No. of companies" : "No. of companies",
"No. of newspapers" : "No. of newspapers",
"GDP" : "国民产值",
"No citizen found that match your criteria." : "没有找到符合此标准的公民",
"Select industry" : "选择产业",
"Top rated news" : "最热门消息",
"Latest news" : "最新消息",
"Latest events" : "最新事件",
"Skip" : "忽略",
"eRepublik Shop" : "《电子共和国》商城",
"Wiki" : "维基百科",
"Blog" : "官方博客",
"Make changes" : "进行更改",
"Company for sale" : "出售公司",
"Fire" : "解雇",
"Finances" : "财政",
"Upgrade Quality level" : "提升质量等级",
"Buy raw materials" : "购买原材料",
"Donate raw materials" : "捐赠原材料",
"Update" : "升级",
"Remove" : "移除",
"Buy market license" : "购买市场许可证",
"Add a job offer" : "新增职位",
"Edit details" : "编辑详情",
"Sell company" : "出售公司",
"Your offer was removed" : "Your offer was removed",
"Newer" : "上一页",
"Older" : "下一页",
"new comment" : "新的评论",
"Show proposed members of congress" : "显示国会成员提案",
"Winner" : "获胜者",
"One" : "One",
"Reserve Bank of China" : "中国储备银行",
"Reserve Bank" : "储备银行",
"Buy food!" : "购买粮食",
"No food means starvation. Hurry up and buy some." : "没有食物会饿死. 赶紧去买些吃的吧.",
"has conquered this region" : "已占领这地区",
"has secured this region" : "已保卫这地区",
"Tax change: Moving Tickets" : "税率变更:机票",
"Tax change: Food" : "税率变更:食物",
"Tax change: Iron" : "税率变更:钢铁",
"Tax change: Defense System:" : "税率变更:防御系统",
"Tax change: Weapon" : "税率变更:武器",
"Tax change: Gift" : "税率变更:礼品",
"Tax change: Grain" : "税率变更:粮食",
"Proposed by" : "提议来自",
"I have nothing more to say at the moment" : "我暂时没有任何话要说",
"I have something to say" : "我有话要说",
"Show proposed members" : "显示参选国会议员",
"of congress" : "的候选人",
"Resign Candidacy" : "退出议员竞选",
"Edit Presentation" : "编辑竞选演说",
"Presentation" : "竞选演说",
"Edit Presentation" : "编辑竞选演说",
"No presentation" : "尚无竞选演说",

"Citizens" : "公民",
"Anhui" : "安徽",
"Beijing" : "北京",
"Hainan" : "海南",
"Henan" : "河南",
"Inner Mongolia" : "内蒙古",
"Jammu and Kashmir" : "查谟和克什米尔",
"Jiangsu" : "江苏",
"Ningxia" : "宁夏",
"Shandong" : "山东",
"Shanghai" : "上海",
"Tibet" : "西藏",
"Yunnan" : "云南",
"Argentine Northwest" : "阿根廷西北部",
"Cuyo" : "库约",
"Gran Chaco" : "大厦谷",
"Pampas" : "潘帕斯",
"Patagonia" : "巴塔哥尼亚",
"Orissa" : "奥里萨邦",
"Tamil Nadu" : "泰米尔纳德邦",
"Alentejo" : "阿连特茹",
"Algarve" : "阿尔加威",
"Azores" : "亚速尔群岛",
"Centro" : "中部",
"Lisboa" : "里斯本",
"Madeira" : "马德拉",
"Norte" : "波尔图",
"New South Wales" : "新南威尔士",
"Northern Territory" : "北领地",
"Queensland" : "昆士兰",
"Victoria" : "维多利亚",
"Andhra Pradesh" : "安得拉邦",
"Chhattisgarh" : "恰蒂斯加尔邦",
"Chongqing" : "重庆",
"East Siberian Region" : "东西伯利亚",
"Fujian" : "福建",
"Gansu" : "甘肃",
"Guangdong" : "广东",
"Guangxi" : "广西",
"Guizhou" : "贵州",
"Gujarat" : "古吉拉特邦",
"Hubei" : "湖北",
"Hunan" : "湖南",
"Java" : "爪哇",
"Jiangxi" : "江西",
"Kalimantan" : "加里曼丹",
"Karnataka" : "卡纳塔克邦",
"Kerala" : "卡拉拉邦",
"Lesser Sunda Islands" : "小巽它群岛",
"Madhya Pradesh" : "中央邦",
"Maharashtra" : "马哈拉施特拉邦",
"Maluku islands" : "马鲁古群岛",
"North-East India" : "印度东北部",
"Papua" : "巴布亚新几内亚",
"Punjab" : "旁遮普",
"Qinghai" : "青海",
"Rajasthan" : "拉贾斯坦邦",
"Shaanxi" : "陕西",
"Shanxi" : "山西",
"Sichuan" : "四川",
"Sindh" : "信德文",
"South Australia" : "南澳洲",
"Sulawesi" : "苏拉威西",
"Sumatra" : "苏门答腊岛",
"Tasmania" : "塔斯马尼亚",
"West Siberian Region" : "西西伯利亚",
"Western Australia" : "西澳洲",
"Western Cape" : "西开普",
"Xinjiang" : "新疆",
"Zhejiang" : "浙江",
"Banat" : "巴纳特",
"Bassarabia" : "比萨拉比亚",
"Bucovina" : "布科维纳",
"Chisinau" : "基希讷乌",
"Crisana" : "克里沙纳",
"Dobrogea" : "多布罗加",
"Maramures" : "马拉穆列什",
"Moldova" : "摩尔多瓦",
"Muntenia" : "蒙特尼亚",
"Oltenia" : "欧达尼亚",
"Southern Basarabia" : "南比萨拉比亚",
"Transilvania" : "川西凡尼亚",
"Urals Region" : "乌拉尔地区",
"Styria" : "思提瑞亚",
"Balochistan" : "俾路支省",
"Bihar" : "比哈尔邦",
"Esfahan" : "伊斯法罕",
"Fars" : "法尔斯",
"Heilongjiang" : "黑龙江",
"Hormozgan" : "霍尔木兹甘",
"Jharkhand" : "加尔克汉德邦",
"Jilin" : "吉林",
"Kerman Province" : "克尔曼省",
"Liaoning" : "辽宁",
"North India" : "北印度",
"North Region" : "北方地区",
"North-West Frontier Province" : "西北边境省",
"Northwest Region" : "西北地区",
"Razavi Khorasan" : "拉扎维.呼罗珊",
"Semnan" : "塞姆南",
"Sistan and Baluchistan" : "锡斯坦和俾路支斯坦省",
"South Khorasan" : "南呼罗珊",
"Southwest Region" : "西南地区",
"Uttar Pradesh" : "北方邦",
"West Bengal" : "西孟加拉国邦",
"Yazd" : "雅兹德",
"Far Eastern Region" : "远东地区",
"Kaliningrad Region" : "卡里宁格勒州",
"North Caucasus Region" : "北高加索地区",
"Northern Region" : "北部地区",
"Volga-Vyatka Region" : "伏尔加-维亚特经济区",
"Cork and Kerry" : "科克和克里",
"Dublin" : "都柏林",
"South Serbia" : "南塞尔维亚",
"Sumadija" : "舒马迪亚",
"Brčko District" : "布尔奇科",
"Federation of Bosnia and Herze" : "波斯尼亚和黑塞哥维那",
"Singapore City" : "新加坡市",
"Eastern Cape" : "东开普省",
"KwaZulu-Natal" : "夸祖鲁",
"Mesopotamia" : "美索不达米亚",
"Northern Cape" : "北开普省",
"Abruzzo" : "阿布鲁佐",
"Aosta Valley" : "奥斯塔山谷",
"Apulia" : "阿普利亚",
"Basilicata" : "巴西利卡塔",
"Calabria" : "卡拉布里亚",
"Campania" : "坎帕尼亚",
"Emilia-Romagna" : "艾米利亚—罗马涅",
"Lazio" : "拉齐奥",
"Liguria" : "利古里亚",
"Marche" : "马尔凯",
"Molise" : "莫利塞",
"Piedmont" : "皮埃蒙特",
"Salzburg" : "萨尔茨堡",
"Sardinia" : "撒丁岛",
"Sicily" : "西西里岛",
"Trentino-South Tyrol" : "特伦蒂诺-上阿迪杰",
"Tuscany" : "托斯卡纳",
"Tyrol" : "蒂罗尔州",
"Umbria" : "翁布里亚",
"Veneto" : "威尼托",
"Bratislava Region" : "布拉提斯拉瓦州",
"Burgas" : "布尔加斯",
"Plovdiv" : "普罗夫迪夫",
"Ruse" : "鲁塞",
"Sofia" : "索菲亚",
"Varna" : "瓦尔纳",
"Vidin" : "维丁",
"Chubu"  : "丘布特",
"Chugoku" : "中国",
"Chungcheongbuk-do" : "忠清北道",
"Gangwon-do" : "江原道",
"Gyeongsangbuk-do" : "庆尚北道",
"Hokkaido" : "北海道",
"Jeju" : "济州",
"Jeollabuk-do" : "全罗北道",
"Jeollanam-do" : "全罗南道",
"Kanto" : "京都",
"Kinki" : "近畿",
"Kyushu" : "九州岛",
"Shikoku" : "四国",
"Tohoku" : "东北",
"Carinthia" : "克恩顿州",
"Inner Carniola" : "卡尔尼奥拉",
"Alberta" : "亚伯达",
"British Columbia" : "不列颠哥伦比亚",
"Manitoba" : "曼尼托巴",
"New Brunswick" : "新伯伦瑞克省",
"Newfoundland and Labrador" : "纽芬兰-拉布拉多",
"Nova Scotia" : "新斯科细亚省",
"Nunavut" : "努勒维特",
"Ontario" : "安大略",
"Prince Edward Island" : " 爱德华王子岛",
"Quebec" : "魁北克",
"Saskatchewan" : "萨斯喀彻温",
"Yukon" : "育空",
"Gauteng" : "豪登省",
"Limpopo" : "林波波省",
"Mpumalanga" : "姆普马兰加",
"Chungcheongnam-do" : "忠清南道",
"Gyeonggi-do" : "京畿道",
"Gyeongsangnam-do" : "庆尚南道",
"Peninsular Malaysia" : "马来半岛",
"Sabah" : "沙巴",
"Sarawak" : "沙捞越",
"Andalucia" : "	安达鲁西亚",
"Aragon" : "阿拉贡",
"Asturias" : "阿斯图里亚斯",
"Balearic Islands" : "巴利阿里群岛",
"Basque Country" : "巴斯克地区",
"Canary Islands" : "加那利群岛",
"Cantabria" : "坎塔布利亚",
"Castilla La Mancha" : "卡斯蒂利亚-拉曼查",
"Castilla y Leon" : "卡斯蒂利亚-莱昂",
"Catalonia" : "加泰罗尼亚",
"Extremadura" : "埃斯特雷马杜拉",
"Galicia" : "加利西亚",
"La Rioja" : "拉里奥哈",
"Madrid" : "马德里",
"Murcia" : "穆尔西亚",
"Navarra" : "纳瓦拉",
"Oaxaca" : "瓦哈卡",
"Valencian Community" : "瓦伦西亚",
"Baja" : "巴哈",
"The Central Highlands" : "中部高原",
"The Gulf" : "墨西哥湾",
"The Pacific Coast" : "太平洋沿岸",
"Bohus" : "布胡斯",
"Gotaland" : "哥得兰",
"Gotland" : "哥特兰岛",
"Jamtland Harjedalen" : "耶姆特兰和海里耶达伦",
"Midtjylland" : "米迪兰特",
"Nordjylland" : "北日德兰",
"Norrland and Sameland" : "诺兰德和萨米",
"Scania" : "斯堪尼亚",
"Smaland" : "斯马兰德",
"Svealand" : "斯韦阿兰",
"Syddanmark" : "南丹麦",
"Moravia" : "摩拉维亚",
"Northern Bohemia" : "北波希米亚",
"Southern Bohemia" : "南波希米亚",
"Transnistria" : "德涅斯特",
"Sjaelland" : "西兰岛",
"Brussels-Capital Region" : "布鲁塞尔首都区",
"Flemish Region" : "佛兰芒区",
"Walloon Region" : "瓦隆区",
"Central Thailand" : "泰国中部",
"Eastern Thailand" : "泰国东部",
"North-Eastern Thailand" : "泰国东北部",
"Northern Thailand" : "泰国北部",
"Southern Thailand" : "泰国南部",
"Pohja-Eesti" : "波赫亚-爱沙尼亚",
"Chagang" : "慈江",
"Hamgyong" : "咸镜",
"Hwangae" : "黄海",
"Kangwon" : "江原道",
"Pyong" : "平壤",
"Ryanggang" : "两江道",
"Aegean Islands" : "爱琴海岛屿",
"Aegean Region" : "爱琴海区",
"Attica" : "阿提卡",
"Black Sea Region" : "黑海地区",
"Central Anatolia Region" : "安纳托利亚中部地区",
"Crete" : "克里特岛",
"Eastern Anatolia Region" : "安纳托利亚东部地区",
"Epirus" : "伊皮鲁斯",
"Haifa district" : "海法区",
"Ionian Islands" : "爱奥尼亚群岛",
"Jerusalem district" : "耶路撒冷区",
"Macedonia" : "马其顿",
"Marmara Region" : "马尔马拉地区",
"Mediterranean Region" : "地中海地区",
"Peloponnese" : "伯罗奔尼萨半岛",
"Southeastern Anatolia Region" : "东南安纳托利亚地区",
"Thessaly" : "塞萨利",
"Aland" : "奥兰群岛",
"Eastern Finland" : "东芬兰",
"Lapland" : "拉普兰",
"Leningrad Oblast" : "列宁格勒州",
"Moscow Region" : "莫斯科地区",
"Nord-Norge" : "北诺尔格",
"Oulu" : "奥卢",
"Southern Finland" : "芬兰南部",
"Western Finland" : "芬兰西部",
"Ostlandet" : "东挪威",
"Sorlandet" : "南挪威",
"Svalbard & Jan Mayen" : "斯瓦尔巴群岛和扬马延",
"Trondelag" : "德拉格",
"Vestlandet" : "西挪威",
"Sloboda" : "斯洛波达",
"Volhynia" : "沃里尼亚",
"Alsace" : "阿尔萨斯",
"Aquitaine" : "阿奎坦",
"Auvergne" : "奥弗涅",
"Brittany" : "布列塔尼",
"Burgundy" : "勃艮第",
"Champagne-Ardenne" : "香槟-阿登",
"Corsica" : "科西嘉",
"Franche-comte" : "弗朗什孔泰",
"Languedoc-Roussillon" : "朗格多克-鲁西永",
"Limousin" : "利穆赞",
"Lorraine" : "洛林",
"Lower-Normandy" : "下诺曼底",
"Midi-Pyrenees" : "比利牛斯",
"North-Calais" : "北加莱",
"Pays-de-la-Loire" : "卢瓦尔河区",
"Picardy" : "庇卡底",
"Poitou-Charentes" : "普瓦图-夏朗德",
"Provence-Alpes-Azur" : "普罗旺斯及蓝色海岸",
"Rhone-Alps" : "罗纳-阿尔卑斯",
"Upper-Normandy" : "上诺曼底",
"East Midlands" : "东米德兰兹",
"East of England" : "东英格兰",
"London" : "伦敦",
"Northern Ireland" : "北爱尔兰",
"Scotland" : "苏格兰",
"Wales" : "威尔斯",
"West Midlands" : "西米德兰兹",
"Yorkshire & Humberside" : "约克郡和亨伯",
"Baden-Wurttemberg" : "巴登-符腾堡州",
"Bavaria" : "巴伐利亚",
"Brandenburg" : "布兰登堡",
"Hesse" : "黑森",
"Lower Saxony" : "下萨克森",
"Mecklenburg-Western Pomerania" : "梅克伦堡-前波美拉尼亚州",
"North Rhine-Westphalia" : "北威州",
"Rhineland-Palatinate" : "莱茵兰-巴拉丁",
"Saarland" : "萨尔兰",
"Saxony" : "萨克逊",
"Saxony-Anhalt" : "萨克逊-安哈尔特",
"Schleswig-Holstein" : "什列斯威-霍尔斯坦",
"Thuringia" : "图林根",
"Vorarlberg" : "福拉尔贝格州",
"Luzon" : "吕宋",
"Mindanao" : "棉兰老岛",
"Palawan" : "巴拉望",
"Visayas" : "维萨亚斯",
"Alabama" : "阿拉巴马州",
"Alaska" : "阿拉斯加州",
"Arizona" : "亚利桑那州",
"Arkansas" : "阿肯色州",
"California" : "加利福尼亚州",
"Colorado" : "科罗拉多州",
"Connecticut" : "康涅狄格州",
"Delaware" : "特拉华州",
"District of Columbia" : "哥伦比亚特区",
"Florida" : "佛罗里达州",
"Georgia" : "乔治亚",
"Hawaii" : "夏威夷",
"Idaho" : "爱达荷州",
"Illinois" : "伊利诺伊州",
"Indiana" : "印第安纳州",
"Iowa" : "爱荷华州",
"Kansas" : "堪萨斯州",
"Kentucky" : "肯塔基州",
"Louisiana" : "路易斯安那州",
"Maine" : "缅因州",
"Maryland" : "马里兰州",
"Massachusetts" : "马萨诸塞州",
"Michigan" : "密歇根州",
"Minnesota" : "明尼苏达州",
"Mississippi" : "密西西比州",
"Missouri" : "密苏里州",
"Montana" : "蒙大拿州",
"Nebraska" : "内布拉斯加州",
"Nevada" : "内华达州",
"New Hampshire" : "新罕布什尔州",
"New Jersey" : "新泽西州",
"New Mexico" : "新墨西哥州",
"New York" : "纽约州",
"North Carolina" : "北卡罗来纳州",
"North Dakota" : "北达科他州",
"Ohio" : "俄亥俄州",
"Oklahoma" : "俄克拉何马州",
"Oregon" : "俄勒冈州",
"Pennsylvania" : "宾夕法尼亚州",
"Rhode Island" : "罗得岛州",
"South Carolina" : "南卡罗来纳州",
"South Dakota" : "南达科他州",
"Tennessee" : "田纳西州",
"Texas" : "得克萨斯州",
"Utah" : "犹他州",
"Vermont" : "佛蒙特州",
"Virginia" : "弗吉尼亚州",
"Washington" : "华盛顿",
"West Virginia" : "西弗吉尼亚州",
"Wisconsin" : "威斯康星州",
"Wyoming" : "怀俄明州",
"Thrace" : "色雷斯",
"Great Poland" : "大波兰区",
"Little Poland" : "小波兰",
"Mazovia" : "马佐维亚",
"Pomerania" : "波美拉尼亚",
"Silesia" : "西里西亚",
"Subcarpathia" : "喀尔巴阡山省",
"Andean" : "安第斯",
"Guayana" : "圭亚那",
"Llanos" : "拉诺斯",
"Bukovina" : "布科维纳",
"Burgenland" : "布尔根兰州",
"Central Hungary" : "匈牙利中部",
"Central Transdanubia" : "中特兰斯达努比亚",
"Western Transdanubia" : "西特兰斯达努比亚",
"Dnipro" : "迪尼普",
"Donbas" : "顿巴斯",
"Northern Basarabia" : "北比萨拉比亚",
"Northern Hungary" : "匈牙利北部",
"Podolia" : "波多里亚",
"Siveria" : "西伯利亚",
"Volga Region" : "伏尔加地区",

	


// menu
	"Home" : "首页",
	"Donate" : "捐赠",
	"Rank"   : "军衔",
	"Company" : "公司", 
	"Profile" : "个人", 
	"Party" : "党派", 
	"Newspaper" : "报纸",
	"Army" : "军队",
	"Country administration" : "国家管理",
	"Country Administration" : "国家管理",
	"Organizations" : "组织",
	"Market place" : "市场",
	"Monetary market" : "货币市场",
	"Human Resources" : "人力资源",
	"Companies for sale" : "公司转让",
	"Get gold &amp; extras" : "购买黄金",
	"Rankings" : "玩家排名",
	"Social stats" : "社会状况",
	"Economic stats" : "经济状况",
	"Political stats" : "政治状况",
	"Military stats" : "军事状况",
	"Tools" : "网页工具",
	"Forum" : "游戏论坛",
	"News" : "新闻",
	"Invite friends" : "邀请朋友",
	"Career path" : "职业发展",
	"Ok, thanks, next tip" : "ok, 感谢, 下个提示",
	"Select" : "选择",
	"Marketplace" : "购物市场",
	"Wars" : "战争",


// country page
	"On the Map" : "查看地图",
	"Total citizens" : "公民总数",
	"New citizens today" : "今日新加入",
	"Average citizen level" : "平均公民等级",
	"Online now": "当前在线",
	"Citizens" : "公民",
	"Who" : "谁",
	"details" : "查看详情",
	"Society" : "社会",
	"Economy" : "经济",
	"Politics" : "政治",
	"Military" : "军事",
	"Administration" : "管理",
	
// countries
	"Argentina" : "阿根廷",
	"Australia" : "澳大利亚",
	"Austria" : "奥地利",
	"Bosnia and Herzegovina" : "波黑",
	"Brazil" : "巴西",
	"Bulgaria" : "保加利亚",
	"China" : "中国",
	"Croatia" : "克罗地亚",
	"Canada" : "加拿大",
	"Czech Republic" : "捷克共和国",
	"Denmark" : "丹麦",
	"Estonia" : "爱沙尼亚",
	"Finland" : "芬兰",
	"France" : "法国",
	"Germany" : "德国",
	"Greece" : "希腊",
	"Hungary" : "匈牙利",
	"Indonesia" : "印度尼西亚",
	"Ireland" : "爱尔兰",
	"Israel" : "以色列",
	"Italy" : "意大利",
	"Iran" : "伊朗",
	"Japan" : "日本",
	"Latvia" : "拉脱维亚",
	"Lithuania" : "立陶宛",
	"Malaysia" : "马来西亚",
	"Mexico" : "墨西哥",
	"Moldavia" : "摩尔多瓦",
	"Netherlands" : "荷兰",
	"Norway" : "挪威",
	"Pakistan" : "巴基斯坦",
	"Philippines" : "菲律宾",
	"Poland" : "波兰",
	"Portugal" : "葡萄牙",
	"Romania" : "罗马尼亚",
	"Serbia" : "塞尔维亚",
	"Singapore" : "新加坡",
	"South Africa" : "南非",
	"South Korea" : "韩国",
	"Slovakia" : "斯洛伐克",
	"Slovenia" : "斯洛文尼亚",
	"Switzerland" : "瑞士",
	"Spain" : "西班牙",
	"Sweden" : "瑞典",
	"Russia" : "俄罗斯",
	"Thailand" : "泰国",
	"United Kingdom" : "英国",
	"Ukraine" : "乌克兰",
	"USA" : "美国",
	"Turkey" : "土耳其",
        "India" : "印度",
        "Belgium" : "比利时",
        "Chile" : "智利",
        "North korea" : "北朝鲜",
        "Venezuela" : "委内瑞拉",
	"World" : "世界",
// economy
	"GOLD" : "黄金",
	"Gold" : "黄金",
	"Treasury" : "国库",
	"All accounts" : "所有账户",
	"Country trading embargoes" : "贸易禁运",
	"Taxes" : "税",
	"food" : "食物",
	"gift" : "礼物",
	"weapon" : "武器",
	"moving tickets" : "机票",
	"Moving tickets" : "机票",
	"grain" : "粮食",
	"diamonds" : "钻石",
	"iron" : "铁",
	"oil"  : "油",
	"wood" : "木材",
	"house" : "房子",
	"hospital" : "医院",
	"defense system" : "防御系统",

        "CNY" : " 人民币",
	"Salary" : "薪金",
	"Minimum" : "最低",
	"Average" : "平均",
// company
	"Office" : "办公室",
	"You have already worked today." : "您今天已经工作过了.",
	"Come back tomorrow." : "请明天再来吧.",
	"Resign" : "辞职",
	"Employees" : "雇员",
	"Raw materials" : "原材料",
	"See all employees" : "查看所有雇员",
	"Go to marketplace" : "前往购物市场",
	"Products" : "产品",

	"Grain" : "粮食",
	"Food" : "食物",
	"Gift" : "礼物",
	"Weapon" : "武器",
	"Moving Tickets" : "机票",
	"Diamonds" : "钻石",
	"Iron" : "铁",
	"Oil"  : "油",
	"Wood" : "木材",
	"House" : "房子",
	"Hospital" : "医院",
	"Defense System" : "防御系统",
// market
	// market
	"Quality Level" : "质量水平",
	"All levels" : "全等级",
	"Level 1" : "1级",
	"Level 2" : "2级",
	"Level 3" : "3级",
	"Level 4" : "4级",
	"Level 5" : "5级",

	"Provider" : "供货公司",
	"Quality" : "质量等级",
	"Stock" : "库存",
	"Buy" : "购买",
	"Market" : "市场",

	"Market offers" : "市场提供",
	"Amount" : "数量",
	"Price" : "价格",
	"Next" : "下一页",
	"Prev" : "前一页",
	"No products in this market" : "没有任何产品在这个市场上",
	// "Go to marketplace" : "前往购物市场",
	"Jobs available in this company" : "该公司的职位空缺",
	"You don't have any active job offers" : "You don't have any active job offers",
	"You didn't specify the amount of products you wish to buy" : "您还没有指定你想买多少",
	"You cannot trade with this country as you are at war with it" : "无法跟交战国家进行交易",

// region
	"Heal" : "治疗",
	"Constructions": "建设",
	"Population": "人口",
	"Productivity" : "生产力",
	"Resistance War" : "起义战争",
	"Resistance War Active" : "进行中的起义战争",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "您不能在这个地区发动起义,该地区已属于其原有的国家",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "您不能在这个地区发动起义战争,该地区已属于其原有的国家.",
	"Medium" : "中等",
	"High": "高",
	"Neighbors" : "邻国",
// marketplace
	"Please select an Industry to see the marketplace offers" :
	"请选择一个产业来查看购物市场的货源",
	"Skill Level" : "技能等级",
	"All skills" : "全部等级",
	"All" : "全部",
// politics
	"President" : "总统",
	"Congress" : "国会",
// wars
	"no allies" : "没有盟国.",
	"All wars" : "所有战争",
	"All resistance wars" : "所有起义战争",
	"All Alliances" : "所有联盟",
	"Alliances" : "盟国",
	"Military force" : "军队",
	"Average strength" : "平均力量",
// army
	
	"You have trained today. You can train again tomorrow." : "你今天已经训练过了，明天再来吧",
	"My strength" : "我的力量",
	"Force" : "实力",
	"Military rank" : "军衔",
	"Military achievements" : "军事成就",
	"Active wars list" : "进行中的战事列表",
	"Sergeant" : "上士",
	"Corporal" : "下士",
	"Private" : "列兵",

	"There are no resistance wars in this country." : "没有进行任何起义战争.",
        "This country has no allies." : "这个国家没有任何盟国",
        "This country is not involved in any war." : "没有参与任何战役",
	"until the region can be occupied or secured" : "直到该地区被占领或被守住",
	"Attackable on President's decision" : "由总统决定是否允许攻击",
	"Defense Points" : "防御点",
	"Go to Battlefield" : "到战场",
	"see finished battles" : "查看已完结的战役",
	"show finished battles" : "显示已完结的战役",
	"Wars list" : "战争列表",
	"War" : "战争",
	"Battle history" : "战役历史记录",
	"Fight" : "战争",
	"Hero" : "英雄",
"started by" : "发起者",

"Fight for resistance" : "为起义军而战",
"Fight for defenders" : "为政府军而战",
"No." : "编号",


// party
	"You are not a member of a party" : "您目前并非党派成员",
	"Join a party" : "加入党派",
	"Create new" : "创建新的",
	"Join" : "加入",
	"See all members" : "查看所有成员",
	"Donate Gold" : "捐赠黄金",
	"Members"  : "成员",
	"Orientation" : "倾向性",

	"Center" : "中心",
	"Anarchist" : "无政府主义",
	"Accounts" : "账户",
	"Elections" : "选举",
	"Election results" : "选举结果",
	"Next elections" : "下届选举",
	"Next elections in" : "下次选举 ",
	"Next election in" : "下次选举 ",

	"Country Presidency" : "国家元首",
	"Party Presidency" : "党派领袖",
	"Party presidency" : "党派领袖",
	"Party President" : "党主席",
	"See results" : "查看结果",
	"Expires tomorrow" : "明日到期",

// Create party

	"Create party" : "创建党派",
	"Party details" : "党派信息",
	"Party name" : "党派名称",
	"Economical orientation" : "经济倾向性",
"Social orientation" : "社会倾向性",
	"Party logo" : "党派标志",
	"Disscusion area" : "讨论网址",
"Create" : "创建",

// articles




"ShareThis" : "分享此篇文章",
	"Report abuse" : "举报违规内容",
	"yesterday" : "昨日",
	"one hour ago" : "一个小时前",
	"Unsubscribe" : "取消订阅",
	"Subscribe" : "订阅",
	"Article RSS" : "Article RSS",
	"Your comment" : "你的评论",
	"View all comments" : "查看全部评论",
	"Subscribe to comments" : "订阅此评论",
	"Unsubscribe to comments" : "取消订阅此评论",
	"Post a comment" : "发布评论",
// news
	"You don't have a newspaper" : "您尚未创建报纸",

// profiles
	"Friends" : "好友",
	"Assets" : "资产",
	"Press director" : "报社主编",
	"Inventory" : "仓库",
	"Get Gold" : "购买黄金",
	"Career" : "职业发展",
	"Bio" : "个人简历",
	"Employee" : "雇员",
	"No political activity" : "无党派",
	"Wellness" : "体力",
	"Level" : "等级",
	"Strength" : "力量",
	"Experience" : "经验",
	"Skills" : "技能",
	"Land" : "开采",
	"Manufacturing" : "生产",
	"Erepublik Age" : "Erepublik年龄",
	"Achievements" : "成就",
	"Edit profile" : "修改资料",
	"Edit Profile" : "修改资料",
	"Change residence" : "移居住地",
	"Donations list" : "捐赠记录",
" xp points" : "经验点数",


	
	"Your email here" : "电子邮件",
	"Your birthday" : "出生日期",
	"Citizen Avatar" : "公民头像",
	"Change password" : "修改密码",
        "Make changes" : "完成修改",
        "pictures allowed" : "格式图片允许上传",
"You do not own a moving ticket. You can buy moving tickets from the marketplace." : "您目前尚无机票。您可以从购物市场购买机票。",
"Current location" : "当前位置",
"New location:" : "新的位置",
"Please choose a country you want to live in." : "请选择您要居住的国家",
"Please choose the region you want to live in" : "请选择您要居住的地区",


	"Work for 30 days in a row" : "连续工作30天",
	"Win the Congress elections": "赢得国会选举",
        "Win the Presidential elections": "赢得总统大选",
   "Reach 1000 subscribers to your newspaper": "订阅您的报纸的读者达到1000人",
   "Reach the highest total damage in one battle": "在一场战斗中综合破坏力达到最高",
   "Start a resistance war and liberate that region": "发动一场起义战争并成功解放该地区",
"Advance 5 strength levels": "力量等级超过5级",
"Invite 10 people to eRepublik and help them reach level 6": "邀请10人加入《电子共和国》并且帮助他们达到Lv6",


// fight
	"Back to battlefield" : "回到战场",
	"Fight Again" : "再战一次",
	"Fight bonus" : "战斗奖励",

// messages
	"Inbox" : "收件箱",
	"Sent" : "发件箱",
         "Sent messages" : "发件箱",
	"Alerts" : "系统提示",
	"Subscriptions" : "报刊订阅",
	"new article" : "新文章",
	"Delete" : "删除",
	"Read Message" : "阅读信息",
	"Reply" : "回复",
	"From" : "From",
// flash menu
	"My places > Army" : "军事",
	"My places > Newspaper" : "报纸",
	"My places > Organizations" : "组织",


	"Size:" : "大小：",
	"Code:" : "代码：",
	"Badges" : "图片",
"Please insert an amount to buy." : "请输入买入量.",
"Payments can be done in USD as well." : "亦可用美元支付.",
"Buy now" : "立即购买.",
"eRepublik Gold" : "《电子共和国》黄金", 
"is a fictional currency used only in the eRepublik World." : "为虚拟货币，仅可在《电子共和国》游戏世界中使用.", 
"You can buy Gold only once every 7 days, in order to avoid Gold inflation. Therefore, be sure to get the appropriate pack to suite your needs for a whole week." : "为避免黄金的通货膨胀，每7天您只能购买一次黄金。因此，请在购买时选择能够满足您一周需要的合适黄金数量。", 
"Additionally, you can get another 5 Gold via sms in case of emergency." : "此外，在紧急情况下您可以通过sms方式购买额外的5枚黄金。", 
"Expires in one month" : "1 个月后到期", 
"Presence:" : "参与百分比：",

// menu	
	"Find out more" : "了解更多",
	"logout" : "退出",
	"Logout" : "退出"
};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 盟国";
regexps["^Active wars in (.*)$"] = "进行中的战争 $1";
regexps["(\\s*)Expires in (\\d*) days"] = " $2 天后到期";
regexps["(\\s*)Expires in (\\d*) hours"] = " $2 小时后到期";
regexps["(\\s*)Expires in (\\d*) months"] = " $2 个月后到期";
regexps["^(\\d*) comments$"] = "$1 评论";
regexps["^(\\d*) hours ago$"] = "$1 小时前";
regexps["^(\\d*) minutes ago$"] = "$1 分钟前";
regexps["^(\\d*) days ago$"] = "$1 日前";
regexps["^Regions \\((\\d*)\\)"] = "地区 ($1)";
regexps["^Friends \\((\\d*)\\)"] = "好友 ($1)";
regexps["^(\\d*) months ago"] = "$1 月前";
regexps["^(\\d*) months"] = "$1 月";
regexps["^Comments(.*)"] = "评论$1";
regexps["^You worked (\\d*) days in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "您已经连续工作 $1 天,再工作 $2 天时间, 您将会获得 '劳动模范' 勋章";
regexps["^You worked( )+one day in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "You worked( )+one day in a row. 再工作 $2 天时间, 您将会获得'劳动模范'勋章";
regexps["^Next election in (\\d*) day\\."] = "下届选举将于 $1 天到期.";
regexps["^(\\d) congress (.*) members"] = "国会 $1 成员.";
regexps["^(\\d)% of Congress"] = "国会人数: $1";
regexps["^Amount to buy$"] = "买入量$";
regexps["(\\d*)\\.(\\d*)\\.(\\d*) - "] = "$3.$2.$1 - ";
regexps["(.*)Day (\\d+) of the New World(.*)"] = "$1 新世界 $2. 日期$3";
regexps["^All employees \\((\\d*)\\)"] = "所有雇员 ($1)";
regexps["^Active resistance wars in (.*)"] = "进行中的起义战争 $1 ";
regexps["^Official candidates \\((\\d*)\\)"] = "正式候选人 ($1)";
regexps["^Wildcards \\((\\d*)\\)"] = "副 ($1)";
regexps["^Not qualified \\((\\d*)\\)"] = "没有资格 ($1)";
regexps["Presence:  (\\d*)\\.(\\d*)%"] = "参与率: $1.$2";
regexps["^(\\d+) candidate(s)?$"] = "$1 候选人";
regexps["^(\\d+) citizen(s)?$"] = "$1 公民";
regexps["^You cannot resign from your job until (.*)"] = "直到 $1 您才可以辞职";
regexps["^Proposed by (.*), (.*) hours ago"] = "提案的 $1 , $2 小时前";
regexps["^Tax change:(.*)"] = "税率变更:$1";
regexps["^Successfuly transfered (.*) item\\(s\\) to (.*)\\."] = "成功(z) $1 赠送 $2 到.";
regexps["^You have successfuly offered a quality (\\d+) gift\\."] = "您已成功送出了一个 $1 礼物.";
regexps["Your friend (.+) that you invited reached level 6 and for that you have received 5 Gold\\."] = "您邀请的朋友 $1 已经达到了等级6, 因此您获得了5 枚黄金的奖励";
regexps["You have successfully donated (.*)\\. This amount will appear shortly in the citizen/organization account\\."] = "您己成功捐赠 $1 . 这笔款项将很快会出现在公民/组织的账户.";
regexps["The General Manager of (.+) has modified your salary from (.*) to (.*)\\."] = " $1 的总经理对您的薪金作出调整, 由 $2 调整到 $3 ";
regexps["We are sorry to inform you that the General Manager of (.*) has decided to fire you! But don't worry, you can get a new job or you can even buy a company\\."] = "我们很遗憾地通知你, $1 的总经理决定将您解雇了. 不要担心, 您可以从劳工市场找寻新的工作或者购买一家属于自己的公司.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. Now you have the possibility to (.*)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "恭喜, 您已经达到等级 $2 ! 现在 $3 功能已激活. 要达到等级 $4 , 您需要 $5 经验值.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "恭喜, 您已经达到等级 $1 ! 要达到等级 $2 , 您需要 $3 经验值.";
regexps["^Inbox \\(d+\\)"] = "收件箱 ($1)";
regexps["There is no more food in your inventory\\. Without food to eat your Citizen loses (\\d+) wellness each day until he dies\\. To avoid death by starvation we advise you to buy food from the (.*)"] = "您的仓库中没有食物了.没有进食, 公民将会每日损失 $1 点体力直至死亡. 为了避免被饿死, 我们建议您从购物市场上购买食物. -->";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "您成功购买 $1 个物品 for $3 .";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. Your current wellness is (.*)"] = "您目前不能参战, 您必须至少拥有 $1 体力. 而您的当前体力仅为 $2 .";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\."] = "您不能参战, 您必须至少拥有 $1 体力.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. You can get wellness from (.*)"] = "您不能参战, 您必须至少拥有 $1  体力. 您可以到医院接受治疗, 恢复体力 -->";
regexps["(\\d+) Citizens"] = "$1 公民";
regexps["You received (\\d+) wellness from hospital\\."] = "你通过医院治疗获得 $1 体力.";
regexps["You need at least (\\d+) Experience Points to join this fight"] = "您需要至少 $1 经验, 才能参战";
regexps["President of (.*) has proposed an alliance with (.*)"] = "$1 总统正提倡与 $2 结成盟国";
regexps["President of (.*) proposed an alliance with (.*)"] = "$1 总统提倡与 $2 结成盟国";
regexps["Citizen fee change from (.*) to (.*)"] = "公民费用从 $1 调整到 $2 ";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "您是否同意, 从国库转帐 $1 到 $2 ";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "您是否同意, 从国库以 $1 换取 $2 黄金?";
regexps["You have received (\\d+) gift of quality (\\d+) from (.*)\\. Your wellness has been increased with (\\d+)(\\.)"] = "您已收到 $1 件来自 $3 质量 $2 的礼物. 你的体力已增加 $4 .";
regexps["(.*) has accepted your friendship request"] = "$1 己接受您的添加好友请求.";
regexps["Now you can visit the (.*) or read the (.*) to stay in touch with what happens on eRepublik."] = "现在您可以访问 $1 或者阅读 $2 来了解《电子共和国》中发生的事情.";
regexps["supported by (\\d+) parties"] = "得到 $1 党派的支持";
// regexps["Next election in (\\d+)"] = "下次选举将于 $1 天后进行";
// regexps["(\\d+) candidates"] = "$1 位候选人";
regexps["(\\d+)-(\\d+) characters max"] = "最多. $1-$2 字符";
regexps[" has transfered (\\d+) product(s)? to your inventory\\. Check your"] = " 已赠送 $1 物品到您的仓库. 请查看 ";
regexps["donations list"] = " 捐赠记录";
regexps[" has transfered (.*) to your account\\."] = " 已转移 $1 到您的账户.";
regexps["(\\d+) active battles"] = "$1 进行中的战役";
regexps["I have read and agree with the (.*)"] = "我已经阅读并接受了$1";
regexps["Copyright (.*) eRepublik"] = "版权所有 $1 《电子共和国》";
regexps["(.*)Remember me"] = "记住密码";
regexps["Male"] = "男性";
regexps["Female"] = "女性";
// regexps["May"] = "五月";
// regexps["Copyright"] = "版权所有"; 
regexps["Top countries in eRepublik"] = "《电子共和国》国家排行榜";
// regexps["Official candidates"] = "正式候选人";


matchRegexps = function(key) {
	if (key===null) {
	  return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
	  var rrrr = new RegExp(reg);
	  var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
	  if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
	    return key.replace(rrrr,regexps[reg]);
	  }
	}
	return undefined;
};

// translate = function(key) {
// 	if (strings[key]!==undefined) {
// 	    return strings[key];
// 	} else {
// 	    var key2 = trim(key);
// 	    if (strings[key2]!==undefined) {
// 		return strings[key2];
// 	    }
// 	}
// 	return undefined;
// };

// translateWithRegexp = function(key) {
// 	if (strings[key]!==undefined) {
// 	    return strings[key];
// 	} else {
// 	    var key2 = trim(key);
// 	    if (strings[key2]!==undefined) {
// 		return strings[key2];
// 	    }
// 	}
// 	return matchRegexps(key);
// };
translateWithRegexp = function(key) {
    var keyTrimmed = trim(key);
    var keyLower = keyTrimmed.toLowerCase ();
    var keyFirstUpper = keyLower.charAt(0).toUpperCase()+keyLower.substring(1);
    var keyCapitAllWord = capitAll(keyTrimmed);
	if (strings[key]!==undefined) {
      return strings[key];
	} else 
	if (strings[keyTrimmed]!==undefined) {
	  return strings[keyTrimmed];
	} else 
	if (strings[keyLower]!==undefined) {
	  return strings[keyLower];
	} else 
	if (strings[keyFirstUpper]!==undefined) {
	  return strings[keyFirstUpper];
	} else 
	if (strings[keyCapitAllWord]!==undefined) {
	  return strings[keyCapitAllWord];
	}
	return matchRegexps(key);
};

capitAll = function(str)
{
	str= str.toLowerCase().replace(/([-\.']) */g,'$1 ');		
	var rx= /\b([a-záéíóöőúüű'-\.]+)\b/ig;
	str= str.replace(rx,
			 function(w)
			 {
			   return w.charAt(0).toUpperCase()+w.substring(1);
			 }
			);
	return str.replace(/^ *|(\-|') *| *$/g,'$1');
};

var allTrans = {
    "input":"", "span":"", "a":"", "h2":"", "th":"", "td":"", "p":"", "strong":"", "div":""
    // 2009.04.28. via_mala added
    ,"i":"", "b":"", "em":"", "font":"", "h1":"", "li":""
};


fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}

var blockEvent = false;

function translateWholePage(e) {
// if (document.location.toString().indexOf("/country/military")!=-1) {
//    militaryPage();
//  }
  blockEvent = true;
  
  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if ( node.tagName == "INPUT" && node.type == "button" )
      {
        GM_log( node.value );
        var translation = translateWithRegexp(node.value);
        GM_log( translation );
        if (translation!==undefined) {
          node.value = translation;
        }
      }
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=6) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
  //            GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
  blockEvent = false;
}


function translateNode(e)
{
  if ( blockEvent ) return;
  blockEvent = true;
  var node = e.relatedNode;
  var translate = translateWithRegexp(node.innerHTML);
  if ( translate !== undefined )
  {
     node.innerHTML = translate;
     blockEvent = false;
     return;
  }
  for (var tagName in allTrans) {
    var tags = e.relatedNode.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if ( node.tagName == "input" && node.type == "button" )
      {
        GM_log( node.value );
        var trans = translateWithRegexp(node.value);
        GM_log( trans );
        if (trans!==undefined) {
          node.value = trans;
        }
      }
      else if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
		//GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=6) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
            //  GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
  blockEvent = false;
}

window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
}, false);

document.addEventListener("DOMNodeInserted", translateNode, false);
