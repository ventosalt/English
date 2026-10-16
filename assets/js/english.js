/* 英语学习页 —— 四级/六级备考（CET-4/CET-6）
   说明：页面内所有练习内容均为【原创示例】，不含任何官方真题。
   数据保存在浏览器 localStorage（键名 workspace-english）。 */
(function () {
  'use strict';

  var KEY = 'workspace-english';

  /* ===================== 原创内容数据（非真题） ===================== */

  var PLAN = [
    { k: 'vocab', label: '词汇与短语复习', def: 6 },
    { k: 'listening', label: '听力训练', def: 4 },
    { k: 'reading', label: '阅读理解', def: 4 },
    { k: 'translation', label: '翻译专项', def: 3 },
    { k: 'writing', label: '写作专项', def: 2 },
    { k: 'review', label: '错题 / 单词复习', def: 1 }
  ];

  var SEED_WORDS = [
    { type: 'word', level: 'CET4', term: 'abandon', phonetic: '/əˈbændən/', meaning: 'v. 放弃；抛弃', example: 'He abandoned the plan halfway.' },
    { type: 'word', level: 'CET4', term: 'achieve', phonetic: '/əˈtʃiːv/', meaning: 'v. 实现；达到', example: 'She achieved her goal at last.' },
    { type: 'word', level: 'CET4', term: 'approach', phonetic: '/əˈprəʊtʃ/', meaning: 'n. 方法；v. 接近', example: 'a new approach to learning' },
    { type: 'word', level: 'CET4', term: 'significant', phonetic: '/sɪɡˈnɪfɪkənt/', meaning: 'adj. 重要的；显著的', example: 'a significant change' },
    { type: 'word', level: 'CET4', term: 'consequence', phonetic: '/ˈkɒnsɪkwəns/', meaning: 'n. 结果；后果', example: 'the consequences of our choices' },
    { type: 'word', level: 'CET4', term: 'distinguish', phonetic: '/dɪˈstɪŋɡwɪʃ/', meaning: 'v. 区分；辨别', example: 'distinguish right from wrong' },
    { type: 'word', level: 'CET4', term: 'contribute', phonetic: '/kənˈtrɪbjuːt/', meaning: 'v. 贡献；促成', example: 'contribute to society' },
    { type: 'word', level: 'CET6', term: 'phenomenon', phonetic: '/fəˈnɒmɪnən/', meaning: 'n. 现象', example: 'a common social phenomenon' },
    { type: 'word', level: 'CET6', term: 'substantial', phonetic: '/səbˈstænʃl/', meaning: 'adj. 大量的；实质的', example: 'substantial evidence' },
    { type: 'word', level: 'CET6', term: 'comprehensive', phonetic: '/ˌkɒmprɪˈhensɪv/', meaning: 'adj. 全面的；综合的', example: 'a comprehensive plan' },
    { type: 'word', level: 'CET6', term: 'undertake', phonetic: '/ˌʌndəˈteɪk/', meaning: 'v. 承担；着手', example: 'undertake a difficult task' },
    { type: 'word', level: 'CET6', term: 'simultaneously', phonetic: '/ˌsɪmlˈteɪniəsli/', meaning: 'adv. 同时地', example: 'work and study simultaneously' },
    { type: 'phrase', level: 'CET4', term: 'account for', phonetic: '', meaning: '占（比例）；解释', example: 'Technology accounts for much of the growth.' },
    { type: 'phrase', level: 'CET4', term: 'be exposed to', phonetic: '', meaning: '接触；暴露于', example: 'Students are exposed to new ideas.' },
    { type: 'phrase', level: 'CET4', term: 'in terms of', phonetic: '', meaning: '就……而言', example: 'In terms of cost, it is acceptable.' },
    { type: 'phrase', level: 'CET6', term: 'play a vital role in', phonetic: '', meaning: '在……中起重要作用', example: 'Parents play a vital role in education.' }
  ];

  var READING = [
    {
      id: 'R1', type: '选词填空',
      passage: 'Many students find it hard to ___ (1) their time between study and rest. A good ___ (2) is to make a simple plan every morning.',
      questions: ['(1) A. balance   B. borrow   C. blame   D. break', '(2) A. mistake   B. method   C. message   D. memory'],
      answer: '(1) A  balance；(2) B  method',
      tip: '先判断词性，再结合句意；"balance … between" 是固定搭配。'
    },
    {
      id: 'R2', type: '仔细阅读',
      passage: "Reading widely does more than enlarge vocabulary. It also trains readers to follow an author's logic and to notice how ideas are connected. That is why many teachers encourage students to read at least twenty minutes a day.",
      questions: ['1. What is the passage mainly about?', '2. What do many teachers encourage students to do?'],
      answer: '1. The benefits of reading widely.  2. To read at least twenty minutes a day.',
      tip: '先看题干关键词，再回原文定位；主旨看首尾句。'
    },
    {
      id: 'R3', type: '长篇匹配',
      passage: '（题型说明）长篇匹配题给出一篇长文与若干陈述，要求将陈述与段落匹配。常见做法：先划出陈述中的关键词（人名、数字、专有名词），再逐段扫描比对。',
      questions: ['技巧：如何快速匹配陈述与段落？'],
      answer: '先圈定陈述中的人名、数字、专有名词等易定位信息，再逐段扫描比对。',
      tip: '同义替换是匹配题的核心难点。'
    }
  ];

  var TRANSLATION = [
    { id: 'T1', theme: '中国文化', zh: '越来越多来自不同国家的人对中国文化产生了浓厚的兴趣。', ref: 'More and more people from different countries have developed a strong interest in Chinese culture.', tips: ['“越来越多” 可用 more and more 或 a growing number of', '“对……产生兴趣” 用 take / develop an interest in…'] },
    { id: 'T2', theme: '社会发展', zh: '随着互联网的普及，人们的生活方式发生了巨大的变化。', ref: "With the popularity of the Internet, people's way of life has changed greatly.", tips: ['“随着……” 用 with + 名词短语', '“发生巨大变化” 用 change greatly / undergo great changes'] },
    { id: 'T3', theme: '历史', zh: '这座古城已有上千年的历史，吸引着世界各地的游客。', ref: 'This ancient city has a history of over a thousand years and attracts tourists from all over the world.', tips: ['“有……历史” 用 have a history of…', '“世界各地” 用 from all over the world'] },
    { id: 'T4', theme: '日常生活', zh: '坚持每天锻炼半小时，对我们的健康大有好处。', ref: 'Keeping exercising for half an hour every day is of great benefit to our health.', tips: ['动名词作主语，表示“坚持做某事”', '“对……有好处” 用 be of great benefit to / be good for'] }
  ];

  var WRITING = [
    { id: 'W1', type: '观点表达', title: 'On the Importance of Reading', outline: ['第一段：引出话题，表明阅读的重要性', '第二段：说明理由（开阔视野、提升思维）', '第三段：总结并给出建议'], patterns: ['It is widely believed that …', 'Reading plays a vital role in …', 'In conclusion, we should …'] },
    { id: 'W2', type: '现象分析', title: 'On the Growing Use of Smartphones', outline: ['第一段：描述现象', '第二段：分析原因与影响', '第三段：提出看法或建议'], patterns: ['In recent years, … has become increasingly common.', 'There are several reasons for this phenomenon.', 'Therefore, it is necessary for us to …'] },
    { id: 'W3', type: '问题解决', title: 'How to Improve Time Management', outline: ['第一段：提出问题', '第二段：给出解决方法', '第三段：总结'], patterns: ['Effective measures should be taken to …', 'One useful way is to …', 'Only in this way can we …'] }
  ];

  var WRITE_CHECKS = ['结构清晰', '语法正确', '词汇多样', '逻辑连贯'];

  var SPEAKING = [
    { id: 'S1', scene: '点餐 Ordering Food', phrases: ['I would like a cup of coffee, please.', 'Could I have the bill, please?'] },
    { id: 'S2', scene: '问路 Asking the Way', phrases: ['Excuse me, how can I get to the train station?', 'Is it far from here?'] },
    { id: 'S3', scene: '自我介绍 Self-introduction', phrases: ['Let me introduce myself. My name is …', 'I am a first-year student majoring in …'] }
  ];

  /* ===================== 工具函数 ===================== */
  function uid() { return 'e' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-3); }
  function pad(n) { return ('0' + n).slice(-2); }
  function fmtDate(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function todayStr() { return fmtDate(new Date()); }
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return fmtDate(d); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ===================== 状态 ===================== */
  function freshPlan() {
    var minutes = {}, done = {};
    PLAN.forEach(function (p) { minutes[p.k] = p.def; done[p.k] = false; });
    return { date: todayStr(), minutes: minutes, done: done };
  }

  function seedWords() {
    return SEED_WORDS.map(function (w) {
      return {
        id: uid(), type: w.type, level: w.level, term: w.term, phonetic: w.phonetic,
        meaning: w.meaning, example: w.example, mastery: 0, stage: 0, due: addDays(1)
      };
    });
  }

  function defaults() {
    return { mode: 'CET4', plan: freshPlan(), words: seedWords(), trans: {}, writes: {}, mistakes: [], done: {}, listen: { logs: [], subs: {}, exports: [], bank: [] } };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw);
      if (!s || typeof s !== 'object') return defaults();
      if (!s.plan) s.plan = freshPlan();
      if (!Array.isArray(s.words)) s.words = seedWords();
      if (!s.trans) s.trans = {};
      if (!s.writes) s.writes = {};
      if (!Array.isArray(s.mistakes)) s.mistakes = [];
      if (!s.done) s.done = {};
      if (!s.listen || typeof s.listen !== 'object') s.listen = { logs: [], subs: {}, exports: [], bank: [] };
      if (!Array.isArray(s.listen.logs)) s.listen.logs = [];
      if (!s.listen.subs) s.listen.subs = {};
      if (!Array.isArray(s.listen.exports)) s.listen.exports = [];
      if (!Array.isArray(s.listen.bank)) s.listen.bank = [];
      if (!s.mode) s.mode = 'CET4';
      return s;
    } catch (e) { return defaults(); }
  }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }

  var state = load();

  /* 每天自动重置计划 */
  (function resetPlanIfNewDay() {
    if (state.plan.date !== todayStr()) state.plan = freshPlan();
  })();

  /* ===================== 元素引用 ===================== */
  var $ = function (id) { return document.getElementById(id); };
  var subnavEl = $('subnav');
  var planListEl = $('planList');
  var planBarEl = $('planBar');
  var planTextEl = $('planText');
  var planTotalEl = $('planTotal');
  var modeSwitchEl = $('modeSwitch');
  var vocabListEl = $('vocabList');
  var reviewListEl = $('reviewList');
  var readingListEl = $('readingList');
  var translationListEl = $('translationList');
  var writingListEl = $('writingList');
  var speakingListEl = $('speakingList');
  var mistakeListEl = $('mistakeList');
  var toastEl = $('toast');
  var sidebar = $('sidebar');
  var overlay = $('overlay');
  var menuBtn = $('menuBtn');
  var themeToggle = $('themeToggle');
  var themeIcon = $('themeIcon');
  var themeText = $('themeText');
  var dateEl = $('pageDate');

  var vocabFilter = 'all';

  /* ===================== 统计 ===================== */
  function dueWords() { return state.words.filter(function (w) { return w.due && w.due <= todayStr(); }); }

  function renderStats() {
    $('statWords').textContent = state.words.length;
    $('statReview').textContent = dueWords().length;
    $('statMistakes').textContent = state.mistakes.length;
    var items = PLAN.length, done = PLAN.filter(function (p) { return state.plan.done[p.k]; }).length;
    $('statProgress').textContent = Math.round(done / items * 100) + '%';
  }

  /* ===================== 每日计划 ===================== */
  function renderPlan() {
    planListEl.innerHTML = '';
    var total = 0, done = 0;
    PLAN.forEach(function (p) {
      total += Number(state.plan.minutes[p.k]) || 0;
      if (state.plan.done[p.k]) done++;
      var li = document.createElement('div');
      li.className = 'plan-item' + (state.plan.done[p.k] ? ' done' : '');
      li.innerHTML =
        '<button type="button" class="plan-check' + (state.plan.done[p.k] ? ' done' : '') + '" data-k="' + p.k + '" aria-label="勾选">' + (state.plan.done[p.k] ? '✓' : '') + '</button>' +
        '<span class="plan-label">' + p.label + '</span>' +
        '<span class="plan-min"><input type="number" min="0" max="120" value="' + (state.plan.minutes[p.k] || 0) + '" data-k="' + p.k + '"> 分钟</span>';
      planListEl.appendChild(li);
    });
    planTotalEl.textContent = '约 ' + total + ' 分钟';
    planBarEl.style.width = Math.round(done / PLAN.length * 100) + '%';
    planTextEl.textContent = done + ' / ' + PLAN.length + ' 已完成';
  }

  planListEl.addEventListener('click', function (e) {
    var b = e.target.closest('.plan-check');
    if (!b) return;
    var k = b.dataset.k;
    state.plan.done[k] = !state.plan.done[k];
    save(); renderPlan(); renderStats();
  });

  planListEl.addEventListener('change', function (e) {
    var inp = e.target.closest('.plan-min input');
    if (!inp) return;
    var v = Math.max(0, Math.min(120, Number(inp.value) || 0));
    state.plan.minutes[inp.dataset.k] = v;
    save(); renderPlan();
  });

  /* ===================== 词汇 ===================== */
  function renderVocab() {
    var list = state.words.slice();
    if (vocabFilter === 'word' || vocabFilter === 'phrase') list = list.filter(function (w) { return w.type === vocabFilter; });
    else if (vocabFilter === 'CET4' || vocabFilter === 'CET6') list = list.filter(function (w) { return w.level === vocabFilter; });

    $('vocabCount').textContent = state.words.length + ' 条';
    vocabListEl.innerHTML = '';

    if (!list.length) {
      vocabListEl.innerHTML = '<li class="empty-item">暂无词条，先添加一个吧～</li>';
      return;
    }

    list.forEach(function (w) {
      var li = document.createElement('li');
      li.className = 'vocab-item';
      var masteryBtns = ['未', '模糊', '掌握'].map(function (t, i) {
        return '<button type="button" data-m="' + i + '" class="' + (w.mastery === i ? 'on-' + i : '') + '">' + t + '</button>';
      }).join('');
      li.innerHTML =
        '<div class="vi-main">' +
          '<div class="vi-term">' + esc(w.term) + (w.phonetic ? '<span class="vi-ph">' + esc(w.phonetic) + '</span>' : '') + '</div>' +
          '<div class="vi-meaning">' + esc(w.meaning || '（待补充释义）') + '</div>' +
          (w.example ? '<div class="vi-ex">' + esc(w.example) + '</div>' : '') +
        '</div>' +
        '<div class="vi-tags">' +
          '<span class="chip-level">' + w.level + '</span>' +
          '<span class="mastery">' + masteryBtns + '</span>' +
          '<button type="button" class="icon-del" title="删除">🗑</button>' +
        '</div>';

      li.querySelector('.mastery').addEventListener('click', function (e) {
        var b = e.target.closest('button'); if (!b) return;
        w.mastery = Number(b.dataset.m); save(); renderVocab(); renderStats();
      });
      li.querySelector('.icon-del').addEventListener('click', function () {
        state.words = state.words.filter(function (x) { return x.id !== w.id; });
        save(); renderVocab(); renderReview(); renderStats();
      });
      vocabListEl.appendChild(li);
    });
  }

  document.getElementById('vocabFilter').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    vocabFilter = b.dataset.f;
    Array.prototype.forEach.call(this.querySelectorAll('button'), function (x) { x.classList.toggle('active', x === b); });
    renderVocab();
  });

  document.getElementById('wordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var term = $('wTerm').value.trim();
    if (!term) { toast('请输入英文'); return; }
    state.words.unshift({
      id: uid(), type: $('wType').value, level: $('wLevel').value, term: term,
      phonetic: $('wPhonetic').value.trim(), meaning: $('wMeaning').value.trim(),
      example: $('wExample').value.trim(), mastery: 0, stage: 0, due: addDays(1)
    });
    save(); renderVocab(); renderReview(); renderStats();
    this.reset();
    toast('已添加：' + term);
  });

  /* ===================== 复习清单 ===================== */
  function renderReview() {
    var due = dueWords().sort(function (a, b) { return a.due < b.due ? -1 : 1; });
    $('reviewCount').textContent = due.length + ' 项';
    reviewListEl.innerHTML = '';
    if (!due.length) {
      reviewListEl.innerHTML = '<li class="empty-item">今日没有待复习的词条，很棒！</li>';
      return;
    }
    due.forEach(function (w) {
      var li = document.createElement('li');
      li.innerHTML =
        '<div class="rv-main"><div class="vi-term">' + esc(w.term) + '</div>' +
        '<div class="rv-due">' + esc(w.meaning || '') + ' · 计划复习：' + w.due + '</div></div>' +
        '<button type="button" class="mini-btn">已复习</button>';
      li.querySelector('.mini-btn').addEventListener('click', function () {
        var intervals = [1, 3, 7];
        w.stage = (w.stage || 0) + 1;
        w.due = w.stage >= intervals.length ? null : addDays(intervals[w.stage]);
        save(); renderReview(); renderStats();
        toast(w.due ? ('已复习，下次：' + w.due) : '已复习（完成本轮）');
      });
      reviewListEl.appendChild(li);
    });
  }

  /* ===================== 阅读 ===================== */
  function renderReading() {
    readingListEl.innerHTML = '';
    READING.forEach(function (it) {
      var qs = it.questions.map(function (q) { return '<div class="pq">' + esc(q) + '</div>'; }).join('');
      var div = document.createElement('div');
      div.className = 'pcard';
      div.innerHTML =
        '<div class="pcard-head"><span class="ptag">' + it.type + '</span></div>' +
        '<div class="ptext">' + esc(it.passage) + '</div>' + qs +
        '<div class="pcard-actions">' +
          '<button type="button" class="btn-ghost toggle-ans">显示参考答案</button>' +
          '<button type="button" class="mini-btn done-btn">标记已练</button>' +
        '</div>' +
        '<div class="answer-box" hidden>' +
          '<div class="ab-label">参考答案</div>' + esc(it.answer) +
          '<div class="pq">技巧：' + esc(it.tip) + '</div>' +
        '</div>';
      wireCard(div, 'read:' + it.id);
      readingListEl.appendChild(div);
    });
  }

  /* ===================== 翻译 ===================== */
  function renderTranslation() {
    var attemptCount = Object.keys(state.trans).filter(function (k) { return (state.trans[k] || '').trim(); }).length;
    $('transCount').textContent = attemptCount + ' 篇';
    translationListEl.innerHTML = '';
    TRANSLATION.forEach(function (it) {
      var tips = it.tips.map(function (t) { return '<div class="pq">· ' + esc(t) + '</div>'; }).join('');
      var div = document.createElement('div');
      div.className = 'pcard';
      div.innerHTML =
        '<div class="pcard-head"><span class="ptag">' + esc(it.theme) + '</span><span class="ptag alt">汉译英</span></div>' +
        '<div class="trans-zh">' + esc(it.zh) + '</div>' +
        '<label class="field full" style="margin-bottom:10px"><span>我的译文</span>' +
          '<textarea class="trans-input" data-id="' + it.id + '" placeholder="在此写下你的英文翻译…">' + esc(state.trans[it.id] || '') + '</textarea></label>' +
        '<div class="pcard-actions">' +
          '<button type="button" class="mini-btn save-trans">保存译文</button>' +
          '<button type="button" class="btn-ghost toggle-ans">查看参考与建议</button>' +
        '</div>' +
        '<div class="answer-box" hidden>' +
          '<div class="ab-label">参考译文</div>' + esc(it.ref) +
          '<div class="ab-label" style="margin-top:8px">表达建议</div>' + tips +
        '</div>';

      div.querySelector('.toggle-ans').addEventListener('click', function () {
        var box = div.querySelector('.answer-box');
        box.hidden = !box.hidden;
      });
      div.querySelector('.save-trans').addEventListener('click', function () {
        state.trans[it.id] = div.querySelector('.trans-input').value;
        save(); renderTranslation();
        toast('已保存你的译文');
      });
      translationListEl.appendChild(div);
    });
  }

  /* ===================== 写作 ===================== */
  function renderWriting() {
    var n = Object.keys(state.writes).filter(function (k) { return (state.writes[k] && state.writes[k].text || '').trim(); }).length;
    $('writeCount').textContent = n + ' 篇';
    writingListEl.innerHTML = '';
    WRITING.forEach(function (it) {
      var saved = state.writes[it.id] || { text: '', checks: {} };
      var outline = it.outline.map(function (o) { return '<li>' + esc(o) + '</li>'; }).join('');
      var patterns = it.patterns.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
      var checks = WRITE_CHECKS.map(function (c) {
        return '<label><input type="checkbox" data-c="' + esc(c) + '"' + (saved.checks && saved.checks[c] ? ' checked' : '') + '> ' + esc(c) + '</label>';
      }).join('');

      var div = document.createElement('div');
      div.className = 'pcard';
      div.innerHTML =
        '<div class="pcard-head"><span class="ptag">' + esc(it.type) + '</span><strong>' + esc(it.title) + '</strong></div>' +
        '<div class="ab-label">结构提纲</div><ol class="w-outline">' + outline + '</ol>' +
        '<div class="ab-label">万能句型</div><ul class="w-patterns">' + patterns + '</ul>' +
        '<label class="field full" style="margin:6px 0 10px"><span>我的作文</span>' +
          '<textarea class="write-input" data-id="' + it.id + '" placeholder="在此写下你的作文…">' + esc(saved.text || '') + '</textarea></label>' +
        '<div class="w-check">' + checks + '</div>' +
        '<div class="pcard-actions"><button type="button" class="mini-btn save-write">保存作文</button></div>';

      div.querySelector('.save-write').addEventListener('click', function () {
        var checksObj = {};
        Array.prototype.forEach.call(div.querySelectorAll('.w-check input'), function (cb) { checksObj[cb.dataset.c] = cb.checked; });
        state.writes[it.id] = { text: div.querySelector('.write-input').value, checks: checksObj };
        save(); renderWriting();
        toast('已保存作文');
      });
      writingListEl.appendChild(div);
    });
  }

  /* ===================== 错题本 ===================== */
  function renderMistakes() {
    $('mistakeCount').textContent = state.mistakes.length + ' 条';
    mistakeListEl.innerHTML = '';
    if (!state.mistakes.length) {
      mistakeListEl.innerHTML = '<li class="empty-item">还没有记录。用正版真题练习后，把错题记在这里复盘吧。</li>';
      return;
    }
    state.mistakes.slice().reverse().forEach(function (m) {
      var li = document.createElement('li');
      li.innerHTML =
        '<div class="rv-main">' +
          '<div class="m-item-top"><strong>' + esc(m.date) + ' · ' + esc(m.level) + ' · ' + esc(m.part) + '</strong>' +
            (m.score ? '<span class="chip-level">' + esc(m.score) + '</span>' : '') + '</div>' +
          (m.question ? '<div class="m-detail">错题：' + esc(m.question) + '</div>' : '') +
          (m.reason ? '<div class="m-detail">原因：' + esc(m.reason) + '</div>' : '') +
          (m.fix ? '<div class="m-detail">正确思路：' + esc(m.fix) + '</div>' : '') +
          (m.review ? '<div class="rv-due">复习日期：' + esc(m.review) + '</div>' : '') +
        '</div>' +
        '<button type="button" class="icon-del" title="删除">🗑</button>';
      li.querySelector('.icon-del').addEventListener('click', function () {
        state.mistakes = state.mistakes.filter(function (x) { return x.id !== m.id; });
        save(); renderMistakes(); renderStats(); toast('已删除该错题记录');
      });
      mistakeListEl.appendChild(li);
    });
  }

  document.getElementById('mistakeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    state.mistakes.push({
      id: uid(), date: $('mDate').value || todayStr(), level: $('mLevel').value, part: $('mPart').value,
      score: $('mScore').value.trim(), question: $('mQuestion').value.trim(),
      reason: $('mReason').value.trim(), fix: $('mFix').value.trim(), review: $('mReview').value
    });
    save(); renderMistakes(); renderStats();
    this.reset(); $('mDate').value = todayStr();
    toast('已保存错题记录');
  });

  /* ===================== 口语（辅助） ===================== */
  function renderSpeaking() {
    speakingListEl.innerHTML = '';
    SPEAKING.forEach(function (it) {
      var phrases = it.phrases.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('');
      var div = document.createElement('div');
      div.className = 'pcard';
      div.innerHTML =
        '<div class="pcard-head"><span class="ptag">' + esc(it.scene) + '</span></div>' +
        '<ul class="w-patterns">' + phrases + '</ul>' +
        '<div class="pcard-actions"><button type="button" class="mini-btn done-btn">标记已练</button></div>';
      wireCard(div, 'speak:' + it.id);
      speakingListEl.appendChild(div);
    });
  }

  /* ===================== 练习卡通用交互 ===================== */
  function wireCard(div, key) {
    var toggle = div.querySelector('.toggle-ans');
    if (toggle) toggle.addEventListener('click', function () {
      var box = div.querySelector('.answer-box');
      box.hidden = !box.hidden;
    });
    var done = div.querySelector('.done-btn');
    if (done) {
      if (state.done[key]) { done.textContent = '✓ 已练'; done.classList.add('is-done'); }
      done.addEventListener('click', function () {
        state.done[key] = !state.done[key];
        save();
        done.textContent = state.done[key] ? '✓ 已练' : '标记已练';
        done.classList.toggle('is-done', state.done[key]);
        if (state.done[key]) toast('已记录练习');
      });
    }
  }

  /* ===================== 子导航 ===================== */
  subnavEl.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    var sec = b.dataset.sec;
    Array.prototype.forEach.call(subnavEl.querySelectorAll('button'), function (x) { x.classList.toggle('active', x === b); });
    Array.prototype.forEach.call(document.querySelectorAll('.esec'), function (s) {
      s.hidden = s.dataset.sec !== sec;
    });
  });

  /* ===================== 备考模式 ===================== */
  function setMode(m) {
    state.mode = m;
    Array.prototype.forEach.call(modeSwitchEl.querySelectorAll('button'), function (b) {
      b.classList.toggle('active', b.dataset.mode === m);
    });
    save();
  }
  modeSwitchEl.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    setMode(b.dataset.mode);
    toast('已切换到' + (b.dataset.mode === 'CET4' ? '四级 CET-4' : '六级 CET-6'));
  });

  /* ===================== 主题 / 侧边栏 / 提示 / 日期 ===================== */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var dark = theme === 'dark';
    themeIcon.textContent = dark ? '☀️' : '🌙';
    themeText.textContent = dark ? '日间模式' : '夜间模式';
  }
  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('workspace-theme'); } catch (e) {}
    if (saved !== 'light' && saved !== 'dark') saved = 'light';
    applyTheme(saved);
  }
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('workspace-theme', next); } catch (e) {}
  });

  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('show'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('show'); }
  menuBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);

  var toastTimer = null;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2000);
  }

  function renderDate() {
    try { dateEl.textContent = new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }); }
    catch (e) { dateEl.textContent = new Date().toDateString(); }
  }

  /* ===================== 四六级听力精听室 ===================== */
  var BANK = (window.LISTENING_BANK || []).slice();
  var MATCH_LABEL = { unknown: '未确认', unverified: '待核验', matched: '已核对一致', mismatch: '不一致' };
  function allTracks() { return BANK.concat(state.listen.bank || []).filter(function (t) { return !t.hidden; }); }
  function isUserTrack(id) { return (state.listen.bank || []).some(function (t) { return t.id === id; }); }
  function yearOf(t) { var m = String(t.year || '').match(/^(\d{4})/); return m ? m[1] : (t.year || '原创'); }
  function monthOf(t) { if (t.month) return String(t.month); var m = String(t.year || '').match(/^\d{4}-(\d{1,2})/); return m ? ('0' + m[1]).slice(-2) : ''; }
  function setOf(t) { if (t.setNo != null && t.setNo !== '') return String(t.setNo); var m = String(t.paper || '').match(/(\d+)/); return m ? m[1] : ''; }
  var lr = { track: null, step: 1, revealed: false, timerId: null, timerSec: 0, audioReady: false, localUrl: null,
             isLocal: false, loadTimer: null,
             ab: { a: null, b: null, on: false }, sLoop: { on: false, start: null, end: null, limit: 1, left: 0 }, timing: [] };

  var lrEls = {
    level: $('lrLevel'), year: $('lrYear'), month: $('lrMonth'), set: $('lrSet'), type: $('lrType'), source: $('lrSource'),
    trackSel: $('lrTrack'), badge: $('lrBadge'), srcNote: $('lrSrcNote'), steps: $('lrSteps'),
    hint: $('lrHint'), actions: $('lrActions'), dictation: $('lrDictation'), timer: $('lrTimer'),
    play: $('lrPlay'), replay: $('lrReplay'), rate: $('lrRate'), time: $('lrTime'),
    file: $('lrFile'), fileName: $('lrFileName'), noAudio: $('lrNoAudio'), audio: $('lrAudio'), localClear: $('lrLocalClear'),
    transcript: $('lrTranscript'), sentences: $('lrSentences'), review: $('lrReview'),
    questions: $('lrQuestions'), questionList: $('lrQuestionList'),
    logList: $('lrLogList'), reviewList: $('lrReviewList'),
    rvWords: $('rvWords'), rvMissed: $('rvMissed'), rvLinking: $('rvLinking'), rvUnclear: $('rvUnclear'), rvDone: $('rvDone'), rvSave: $('rvSave'),
    allLoop: $('lrAllLoop'), abLoop: $('lrAbLoop'), setA: $('lrSetA'), setB: $('lrSetB'), clearAB: $('lrClearAB'), abInfo: $('lrAbInfo'), repeat: $('lrRepeat'),
    subFile: $('lrSubFile'), subState: $('lrSubState'), subClear: $('lrSubClear'),
    pasteWrap: $('lrPasteWrap'), pasteText: $('lrPasteText'), pasteSave: $('lrPasteSave'), pasteClear: $('lrPasteClear'),
    exportWrap: $('lrExportWrap'), exLevel: $('exLevel'), exYear: $('exYear'), exMonth: $('exMonth'), exSet: $('exSet'),
    exPart: $('exPart'), exQ: $('exQ'), exTitle: $('exTitle'), exAudio: $('exAudio'), exMatch: $('exMatch'),
    exBuild: $('exBuild'), exSaveBank: $('exSaveBank'), exCopy: $('exCopy'), exDownload: $('exDownload'), exOut: $('exOut'), exList: $('exList')
  };

  function fmtSec(s) { s = Math.max(0, Math.floor(s)); return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }

  function lrFiltered() {
    return allTracks().filter(function (t) {
      if (lrEls.level.value !== 'all' && t.level !== lrEls.level.value) return false;
      if (lrEls.year.value !== 'all' && yearOf(t) !== lrEls.year.value) return false;
      if (lrEls.month && lrEls.month.value !== 'all' && monthOf(t) !== lrEls.month.value) return false;
      if (lrEls.set && lrEls.set.value !== 'all' && setOf(t) !== lrEls.set.value) return false;
      if (lrEls.type.value !== 'all' && t.type !== lrEls.type.value) return false;
      if (lrEls.source.value !== 'all' && t.source !== lrEls.source.value) return false;
      return true;
    });
  }

  function lrFillFilter() {
    var years = [], months = [], sets = [], types = [];
    allTracks().forEach(function (t) {
      var y = yearOf(t); if (y && years.indexOf(y) === -1) years.push(y);
      var mo = monthOf(t); if (mo && months.indexOf(mo) === -1) months.push(mo);
      var se = setOf(t); if (se && sets.indexOf(se) === -1) sets.push(se);
      if (types.indexOf(t.type) === -1) types.push(t.type);
    });
    years.sort();
    months.sort();
    sets.sort(function (a, b) { return Number(a) - Number(b); });
    function fill(sel, arr) {
      if (!sel) return;
      var cur = sel.value;
      sel.innerHTML = '<option value="all">全部</option>';
      arr.forEach(function (v) { var o = document.createElement('option'); o.value = v; o.textContent = v; sel.appendChild(o); });
      if (cur && (cur === 'all' || arr.indexOf(cur) !== -1)) sel.value = cur;
    }
    fill(lrEls.year, years);
    fill(lrEls.month, months);
    fill(lrEls.set, sets);
    fill(lrEls.type, types);
  }

  function lrRenderTrackList() {
    var list = lrFiltered();
    var cur = lr.track ? lr.track.id : null;
    lrEls.trackSel.innerHTML = '';
    if (!list.length) {
      lrEls.trackSel.innerHTML = '<option value="">（当前筛选下没有素材）</option>';
      lr.track = null; lrRenderPanel(); return;
    }
    list.forEach(function (t) {
      var o = document.createElement('option'); o.value = t.id;
      o.textContent = (isUserTrack(t.id) ? '本页· ' : '') + (t.level === 'CET6' ? '六级' : '四级') + ' · ' + t.type + ' · ' + t.title;
      lrEls.trackSel.appendChild(o);
    });
    var pick = list.filter(function (t) { return t.id === cur; })[0] || list[0];
    lrEls.trackSel.value = pick.id;
    lrSelectTrack(pick.id);
  }

  function setAudioSrc(src) {
    // 切回题库/在线音频：清除本地音频状态与看门狗
    if (lr.loadTimer) { clearTimeout(lr.loadTimer); lr.loadTimer = null; }
    if (lr.localUrl) { try { URL.revokeObjectURL(lr.localUrl); } catch (e) {} lr.localUrl = null; }
    lr.isLocal = false;
    if (lrEls.localClear) lrEls.localClear.hidden = true;
    if (lrEls.file) lrEls.file.value = '';
    if (lrEls.fileName) lrEls.fileName.textContent = '';
    if (src) { lrEls.audio.src = src; lr.audioReady = true; }
    else { lrEls.audio.removeAttribute('src'); lr.audioReady = false; try { lrEls.audio.load(); } catch (e) {} }
    lrEls.play.disabled = !lr.audioReady;
    lrEls.replay.disabled = !lr.audioReady;
    lrEls.noAudio.hidden = lr.audioReady;
    if (!lr.audioReady) lrEls.noAudio.textContent = '该题暂无音频：请用「本地加载音频」选择你【合法取得】的音频，或将文件放入 assets/audio/ 并在题库中填写路径。（本项目不附带任何真题音频）';
    lrEls.time.textContent = '00:00 / 00:00';
    lrEls.play.textContent = '▶ 播放';
  }

  /* 本地音频加载失败：给出明确提示（不再一直停在 00:00 / 00:00） */
  function lrLocalFail(msg) {
    if (lr.loadTimer) { clearTimeout(lr.loadTimer); lr.loadTimer = null; }
    lr.audioReady = false;
    if (lrEls.play) lrEls.play.disabled = true;
    if (lrEls.replay) lrEls.replay.disabled = true;
    if (lrEls.noAudio) { lrEls.noAudio.hidden = false; lrEls.noAudio.textContent = msg; }
  }

  /* 仅提示、不破坏当前播放（例如选错文件类型时） */
  function lrWarn(msg) {
    if (lrEls.noAudio) { lrEls.noAudio.hidden = false; lrEls.noAudio.textContent = msg; }
    toast(msg);
  }

  function lrSelectTrack(id) {
    lr.track = allTracks().filter(function (t) { return t.id === id; })[0] || null;
    lr.step = 1; lr.revealed = false;
    lr.timing = [];
    lrTimerReset();
    lrResetLoops();
    setAudioSrc(lr.track && lr.track.audio ? lr.track.audio : '');
    lrEls.fileName.textContent = '';
    lrRenderPanel();
  }

  function lrRenderPanel() {
    lrUpdateSubLabel();
    var t = lr.track;
    if (!t) {
      lrEls.badge.textContent = '—'; lrEls.badge.className = 'panel-tag';
      lrEls.srcNote.textContent = ''; lrEls.steps.hidden = true;
      lrEls.hint.textContent = '当前筛选没有可用的听力素材。'; lrEls.actions.innerHTML = '';
      lrEls.dictation.hidden = true; lrEls.review.hidden = true; lrEls.transcript.hidden = true;
      if (lrEls.questions) lrEls.questions.hidden = true;
      return;
    }
    lrEls.steps.hidden = false;
    var src = t.source;
    if (src === 'official') {
      var verified = (t.audioMatch === 'matched');
      lrEls.badge.textContent = verified ? '正式真题' : '正式真题（待核验）';
      lrEls.badge.className = 'lr-badge official';
    }
    else if (src === 'local') { lrEls.badge.textContent = '本地真题音频（待核验）'; lrEls.badge.className = 'lr-badge original'; }
    else { lrEls.badge.textContent = '原创练习'; lrEls.badge.className = 'lr-badge original'; }
    var matchLabel = MATCH_LABEL[t.audioMatch];
    var srcText = src === 'official'
      ? '来源：正式真题（请确认音频与原文来源合法）。'
      : src === 'local'
        ? '来源：本地音频（未核验，非官方标注）。'
        : '来源：原创练习示例（非真题），用于练习精听方法。';
    lrEls.srcNote.textContent = srcText
      + (matchLabel ? ('　匹配状态：' + matchLabel + '。') : '')
      + (t.note ? ('　' + t.note) : '');
    var _hasT = lrTranscriptOf(t).length > 0, _hasA = !!t.audio;
    lrEls.srcNote.textContent += '　资料状态：' + (_hasA && _hasT ? '已找到音频和原文（待核验）'
      : _hasA ? '只有音频（待核验）'
      : _hasT ? '只有 PDF 原文（待核验）'
      : '尚待核验');
    if (lrTranscriptOf(t).length === 0) {
      lrEls.srcNote.textContent += '　⚠️ 缺少完整原文（可用「粘贴 / 编辑原文」或「导入字幕」补充）';
    }
    if (t.audio) {
      var shareN = allTracks().filter(function (x) { return x.audio === t.audio; }).length;
      if (shareN > 1) {
        lrEls.srcNote.textContent += '　⚠️ 该音频为整卷，被 ' + shareN + ' 个条目共用，非本段独立音频';
      }
    }

    Array.prototype.forEach.call(lrEls.steps.children, function (li) {
      var n = Number(li.dataset.step);
      li.classList.toggle('active', n === lr.step);
      li.classList.toggle('done', n < lr.step);
    });

    if (lr.revealed) { lrRenderTranscript(t); lrEls.transcript.hidden = false; }
    else lrEls.transcript.hidden = true;

    lrEls.dictation.hidden = lr.step !== 2;
    lrEls.review.hidden = lr.step !== 5;

    lrRenderQuestions(t);
    lrRenderStep();
    lrRenderLogs();
  }

  function lrRenderQuestions(t) {
    if (!lrEls.questions || !lrEls.questionList) return;
    var qs = (t && t.questions) ? t.questions : [];
    lrEls.questionList.innerHTML = '';
    if (!qs.length) { lrEls.questions.hidden = true; return; }
    lrEls.questions.hidden = false;
    qs.forEach(function (q) {
      var li = document.createElement('li');
      li.textContent = q;
      lrEls.questionList.appendChild(li);
    });
  }

  function lrRenderStep() {
    var hint = '', actions = '';
    if (lr.step === 1) { hint = '第一步 · 盲听：只听不看，音频不显示原文与答案。'; actions = '<button type="button" class="btn-primary" data-lr-next="2">进入听写 →</button>'; }
    else if (lr.step === 2) { hint = '第二步 · 听写：请在【纸上】记录你听到的内容（网页无需输入）。可随时重播。'; actions = '<button type="button" class="btn-primary" data-lr-next="3">进入第二遍 →</button>'; }
    else if (lr.step === 3) { hint = '第三步 · 第二遍：重听同一段，仍不看原文。'; actions = '<button type="button" class="btn-primary" data-lr-next="4">进入对照 →</button>'; }
    else if (lr.step === 4) {
      hint = '第四步 · 对照原文：点击按钮后才会显示原文。';
      actions = lr.revealed ? '<button type="button" class="btn-primary" data-lr-next="5">开始复盘 →</button>'
                            : '<button type="button" class="btn-primary" data-lr-reveal="1">显示听力原文</button>';
    } else { hint = '第五步 · 复盘：记下生词、漏听、连读弱读与不理解的句子，并标记完成情况。'; actions = '<button type="button" class="btn-ghost" data-lr-reset="1">重新开始本段</button>'; }
    lrEls.hint.textContent = hint;
    lrEls.actions.innerHTML = actions;
  }

  function lrRenderTranscript(t) {
    lrEls.sentences.innerHTML = '';
    var tr = lrTranscriptOf(t);
    lr.timing = [];
    if (!tr.length) { lrEls.sentences.innerHTML = '<li class="empty-item">缺少完整原文：该整卷暂无完整原文。可用上方「粘贴 / 编辑原文」或「导入字幕 (.srt/.vtt/.txt)」补充。</li>'; return; }

    var anyStart = tr.some(function (s) { return typeof s.start === 'number'; });
    lr.timing = tr.map(function (s, i) {
      var start = typeof s.start === 'number' ? s.start : null;
      var end = typeof s.end === 'number' ? s.end : (tr[i + 1] && typeof tr[i + 1].start === 'number' ? tr[i + 1].start : null);
      return (start != null && end != null && end > start) ? { start: start, end: end } : null;
    });

    if (!anyStart) {
      var note = document.createElement('li');
      note.className = 'lr-sent-note';
      note.textContent = '该原文未附时间点：可展开「粘贴 / 编辑原文」录入，或用上方「设 A / 设 B + A–B 循环」；也可点「导入字幕」加载 .srt / .vtt。';
      lrEls.sentences.appendChild(note);
    }

    tr.forEach(function (s, i) {
      var li = document.createElement('li');
      li.dataset.i = i;
      var en = document.createElement('div'); en.className = 'en'; en.textContent = s.en;
      li.appendChild(en);
      if (s.zh) { var zh = document.createElement('div'); zh.className = 'zh'; zh.textContent = s.zh; li.appendChild(zh); }
      if (lr.timing[i]) {
        var acts = document.createElement('div'); acts.className = 'lr-sent-actions';
        var b1 = document.createElement('button'); b1.type = 'button'; b1.className = 'mini-btn'; b1.textContent = '▶ 此句';
        b1.addEventListener('click', function () { playSentence(lr.timing[i], false); });
        var b2 = document.createElement('button'); b2.type = 'button'; b2.className = 'mini-btn'; b2.textContent = '🔁 单句循环';
        b2.addEventListener('click', function () { playSentence(lr.timing[i], true); });
        acts.appendChild(b1); acts.appendChild(b2);
        li.appendChild(acts);
      }
      lrEls.sentences.appendChild(li);
    });
  }

  function lrTranscriptOf(t) {
    var imported = state.listen.subs && state.listen.subs[t.id];
    return (imported && imported.length) ? imported : (t.transcript || []);
  }

  function lrHighlight() {
    if (!lr.timing || !lr.timing.length) return;
    var t = lrEls.audio.currentTime, idx = -1;
    for (var i = 0; i < lr.timing.length; i++) { var s = lr.timing[i]; if (s && t >= s.start && t < s.end) { idx = i; break; } }
    var lis = lrEls.sentences.querySelectorAll('li[data-i]');
    Array.prototype.forEach.call(lis, function (li) { li.classList.toggle('active', Number(li.dataset.i) === idx); });
  }

  function lrUpdateSubLabel() {
    if (!lrEls.subState) return;
    if (!lr.track) { lrEls.subState.textContent = ''; return; }
    var imported = state.listen.subs && state.listen.subs[lr.track.id];
    lrEls.subState.textContent = (imported && imported.length)
      ? ('已导入字幕（' + imported.length + ' 句，支持单句循环与同步高亮）')
      : '未导入（使用内置原文）';
  }

  /* 播放器 */
  function lrTogglePlay() {
    if (!lr.audioReady) return;
    if (lrEls.audio.paused) { var p = lrEls.audio.play(); if (p && p.catch) p.catch(function () {}); }
    else lrEls.audio.pause();
  }
  lrEls.play.addEventListener('click', lrTogglePlay);
  lrEls.replay.addEventListener('click', function () { if (!lr.audioReady) return; lrEls.audio.currentTime = 0; var p = lrEls.audio.play(); if (p && p.catch) p.catch(function () {}); });
  lrEls.rate.addEventListener('change', function () { lrEls.audio.playbackRate = Number(lrEls.rate.value); });
  lrEls.audio.addEventListener('play', function () {
    lrEls.play.textContent = '⏸ 暂停';
    if (lr.audioReady && lrEls.noAudio) lrEls.noAudio.hidden = true;
  });
  lrEls.audio.addEventListener('pause', function () { lrEls.play.textContent = '▶ 播放'; });
  lrEls.audio.addEventListener('timeupdate', function () {
    var a = lrEls.audio;
    if (lr.sLoop.on && lr.sLoop.end != null && a.currentTime >= lr.sLoop.end) {
      if (lr.sLoop.limit !== 0) {
        lr.sLoop.left--;
        if (lr.sLoop.left <= 0) { lr.sLoop.on = false; a.currentTime = lr.sLoop.start; a.pause(); }
        else { a.currentTime = lr.sLoop.start; play(); }
      } else { a.currentTime = lr.sLoop.start; play(); }
    } else if (lr.ab.on && lr.ab.a != null && lr.ab.b != null && (a.currentTime >= lr.ab.b || a.currentTime < lr.ab.a - 0.15)) {
      a.currentTime = lr.ab.a;
      play();
    }
    lrHighlight();
    lrEls.time.textContent = fmtSec(a.currentTime) + ' / ' + fmtSec(a.duration || 0);
  });
  lrEls.audio.addEventListener('ended', function () { lrEls.play.textContent = '▶ 播放'; });

  lrEls.audio.addEventListener('error', function () {
    if (!lrEls.audio.getAttribute('src')) return;
    if (lr.loadTimer) { clearTimeout(lr.loadTimer); lr.loadTimer = null; }
    lr.audioReady = false;
    lrEls.play.disabled = true; lrEls.replay.disabled = true;
    lrEls.noAudio.hidden = false;
    if (lr.isLocal) {
      lrEls.noAudio.textContent = '本地音频加载失败：请选择标准 MP3 文件，或点「恢复在线音频」还原题库音频。';
    } else {
      lrEls.noAudio.textContent = '音频加载失败：请确认文件路径与文件名完全正确（注意中文与大小写）。当前路径见题库条目。';
    }
  });

  /* 元数据到达：清除看门狗、显示时长、恢复可用状态（避免一直停在 00:00 / 00:00） */
  lrEls.audio.addEventListener('loadedmetadata', function () {
    if (lr.loadTimer) { clearTimeout(lr.loadTimer); lr.loadTimer = null; }
    lr.audioReady = true;
    if (lrEls.play) lrEls.play.disabled = false;
    if (lrEls.replay) lrEls.replay.disabled = false;
    if (lrEls.noAudio) lrEls.noAudio.hidden = true;
    lrEls.time.textContent = fmtSec(lrEls.audio.currentTime || 0) + ' / ' + fmtSec(lrEls.audio.duration || 0);
  });

  function play() { var p = lrEls.audio.play(); if (p && p.catch) p.catch(function () {}); }

  function lrResetLoops() {
    lr.ab = { a: null, b: null, on: false };
    lr.sLoop = { on: false, start: null, end: null, limit: 1, left: 0 };
    if (lrEls.audio) lrEls.audio.loop = false;
    if (lrEls.allLoop) { lrEls.allLoop.checked = false; lrEls.abLoop.checked = false; }
    updateAbInfo();
  }

  function updateAbInfo() {
    if (!lrEls.abInfo) return;
    lrEls.abInfo.textContent = 'A ' + (lr.ab.a == null ? '—' : fmtSec(lr.ab.a)) + ' / B ' + (lr.ab.b == null ? '—' : fmtSec(lr.ab.b));
  }

  /* 整段循环 */
  lrEls.allLoop.addEventListener('change', function () {
    lrEls.audio.loop = lrEls.allLoop.checked;
    if (lrEls.allLoop.checked) { lr.ab.on = false; lrEls.abLoop.checked = false; lr.sLoop.on = false; }
  });

  /* A–B 循环 */
  lrEls.setA.addEventListener('click', function () { if (!lr.audioReady) { toast('请先加载音频'); return; } lr.ab.a = lrEls.audio.currentTime; updateAbInfo(); });
  lrEls.setB.addEventListener('click', function () { if (!lr.audioReady) { toast('请先加载音频'); return; } lr.ab.b = lrEls.audio.currentTime; updateAbInfo(); });
  lrEls.clearAB.addEventListener('click', function () { lr.ab = { a: null, b: null, on: false }; lrEls.abLoop.checked = false; updateAbInfo(); });
  lrEls.abLoop.addEventListener('change', function () {
    if (!lr.audioReady) { lrEls.abLoop.checked = false; toast('请先加载音频'); return; }
    lr.ab.on = lrEls.abLoop.checked;
    if (lr.ab.on) {
      lr.sLoop.on = false; lrEls.audio.loop = false; lrEls.allLoop.checked = false;
      if (lr.ab.a != null && lrEls.audio.currentTime < lr.ab.a) lrEls.audio.currentTime = lr.ab.a;
    }
  });

  /* 单句播放 / 单句循环（需原文带 start/end） */
  function playSentence(timing, loop) {
    if (!lr.audioReady) { toast('请先加载音频（本地加载或题库音频）'); return; }
    var n = Number(lrEls.repeat.value);
    lr.sLoop = { on: !!loop, start: timing.start, end: timing.end, limit: n, left: n };
    lr.ab.on = false; lrEls.abLoop.checked = false;
    lrEls.audio.loop = false; lrEls.allLoop.checked = false;
    lrEls.audio.currentTime = timing.start;
    play();
    if (loop) toast(n === 0 ? '单句无限循环' : ('单句循环 ' + n + ' 次'));
  }

  /* 本地加载音频（仅本地播放，不上传、不写入仓库） */
  lrEls.file.addEventListener('change', function () {
    var f = lrEls.file.files && lrEls.file.files[0];
    if (!f) return;
    var okType = /^audio\//i.test(f.type || '') || /\.(mp3|m4a|aac|wav|ogg|oga|opus|flac)$/i.test(f.name || '');
    if (!okType) { lrWarn('所选文件不是音频：请选择 MP3 等音频文件后重试。'); lrEls.file.value = ''; return; }
    if (lr.localUrl) { try { URL.revokeObjectURL(lr.localUrl); } catch (e) {} }
    lr.localUrl = URL.createObjectURL(f);
    lr.isLocal = true;
    lr.audioReady = true;
    lrEls.noAudio.hidden = true;
    lrEls.audio.src = lr.localUrl;
    try { lrEls.audio.load(); } catch (e) {}          // 关键：显式 load()，确保读取元数据/时长
    lrEls.play.disabled = false; lrEls.replay.disabled = false;
    if (lrEls.localClear) lrEls.localClear.hidden = false;
    lrEls.fileName.textContent = '已加载：' + f.name + '（仅本次会话；可点「恢复在线音频」还原）';
    lrEls.time.textContent = '00:00 / 00:00';
    lrEls.play.textContent = '▶ 播放';
    toast('已加载本地音频（仅本次会话有效）');
    var pr = lrEls.audio.play(); if (pr && pr.catch) pr.catch(function () {}); // 选择文件属用户手势，尝试自动播放
    // 看门狗：5 秒内拿不到时长 → 明确提示（不再一直停在 00:00 / 00:00）
    if (lr.loadTimer) clearTimeout(lr.loadTimer);
    lr.loadTimer = setTimeout(function () {
      if (lr.isLocal && !(lrEls.audio.duration > 0)) {
        lrLocalFail('本地音频无法播放（可能不是标准 MP3，或浏览器不支持该编码）。可点「恢复在线音频」。');
      }
    }, 5000);
  });

  /* 恢复在线音频：清除本地音频，回到题库音频 */
  if (lrEls.localClear) lrEls.localClear.addEventListener('click', function () {
    var online = (lr.track && lr.track.audio) ? lr.track.audio : '';
    setAudioSrc(online);
    toast(online ? '已恢复在线音频' : '已清除本地音频（该题暂无在线音频）');
  });

  /* 字幕解析：.srt / .vtt（带时间点）/ .txt（纯文本逐行） */
  function lrToSec(x) {
    var p = String(x).replace(',', '.').split(':').map(Number);
    if (p.length === 3) return p[0] * 3600 + p[1] * 60 + p[2];
    if (p.length === 2) return p[0] * 60 + p[1];
    return Number(p[0]) || 0;
  }
  function lrParseSubs(text) {
    text = String(text).replace(/\r/g, '');
    var cues = [];
    if (text.indexOf('-->') !== -1) {
      text.split(/\n{2,}/).forEach(function (b) {
        var lines = b.split('\n'), ti = -1, m = null;
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].indexOf('-->') !== -1) {
            ti = i;
            m = lines[i].match(/(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)\s*-->\s*(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)/);
            break;
          }
        }
        if (ti === -1 || !m) return;
        var txt = lines.slice(ti + 1).join(' ').replace(/<[^>]+>/g, '').replace(/\{[^}]*\}/g, '').trim();
        if (txt) cues.push({ en: txt, zh: '', start: lrToSec(m[1]), end: lrToSec(m[2]) });
      });
    } else {
      text.split('\n').forEach(function (l) { var s = l.trim(); if (s) cues.push({ en: s, zh: '' }); });
    }
    return cues;
  }

  lrEls.subFile.addEventListener('change', function () {
    var f = lrEls.subFile.files && lrEls.subFile.files[0];
    if (!f) return;
    if (!lr.track) { toast('请先选择一个精听条目'); return; }
    var reader = new FileReader();
    reader.onload = function () {
      var cues = lrParseSubs(reader.result || '');
      if (!cues.length) { toast('未能从该文件解析出字幕'); return; }
      state.listen.subs[lr.track.id] = cues;
      save();
      lrRenderPanel();
      toast('已导入字幕 ' + cues.length + ' 句（仅当前条目，已保存）');
    };
    reader.readAsText(f, 'utf-8');
  });

  lrEls.subClear.addEventListener('click', function () {
    if (!lr.track) return;
    if (state.listen.subs[lr.track.id]) {
      delete state.listen.subs[lr.track.id];
      save(); lrRenderPanel(); toast('已清除导入的字幕');
    }
  });

  /* 粘贴 / 编辑原文（每行一句，可带时间点） */
  function lrParsePaste(text) {
    var lines = String(text || '').replace(/\r/g, '').split('\n');
    var cues = [];
    lines.forEach(function (line) {
      var s = line.trim();
      if (!s) return;
      var m = s.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)\]?\s*(?:-->|—>|–>|->|-|—|–)\s*\[?(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)\]?\s*(.+)$/);
      if (m && m[3] && m[3].trim()) { cues.push({ en: m[3].trim(), zh: '', start: lrToSec(m[1]), end: lrToSec(m[2]) }); return; }
      var m2 = s.match(/^\[?(\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?)\]?\s*(.+)$/);
      if (m2 && m2[2] && m2[2].trim()) { cues.push({ en: m2[2].trim(), zh: '', start: lrToSec(m2[1]), end: null }); return; }
      cues.push({ en: s, zh: '' });
    });
    cues.forEach(function (c, i) { if (c.end == null && c.start != null && cues[i + 1] && typeof cues[i + 1].start === 'number') c.end = cues[i + 1].start; });
    cues.forEach(function (c) { if (c.start != null && c.end != null && !(c.end > c.start)) c.end = null; });
    return cues;
  }

  lrEls.pasteSave.addEventListener('click', function () {
    if (!lr.track) { toast('请先选择一个精听条目'); return; }
    var cues = lrParsePaste(lrEls.pasteText.value);
    if (!cues.length) { toast('内容为空，未保存'); return; }
    state.listen.subs[lr.track.id] = cues;
    save(); lrRenderPanel();
    toast('已保存原文 ' + cues.length + ' 句（仅当前条目）');
  });

  lrEls.pasteClear.addEventListener('click', function () { lrEls.pasteText.value = ''; });

  // 展开时把当前条目的原文预填进编辑框
  lrEls.pasteWrap.addEventListener('toggle', function () {
    if (!lrEls.pasteWrap.open || !lr.track) return;
    var tr = lrTranscriptOf(lr.track);
    lrEls.pasteText.value = tr.map(function (s) {
      if (typeof s.start === 'number' && typeof s.end === 'number') return fmtSec(s.start) + ' --> ' + fmtSec(s.end) + ' ' + s.en;
      return s.en;
    }).join('\n');
  });

  /* ===== 保存为题库条目（导出 JSON，不修改源文件） ===== */
  function lrCopyText(txt) {
    if (!txt) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function () { toast('已复制到剪贴板'); }, function () { lrCopyFallback(txt); });
    } else lrCopyFallback(txt);
  }
  function lrCopyFallback(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); toast('已复制到剪贴板'); } catch (e) { toast('复制失败，请手动选择文本'); }
    ta.remove();
  }

  function lrExportId(level, year, month, setNo, part) {
    var base = ('official-' + (year || '') + '-' + (month || '') + '-' + String(level).toLowerCase() + '-s' + (setNo || '') + '-' + (part || ''))
      .replace(/\s+/g, '-').replace(/-+/g, '-').replace(/-$/, '').toLowerCase();
    var id = base, n = 1;
    while (allTracks().some(function (t) { return t.id === id; })) { id = base + '-' + (n++); }
    return id;
  }

  function lrBuildExport() {
    if (!lr.track) { toast('请先选择一个精听条目'); return null; }
    var tr = lrTranscriptOf(lr.track);
    if (!tr.length) { toast('当前条目还没有原文：请先「粘贴 / 编辑原文」或「导入字幕」'); return null; }

    var level = lrEls.exLevel.value;
    var year = lrEls.exYear.value.trim();
    var month = lrEls.exMonth.value.trim();
    var setNoRaw = lrEls.exSet.value.trim();
    var part = lrEls.exPart.value.trim();
    var q = lrEls.exQ.value.trim();
    var qFrom = null, qTo = null;
    if (q) {
      var mm = q.match(/^(\d+)\s*[-~至]\s*(\d+)$/);
      if (mm) { qFrom = Number(mm[1]); qTo = Number(mm[2]); }
      else if (/^\d+$/.test(q)) { qFrom = qTo = Number(q); }
    }

    var transcript = tr.map(function (s) {
      var o = { en: s.en, zh: s.zh || '' };
      if (typeof s.start === 'number') o.start = s.start;
      if (typeof s.end === 'number') o.end = s.end;
      return o;
    });

    var title = lrEls.exTitle.value.trim() ||
      ((year ? year + '年' : '') + (month ? month + '月 ' : '') + (level === 'CET6' ? '六级' : '四级') +
       '听力' + (setNoRaw ? ' 第' + setNoRaw + '套' : '') + (part ? (' ' + part) : ''));

    return {
      id: lrExportId(level, year, month, setNoRaw, part),
      source: 'official',
      level: level,
      year: year, month: month,
      setNo: /^\d+$/.test(setNoRaw) ? Number(setNoRaw) : setNoRaw,
      part: part, type: part || lr.track.type || '',
      qFrom: qFrom, qTo: qTo,
      title: title,
      transcript: transcript,
      questions: [],
      audio: lrEls.exAudio.value.trim() || null,
      audioMatch: lrEls.exMatch.value
    };
  }

  function lrRenderExportList() {
    if (!lrEls.exList) return;
    var list = state.listen.bank || [];
    lrEls.exList.innerHTML = '';
    if (!list.length) { lrEls.exList.innerHTML = '<li class="empty-item">本页题库为空。填好表单后点「保存到本页题库」，即可持久保存并出现在"选段"里。</li>'; return; }
    list.forEach(function (en) {
      var li = document.createElement('li');
      li.innerHTML = '<div class="lr-log-main"><div class="lr-log-title">' + esc(en.title || en.id) + '</div>' +
        '<div class="lr-log-meta">' + esc(en.id) + ' · ' + esc(MATCH_LABEL[en.audioMatch] || '未确认') + '</div></div>' +
        '<button type="button" class="mini-btn ex-copy">复制</button>' +
        '<button type="button" class="mini-btn ex-del">删除</button>';
      li.querySelector('.ex-copy').addEventListener('click', function () { lrCopyText(JSON.stringify(en, null, 2)); });
      li.querySelector('.ex-del').addEventListener('click', function () {
        state.listen.bank = state.listen.bank.filter(function (x) { return x.id !== en.id; });
        save();
        lrRenderTrackList();
        lrRenderExportList();
        toast('已从本页题库删除');
      });
      lrEls.exList.appendChild(li);
    });
  }

  lrEls.exBuild.addEventListener('click', function () {
    var entry = lrBuildExport();
    if (!entry) return;
    lrEls.exOut.value = JSON.stringify(entry, null, 2);
    toast('已生成条目预览（未保存）。点「保存到本页题库」可持久化。');
  });

  lrEls.exSaveBank.addEventListener('click', function () {
    var entry = lrBuildExport();
    if (!entry) return;
    var arr = state.listen.bank || (state.listen.bank = []);
    var idx = -1;
    for (var i = 0; i < arr.length; i++) { if (arr[i].id === entry.id) { idx = i; break; } }
    if (idx >= 0) arr[idx] = entry; else arr.push(entry);
    save();
    // 重置筛选，确保新条目可见并被选中
    ['level', 'year', 'type', 'source'].forEach(function (k) { lrEls[k].value = 'all'; });
    lrFillFilter();
    lrRenderTrackList();
    lrEls.trackSel.value = entry.id;
    lrSelectTrack(entry.id);
    lrRenderExportList();
    lrEls.exOut.value = JSON.stringify(entry, null, 2);
    toast('已保存到本页题库（刷新后仍在）：' + entry.title);
  });

  lrEls.exCopy.addEventListener('click', function () {
    var t = lrEls.exOut.value;
    if (!t) { toast('请先点「生成条目」'); return; }
    lrCopyText(t);
  });

  lrEls.exDownload.addEventListener('click', function () {
    var t = lrEls.exOut.value;
    if (!t) { toast('请先点「生成条目」'); return; }
    var name = 'entry.json';
    try { name = (JSON.parse(t).id || 'entry') + '.json'; } catch (e) {}
    var blob = new Blob([t], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
    toast('已下载 ' + name);
  });

  // 展开时按当前条目预填表单（不自动认定音频与原文一致）
  if (lrEls.exportWrap) lrEls.exportWrap.addEventListener('toggle', function () {
    if (!lrEls.exportWrap.open || !lr.track) return;
    var t = lr.track;
    lrEls.exLevel.value = t.level || 'CET4';
    var ym = String(t.year || '').match(/^(\d{4})-(\d{1,2})$/);
    if (ym) { lrEls.exYear.value = ym[1]; lrEls.exMonth.value = ('0' + ym[2]).slice(-2); }
    else { lrEls.exYear.value = String(t.year || ''); lrEls.exMonth.value = ''; }
    var setNum = String(t.paper || '').match(/(\d+)/);
    lrEls.exSet.value = setNum ? setNum[1] : '';
    lrEls.exPart.value = t.part || t.type || '';
    lrEls.exTitle.value = t.title || '';
    lrEls.exAudio.value = t.audio || '';
    lrEls.exMatch.value = t.audioMatch || 'unknown';
    lrEls.exQ.value = (t.qFrom != null ? (t.qFrom + (t.qTo != null && t.qTo !== t.qFrom ? ('-' + t.qTo) : '')) : '');
  });

  /* 听写计时器 */
  function lrTimerReset() {
    if (lr.timerId) { clearInterval(lr.timerId); lr.timerId = null; }
    lr.timerSec = 0;
    if (lrEls.timer) lrEls.timer.textContent = '00:00';
  }
  function lrStartTimer() { if (lr.timerId) return; lr.timerId = setInterval(function () { lr.timerSec++; lrEls.timer.textContent = fmtSec(lr.timerSec); }, 1000); }
  function lrPauseTimer() { if (lr.timerId) { clearInterval(lr.timerId); lr.timerId = null; } }
  $('lrTimerStart').addEventListener('click', lrStartTimer);
  $('lrTimerPause').addEventListener('click', lrPauseTimer);
  $('lrTimerReset').addEventListener('click', lrTimerReset);

  /* 步骤操作按钮 */
  lrEls.actions.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.dataset.lrNext) { lr.step = Number(b.dataset.lrNext); lrRenderPanel(); }
    else if (b.dataset.lrReveal) { lr.revealed = true; lrRenderPanel(); }
    else if (b.dataset.lrReset) { lrSelectTrack(lr.track.id); }
  });

  /* 筛选 */
  ['level', 'year', 'type', 'source'].forEach(function (k) { lrEls[k].addEventListener('change', lrRenderTrackList); });
  lrEls.trackSel.addEventListener('change', function () { lrSelectTrack(lrEls.trackSel.value); });

  /* 复盘保存 */
  lrEls.rvSave.addEventListener('click', function () {
    if (!lr.track) return;
    state.listen.logs.push({
      id: uid(), date: todayStr(), trackId: lr.track.id, title: lr.track.title, level: lr.track.level,
      words: lrEls.rvWords.value.trim(), missed: lrEls.rvMissed.value.trim(),
      linking: lrEls.rvLinking.value.trim(), unclear: lrEls.rvUnclear.value.trim(),
      done: lrEls.rvDone.checked, due: addDays(3), reviewed: false
    });
    save();
    lrEls.rvWords.value = ''; lrEls.rvMissed.value = ''; lrEls.rvLinking.value = ''; lrEls.rvUnclear.value = ''; lrEls.rvDone.checked = false;
    lrRenderLogs();
    toast('已保存复盘记录');
  });

  /* 记录与复习清单 */
  function lrRenderLogs() {
    var logs = state.listen.logs.slice().reverse();
    lrEls.logList.innerHTML = '';
    if (!logs.length) lrEls.logList.innerHTML = '<li class="empty-item">还没有精听记录。</li>';
    logs.slice(0, 8).forEach(function (g) {
      var issues = [g.words && '生词', g.missed && '漏听', g.linking && '连读弱读', g.unclear && '不理解'].filter(Boolean).join('、');
      var li = document.createElement('li');
      li.innerHTML = '<div class="lr-log-main"><div class="lr-log-title">' + esc(g.title) + (g.done ? ' · ✅ 已完成' : ' · ⏳ 未标记完成') + '</div>' +
        '<div class="lr-log-meta">' + g.date + (issues ? ' · 复盘：' + esc(issues) : '') + '</div></div>';
      lrEls.logList.appendChild(li);
    });

    var due = state.listen.logs.filter(function (g) { return !g.reviewed && g.due && g.due <= todayStr(); });
    lrEls.reviewList.innerHTML = '';
    if (!due.length) { lrEls.reviewList.innerHTML = '<li class="empty-item">暂无到期的听力复习项。</li>'; return; }
    due.forEach(function (g) {
      var li = document.createElement('li');
      li.innerHTML = '<div class="lr-log-main"><div class="lr-log-title">' + esc(g.title) + '</div>' +
        '<div class="lr-log-meta">计划复习：' + g.due + '</div></div>' +
        '<button type="button" class="mini-btn">已复习</button>';
      li.querySelector('.mini-btn').addEventListener('click', function () { g.reviewed = true; save(); lrRenderLogs(); toast('已标记复习'); });
      lrEls.reviewList.appendChild(li);
    });
  }

  function lrInit() {
    if (!lrEls.trackSel) return;
    lrFillFilter();
    lrRenderTrackList();
    lrRenderLogs();
    lrRenderExportList();
  }

  /* ===================== 初始化 ===================== */
  function renderAll() {
    renderPlan(); renderStats(); renderVocab(); renderReview();
    renderReading(); renderTranslation(); renderWriting();
    renderMistakes(); renderSpeaking();
  }

  initTheme();
  renderDate();
  setMode(state.mode || 'CET4');
  lrInit();
  renderAll();
  $('mDate').value = todayStr();
  save();
})();
