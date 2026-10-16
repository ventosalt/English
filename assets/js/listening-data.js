/* ============================================================
   四六级听力题库（listening-data.js）
   ------------------------------------------------------------
   ⚠️ 说明：
   - 本文件内的条目全部为【原创示例】，用于练习方法，非正式真题。
   - 正式真题条目（source:'official'）请在你【合法取得】音频与原文后自行添加。
   - 字段：
       id        唯一标识
       source    'original' 原创练习 | 'official' 正式真题
       level     'CET4' | 'CET6'
       year      年份（真题如 '2023-06'；原创填 '原创'）
       paper     套卷（如 '第1套'，可空）
       type      题型（四级：短篇新闻/长对话/听力篇章；六级：长对话/听力篇章/讲座·讲话）
       title     标题
       audio     音频路径（如 'assets/audio/xxx.mp3'），没有则 null
       transcript 原文逐句 [{ en, zh, start?, end? }]
                  - start / end 为【可选】的秒数，用于“单句循环”。
                  - 若只写 start，则 end 自动取下一句的 start。
                  - 没有时间点时，可用播放器下方的「设 A / 设 B + A–B 循环」实现单句循环。
       questions 题目（可选）
   ------------------------------------------------------------
   添加正式真题示例（请替换为你合法取得的文件与原文）：

   {
     id: 'official-2023-06-cet4-1',
     source: 'official', level: 'CET4', year: '2023-06', paper: '第1套',
     type: '听力篇章', title: '2023年6月 四级 第1套（正式真题）',
     audio: 'assets/audio/2023-06-cet4-p1.mp3',
     transcript: [ { en: '...', zh: '...' } ],
     questions: ['...']
   }
   ============================================================ */

window.LISTENING_BANK = [
  /* ===== 正式真题音频（本地、由你合法取得） ===== */
  
{
    id: 'official-2016-06-cet4-p1',
    source: 'official', level: 'CET4', year: '2016-06', paper: '第1套',
    type: '听力（整卷）', title: '2016年06月 四级听力 第1套（本地音频）',
    audio: 'assets/audio/2016年06月四级听力音频第1套.mp3',
    audioMatch: 'unverified',
        transcript: [
      {"en": "The International Labour Organization says the number of people without jobs is increasing.", "zh": ""},
      {"en": "In its latest update on global employment trends, the agency says projections of the number of unemployed people this year range from 210 million to nearly 240 million people.", "zh": ""},
      {"en": "The report warns that 200 million poor workers are at risk of joining the ranks of people living on less than two dollars per day in the past three years.", "zh": ""},
      {"en": "The Director-General of the International Labour Organization Juan Somavia notes that some countries have taken measures to address the effects of the global crisis.", "zh": ""},
      {"en": "However, he points out that many countries have not done so.", "zh": ""},
      {"en": "And based on past experiences, it takes four to five years after economic recovery fbr unemployment to return to pre-crisis levels.", "zh": ""},
      {"en": "Mr.Somavia says the International Labour Organization is proposing a global job's agreement to deal with unemployment.", "zh": ""},
      {"en": "“Its key objective is to place at the center of recovery efforts, measures that would generate higher levels of employment and provide basic social protection fbr the most vulnerable.^^", "zh": ""},
      {"en": "Big fast food chains in New York City have started to obey a first-of-its-kind rule requiring them to post calorie counts right on the menu.", "zh": ""},
      {"en": "Cathy Nonas is with the New York City Department of Health.", "zh": ""},
      {"en": "“We wanted to give people an opportunity to actually see the calories before they purchase the food and make a decision, an informed decision that if they want to make the healthier choice, if they want to eat fewer calories, they can.And we expect this will have a huge impact on obesity.", "zh": ""},
      {"en": "And of course, if it has an impact on obesity, it will have an impact on diabetes and heart disease and high blood pressure.99 The new rules were introduced as part of an anti-obesity campaign that also includes a recent citywide ban on artificial trans-fats in restaurant food.", "zh": ""},
      {"en": "The menu rule only applies to restaurants that serve standardised portion sizes and have fifteen or more locations nationwide.", "zh": ""},
      {"en": "Starting last Saturday, chains big enough to fall under the rule will face penalties of up to 2000 dollars for not showing calorie information in a prominent spot on their menus, preferably next to the price.", "zh": ""},
      {"en": "Almost all companies recognize the importance of innovation today, but not many are able to integrate innovation into their business.", "zh": ""},
      {"en": "A commentary in the Shanghai Daily points out that innovation doesn't mean piles of documents.", "zh": ""},
      {"en": "It is something more practical.", "zh": ""},
      {"en": "The article says many people tend to assume that innovation just means creating something new, but actually it's more than that.", "zh": ""},
      {"en": "Ifs an attitude of doing things.", "zh": ""},
      {"en": "A company should find ways to innovate not just in products but also in functions, business models and processes.", "zh": ""},
      {"en": "The article cites the global giant Procter & Gamble as an example, saying a real innovative company should develop an innovation culture and use it as a primary tool for success.", "zh": ""},
      {"en": "Procter & Gamble has a '\"Corporate Innovation Fund^^ which offers big rewards for high-risk ideas that succeed.", "zh": ""},
      {"en": "It also has a special innovation facility for its employees.", "zh": ""},
      {"en": "Sometimes its employees are released from their daily jobs fbr weeks and spend their time interacting in the innovation facility instead.", "zh": ""},
      {"en": "In conclusion, the article says innovative ideas alone do not ensure success.", "zh": ""},
      {"en": "It's pointless unless there is a repeatable process in place to turn inspiration into financial performance.", "zh": ""},
      {"en": "M: So, Lyndsay, do you like to text message on your cell phone?", "zh": ""},
      {"en": "W: Yeah, I text message a lot.", "zh": ""},
      {"en": "M: I don't do it so much.", "zh": ""},
      {"en": "I prefer to make a call if I'm in a hurry.", "zh": ""},
      {"en": "W: Yeah, I go both ways.", "zh": ""},
      {"en": "Sometimes I don't really want to talk to the person.", "zh": ""},
      {"en": "I just want to ask them one question, so ifs much easier for me just to text message.", "zh": ""},
      {"en": "If I call them, ril have to have a long conversation.", "zh": ""},
      {"en": "M: Yeah, I can see what you mean.", "zh": ""},
      {"en": "But I get off the phone pretty quickly when I call.", "zh": ""},
      {"en": "I'm not a big talker.", "zh": ""},
      {"en": "W: Yeah, thafs true.", "zh": ""},
      {"en": "You don't talk a lot.", "zh": ""},
      {"en": "M: So are you fast at writing the messages with your thumb?", "zh": ""},
      {"en": "W: Well, when I first got a cell phone, I was so slow.", "zh": ""},
      {"en": "I thought I would never text message.", "zh": ""},
      {"en": "But then people kept text messaging me, so I felt obliged to learn how to text message.", "zh": ""},
      {"en": "So now I'm pretty fast.", "zh": ""},
      {"en": "What about you?", "zh": ""},
      {"en": "M: Actually I have the opposite problem.", "zh": ""},
      {"en": "When I first got my cell phone, I thought it was so cool to text message all my friends who have one, and I was pretty fast with my thumb then.", "zh": ""},
      {"en": "But it seems like now I don't use it so much.", "zh": ""},
      {"en": "Tve gotten slower actually.", "zh": ""},
      {"en": "W: Yeah, I think text-messaging actually sort of has to do with your age.", "zh": ""},
      {"en": "For example, people in high school, they text message a lot.", "zh": ""},
      {"en": "But I asked my father if he texted messages, and guess what he said?", "zh": ""},
      {"en": "M: What?", "zh": ""},
      {"en": "W: He said he'd never text message.", "zh": ""},
      {"en": "He thinks it's very childish and unprofessional to text message.", "zh": ""},
      {"en": "M: Yeah, I can see what he means.", "zh": ""},
      {"en": "Ifs considered pretty informal to text message someone.", "zh": ""},
      {"en": "W: Good morning, Mr.Johnson.", "zh": ""},
      {"en": "How can I help you?", "zh": ""},
      {"en": "M: Well, I'd like to talk to you about Tim Bond, the department manager.", "zh": ""},
      {"en": "W: What seems to be the problem?", "zh": ""},
      {"en": "M: Well, ever since Sandra left the department, I feel like Fve been targeted to do all her work as well as mine.", "zh": ""},
      {"en": "I'm expected to attend too many meetings and I seem to be spending a lot of my time doing unnecessary paperwork.", "zh": ""},
      {"en": "W: I'm sorry to hear that.", "zh": ""},
      {"en": "M: And, on top of that, I'd specifically asked if I could leave early last Friday as I'd done a lot of overtime during the week.", "zh": ""},
      {"en": "But that afternoon, even though I'd finished my assigned work, I was told to help other colleagues finish their work, too.", "zh": ""},
      {"en": "W: But surely thafs a positive sign showing that Mr.Bond has a lot of trust in you.", "zh": ""},
      {"en": "M: Yes, but other colleagues get to leave early, and they don't have such a lot of work to do.", "zh": ""},
      {"en": "W: So you feel he's been making unrealistic demands on you?", "zh": ""},
      {"en": "M: Yes, absolutely.", "zh": ""},
      {"en": "W: Have you approached Mr.Bond about this particular problem?", "zh": ""},
      {"en": "M: I've tried, but it seems like he just has no time for me.", "zh": ""},
      {"en": "W: Well, at this stage, it would be better if you approached him directly.", "zh": ""},
      {"en": "If nothing else, showing that you've tried to solve the problem yourself, before you take it further, makes it clear that you're not just a complainer.", "zh": ""},
      {"en": "Why don't you send an email requesting a meeting with him in private?", "zh": ""},
      {"en": "M: Hmm, I'd be a bit worried about his reaction.", "zh": ""},
      {"en": "But anyway I'll send him an email to request a meeting, and I'll see what happens from there.", "zh": ""},
      {"en": "Thanks for your advice.", "zh": ""},
      {"en": "W: Good luck.", "zh": ""},
      {"en": "And let us know the outcome.", "zh": ""},
      {"en": "with their work?", "zh": ""},
      {"en": "The massive decline in sleep happened so slowly and quietly that few seemed to notice the trend.", "zh": ""},
      {"en": "Was it because of the growing attraction of the Internet, video games and endless TV channels?", "zh": ""},
      {"en": "Never disconnecting from work?", "zh": ""},
      {"en": "No matter how it happened, millions of Americans are putting their health, quality of life and even length of life in danger.", "zh": ""},
      {"en": "New evidence shows why getting enough sleep is a top priority.", "zh": ""},
      {"en": "Some 40% of Americans get less than seven hours of shut-eye on weeknights.", "zh": ""},
      {"en": "\"The link between sleep and health, and bad sleep and disease is becoming clearer and clearer/9 says Lawrence Epstein, a sleep expert at Harvard University.", "zh": ""},
      {"en": "For example, sleep duration has declined from some eight hours in the 1950s to seven in recent years.", "zh": ""},
      {"en": "At the same time, high blood pressure has become an increasing problem.", "zh": ""},
      {"en": "Blood pressure and heart rate are typically at their lowest levels during sleep.", "zh": ""},
      {"en": "People who sleep less tend to have higher blood pressure, heart attack, diabetes, weight gain and other problems.", "zh": ""},
      {"en": "Sleeping better may help fight off illness.", "zh": ""},
      {"en": "\"When people are sleep-deprived, there are higher levels of stress hormones in their bodies, which can decrease immune function, says Doctor Felice of Northwestern University in Chicago.", "zh": ""},
      {"en": "A university of Chicago study shows people who sleep well live longer.", "zh": ""},
      {"en": "So say good night sooner and it may help you stay active and vital to a ripe old age.", "zh": ""},
      {"en": "Parents and teachers will tell you not to worry when applying fbr a place at university, but in the same breath we'll remind you that it is the most important decision of your life.", "zh": ""},
      {"en": "The first decision is your choice of course.", "zh": ""},
      {"en": "It will depend on what you want to get out of university, what you are good at and what you enjoy.", "zh": ""},
      {"en": "The next decision is where to apply.", "zh": ""},
      {"en": "Aim high but within reason.", "zh": ""},
      {"en": "Do you have the right combination of subjects and are your expected grades likely to meet entry requirements?", "zh": ""},
      {"en": "The deadline is January 15th.", "zh": ""},
      {"en": "But it is best to submit your application early because universities begin work as soon as forms start rolling in.", "zh": ""},
      {"en": "The most important part of the application is the much feared personal statement.", "zh": ""},
      {"en": "This is your chance to convey boundless enthusiasm for the subject.", "zh": ""},
      {"en": "So economy of expression is foremost.", "zh": ""},
      {"en": "Omit dull and ineffective generalities and make sure you give concrete examples.", "zh": ""},
      {"en": "Admissions officers read every personal statement that arrives.", "zh": ""},
      {"en": "It is not convincing if you say you have chosen the subject because you enjoy it.", "zh": ""},
      {"en": "You have to get across what it is about a particular area that has inspired you.", "zh": ""},
      {"en": "They will look for evidence that you have reflected and thought about the subject.", "zh": ""},
      {"en": "Applicants should be honest.", "zh": ""},
      {"en": "There is no point saying you run marathons if you are going to be out of breath arriving at the interview on the second floor.", "zh": ""},
      {"en": "It is usually agreed that a German, Carl Benz, built the first motor car in 1885.", "zh": ""},
      {"en": "It was actually a tricycle with a petrol motor at the rear.", "zh": ""},
      {"en": "Soon, members of the Royal family and other wealthy people took up motoring as a sport.", "zh": ""},
      {"en": "Many of the early cars had two seats.", "zh": ""},
      {"en": "There were no petrol pumps and few garages, so every driver had to be his own engineer for the frequent breakdowns.", "zh": ""},
      {"en": "By 1905, cars began to look like cars of today, with head lamps, wind screen, rubber tyres and number plates.", "zh": ""},
      {"en": "Henry Ford's Model T introduced in America in 1909 was cheaper because it was made on the assembly line.", "zh": ""},
      {"en": "It brought cars closer towards the reach of ordinary people.", "zh": ""},
      {"en": "With the popularity of the car, registration became a must in 1903 with the Motor Car Act.", "zh": ""},
      {"en": "Competency tests were introduced in 1935.", "zh": ""},
      {"en": "Today, the legal driving age fbr a car in the UK is 17.", "zh": ""},
      {"en": "You are not allowed to drive a car unsupervised until you have passed a driving test.", "zh": ""},
      {"en": "In 1958, Britain celebrated the opening of its first motorway- the Preston Bypass.", "zh": ""},
      {"en": "Until then, no one really understood what a motorway was, not even the laborers who were building it.", "zh": ""},
      {"en": "The bypass hailed a new era in motor travel and was greeted with excitement and optimism.", "zh": ""},
      {"en": "Service stations came with the motorway and the legend of the transport cafe was born.", "zh": ""},
      {"en": "Of course, the service station has diversified greatly.", "zh": ""},
      {"en": "But whether it's an English-cooked breakfast or a coffee and a sandwich, one thing has remained the same: the prices.", "zh": ""}
    ],
    questions: [],
    note: '原文来自 PDF《四级听力原文2016-2025》第 220-226 页（按标题边界提取，未混入第2套）；OCR 提取、未逐字核对，待核验；音频与原文是否一致未核实。'
  },
{
    id: 'official-2016-06-cet4-s1-secA-nr1',
    hidden: true,
    source: 'official', level: 'CET4', year: '2016', month: '06', setNo: 1,
    part: 'Section A - News Report 1', type: '短篇新闻',
    questionNo: 'Q1-Q2',
    title: '2016年6月四级听力第一套 - Section A - News Report 1',
    audio: 'assets/audio/2016年06月四级听力音频第1套.mp3',
    audioMatch: 'unverified',
    transcript: [
      { en: "The International Labour Organization says the number of people without jobs is increasing.", zh: "" },
      { en: "In its latest update on global employment trends, the agency says projections of the number of unemployed people this year range from 210 million to nearly 240 million people.", zh: "" },
      { en: "The report warns that 200 million poor workers are at risk of joining the ranks of people living on less than two dollars per day in the past three years.", zh: "" },
      { en: "The Director-General of the International Labour Organization Juan Somavia notes that some countries have taken measures to address the effects of the global crisis.", zh: "" },
      { en: "However, he points out that many countries have not done so.", zh: "" },
      { en: "And based on past experiences, it takes four to five years after economic recovery for unemployment to return to pre-crisis levels.", zh: "" },
      { en: "Mr. Somavia says the International Labour Organization is proposing a global jobs agreement to deal with unemployment.", zh: "" },
      { en: "\"Its key objective is to place at the center of recovery efforts, measures that would generate higher levels of employment and provide basic social protection for the most vulnerable.\"", zh: "" }
    ],
    questions: [
      "Q1: What is the news report mainly about?",
      "Q2: What does Juan Somavia, Director-General of the International Labour Organization say?"
    ],
    note: 'OCR 提取文本，未逐字核对，非“已验证真题”；内容待核验。音频为整卷，Section A 位于开头，需自行定位。'
  },
{
    id: 'official-2016-06-cet4-s1-secA-nr2',
    hidden: true,
    source: 'official', level: 'CET4', year: '2016', month: '06', setNo: 1,
    part: 'Section A - News Report 2', type: '短篇新闻',
    questionNo: 'Q3-Q4',
    title: '2016年6月四级听力第一套 - Section A - News Report 2',
    audio: 'assets/audio/2016年06月四级听力音频第1套.mp3',
    audioMatch: 'unverified',
    transcript: [
      { en: "Big fast food chains in New York City have started to obey a first-of-its-kind rule requiring them to post calorie counts right on the menu.", zh: "" },
      { en: "Cathy Nonas is with the New York City Department of Health.", zh: "" },
      { en: "\"We wanted to give people an opportunity to actually see the calories before they purchase the food and make a decision, an informed decision that if they want to make the healthier choice, if they want to eat fewer calories, they can.", zh: "" },
      { en: "And we expect this will have a huge impact on obesity.", zh: "" },
      { en: "And of course, if it has an impact on obesity, it will have an impact on diabetes and heart disease and high blood pressure.\"", zh: "" },
      { en: "The new rules were introduced as part of an anti-obesity campaign that also includes a restaurants that serve standardised portion sizes and have fifteen or more locations nationwide.", zh: "" },
      { en: "Starting last Saturday, chains big enough to fall under the rule will face penalties of up to 2000 dollars for not showing calorie information in a prominent spot on their menus, preferably next to the price.", zh: "" }
    ],
    questions: [
      "Q3: What are big fast food chains in New York City required to do according to the new rule?",
      "Q4: What will happen to big restaurant chains that violate the new rule?"
    ],
    note: 'OCR 提取文本，未逐字核对，非“已验证真题”；内容待核验。其中 “includes a restaurants” 保留原样（存疑，待核对）。'
  },
{
    id: 'official-2016-06-cet4-s1-secA-nr3',
    hidden: true,
    source: 'official', level: 'CET4', year: '2016', month: '06', setNo: 1,
    part: 'Section A - News Report 3', type: '短篇新闻',
    questionNo: 'Q5-Q7',
    title: '2016年6月四级听力第一套 - Section A - News Report 3',
    audio: 'assets/audio/2016年06月四级听力音频第1套.mp3',
    audioMatch: 'unverified',
    transcript: [
      { en: "Almost all companies recognize the importance of innovation today, but not many are able to integrate innovation into their business.", zh: "" },
      { en: "A commentary in the Shanghai Daily points out that innovation doesn't mean piles of documents.", zh: "" },
      { en: "It is something more practical.", zh: "" },
      { en: "The article says many people tend to assume that innovation just means creating something new, but actually it's more than that.", zh: "" },
      { en: "It's an attitude of doing things.", zh: "" },
      { en: "A company should find ways to innovate not just in products but also in functions, business models and processes.", zh: "" },
      { en: "The article cites the global giant Procter & Gamble as an example, saying a real innovative company should develop an innovation culture and use it as a primary tool for success.", zh: "" },
      { en: "Procter & Gamble has a '\"Corporate Innovation Fund\" which offers big rewards for high-risk ideas that succeed.", zh: "" },
      { en: "It also has a special innovation facility for its employees.", zh: "" },
      { en: "Sometimes its employees are released from their daily jobs for weeks and spend their time interacting in the innovation facility instead.", zh: "" },
      { en: "In conclusion, the article says innovative ideas alone do not ensure success.", zh: "" },
      { en: "It's pointless unless there is a repeatable process in place to turn inspiration into financial performance.", zh: "" }
    ],
    questions: [
      "Q5: What is the problem with many companies according to the news report?",
      "Q6: What do many people tend to think of innovation?",
      "Q7: What does the company Procter&Gamble owe its success to?"
    ],
    note: 'OCR 提取文本，未逐字核对，非“已验证真题”；内容待核验。其中多余引号 `\'"Corporate Innovation Fund"` 保留原样（存疑，待核对）。'
  }
];
