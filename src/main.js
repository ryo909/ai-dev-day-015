import './style.css';
const PROFILE = {"day":"Day015","title":"Constraint Challenge Dealer","one_sentence":"制約付きのお題を瞬時に作るミニチャレンジ生成ツール。（話題:HN Frontpage）","core_action":"deal","family":"constraint_game","mechanic":"rule_combination","input_style":"constraints","output_style":"challenge_cards","audience_promise":"fresh_short_breaks","publish_hook":"30秒で遊べる制約チャレンジ","engine":"constraint_game"};
const actionBtn = document.getElementById('actionBtn');
const toolInput = document.getElementById('toolInput');
const toolOutput = document.getElementById('toolOutput');
const outputGroup = document.getElementById('outputGroup');

actionBtn.addEventListener('click', () => {
  const input = (toolInput.value || '').trim();
  if (!input) {
    showOutput('⚠ 入力を入れてください', 'warning');
    return;
  }
  const result = processInput(input);
  showOutput(result, 'success');
});

function processInput(input) {
  switch (PROFILE.engine) {
    case 'json_paths':
      return renderJsonPaths(input);
    case 'agenda_builder':
      return buildAgenda(input);
    case 'risk_matrix':
      return buildRiskMatrix(input);
    case 'decision_brief':
      return buildDecisionBrief(input);
    case 'checklist_builder':
      return buildChecklist(input);
    case 'qa_rotator':
      return buildQuestionRotation(input);
    case 'habit_slots':
      return buildHabitSlots(input);
    case 'triage_router':
      return buildTriage(input);
    case 'copy_angle':
      return buildCopyAngles(input);
    case 'story_weaver':
      return buildStoryOutline(input);
    case 'constraint_game':
      return buildConstraints(input);
    case 'incident_card':
      return buildIncidentCard(input);
    default:
      return fallbackAnalyze(input);
  }
}

function renderJsonPaths(input) {
  let obj;
  try {
    obj = JSON.parse(input);
  } catch (e) {
    return 'JSONとして解釈できませんでした。まずJSON形式で入力してください。';
  }
  const rows = [];
  walk(obj, '$', rows);
  return ['JSON path summary:', ...rows.slice(0, 80)].join('\\n');
}

function walk(node, path, rows) {
  if (Array.isArray(node)) {
    rows.push(`${path} : array(${node.length})`);
    node.forEach((x, i) => walk(x, `${path}[${i}]`, rows));
    return;
  }
  if (node && typeof node === 'object') {
    rows.push(`${path} : object`);
    Object.keys(node).forEach((k) => walk(node[k], `${path}.${k}`, rows));
    return;
  }
  rows.push(`${path} : ${typeof node}`);
}

function splitLines(input) {
  return input.split(/\\n+/).map((x) => x.trim()).filter(Boolean);
}

function buildAgenda(input) {
  const topics = splitLines(input);
  const per = Math.max(5, Math.floor(45 / Math.max(topics.length, 1)));
  const lines = topics.map((t, i) => `${String(i + 1).padStart(2, '0')}. ${t} (${per}分)`);
  return ['Agenda draft:', ...lines, 'Closing: 決定事項と担当を1分で確認'].join('\\n');
}

function buildRiskMatrix(input) {
  const rows = splitLines(input).map((line) => {
    const [name, impactRaw, probRaw] = line.split('|').map((x) => (x || '').trim());
    const impact = Number(impactRaw || 3);
    const prob = Number(probRaw || 3);
    const score = impact * prob;
    return { name: name || line, impact, prob, score };
  }).sort((a, b) => b.score - a.score);
  const out = rows.map((r, i) => `${i + 1}. ${r.name} | impact=${r.impact} prob=${r.prob} score=${r.score}`);
  return ['Risk priority:', ...out.slice(0, 20)].join('\\n');
}

function buildDecisionBrief(input) {
  const rows = splitLines(input);
  const outline = rows.map((x, i) => `${i + 1}) ${x}`);
  return [
    'Decision memo draft',
    '背景: 何を決めるかを1行で明記',
    '選択肢:',
    ...outline,
    '採用理由: 影響と実行速度のバランス',
    '却下理由: 維持コストまたはリスクが高い'
  ].join('\\n');
}

function buildChecklist(input) {
  const rows = splitLines(input);
  const checks = rows.map((x, i) => `- [ ] ${x} を確認する (${i + 1})`);
  return ['Checklist:', ...checks.slice(0, 30)].join('\\n');
}

function buildQuestionRotation(input) {
  const rows = splitLines(input);
  const out = [];
  rows.forEach((x) => {
    out.push(`基礎: ${x}とは?`);
    out.push(`応用: ${x}を使う判断基準は?`);
    out.push(`確認: ${x}を説明できるか?`);
  });
  return ['Question rotation:', ...out.slice(0, 24)].join('\\n');
}

function buildHabitSlots(input) {
  const rows = splitLines(input);
  if (rows.length === 0) {
    return '条件を1行以上入力してください。';
  }
  return [
    'Habit slots:',
    '朝: 5分の準備タスク',
    '昼: 進捗確認',
    '夜: 翌日の障害を1つ潰す',
    `メモ: ${rows[0]}`
  ].join('\\n');
}

function buildTriage(input) {
  const rows = splitLines(input);
  const lanes = { now: [], later: [], delegate: [] };
  rows.forEach((r, i) => {
    if (i % 3 === 0) lanes.now.push(r);
    else if (i % 3 === 1) lanes.later.push(r);
    else lanes.delegate.push(r);
  });
  return [
    'Triage lanes:',
    '[Now]', ...lanes.now.map((x) => `- ${x}`),
    '[Later]', ...lanes.later.map((x) => `- ${x}`),
    '[Delegate]', ...lanes.delegate.map((x) => `- ${x}`)
  ].join('\\n');
}

function buildCopyAngles(input) {
  const seed = splitLines(input).slice(0, 3).join(' / ');
  return [
    'Copy angles:',
    `1) 課題起点: ${seed} で困る時間を減らす`,
    `2) 成果起点: ${seed} を最短で形にする`,
    `3) 安心起点: ${seed} のミスを事前に防ぐ`
  ].join('\\n');
}

function buildStoryOutline(input) {
  const rows = splitLines(input);
  return [
    'STAR outline:',
    `S: ${rows[0] || '背景を1行で記述'}`,
    `T: ${rows[1] || '目標を1行で記述'}`,
    `A: ${rows[2] || '取った行動を3点で記述'}`,
    `R: ${rows[3] || '成果を数値で記述'}`
  ].join('\\n');
}

function buildConstraints(input) {
  const rows = splitLines(input);
  const base = rows[0] || input;
  return [
    'Challenge cards:',
    `- 5分: ${base} で1つ作る`,
    `- 10分: ${base} を2通りで試す`,
    `- 15分: ${base} を他人に説明する`
  ].join('\\n');
}

function buildIncidentCard(input) {
  const rows = splitLines(input);
  return [
    'Incident first-response card:',
    `1. 事象要約: ${rows[0] || '症状を1行で記述'}`,
    '2. 影響範囲を確認',
    '3. 一時回避策を定義',
    '4. 恒久対応の仮説を列挙',
    '5. 共有先と次回更新時刻を明記'
  ].join('\\n');
}

function fallbackAnalyze(input) {
  const chars = input.length;
  const lines = input.split('\\n').length;
  const words = input.split(/\\s+/).filter(Boolean).length;
  return `分析結果\\n- chars: ${chars}\\n- words: ${words}\\n- lines: ${lines}`;
}

function showOutput(content, type = 'info') {
  outputGroup.style.display = '';
  toolOutput.className = `output-area output-${type}`;
  toolOutput.textContent = content;
  outputGroup.style.animation = 'none';
  outputGroup.offsetHeight;
  outputGroup.style.animation = 'fadeSlideIn 0.3s ease';
}
