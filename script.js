// ============================================================
// 世界杯预测 2026 — 数据 & 交互
// ============================================================

// ---------- 球队数据 (FIFA 排名 2025.04 + 近况 + 夺冠热度) ----------
const teams = [
  { rank: 1,  name: '阿根廷',   flag: '🇦🇷', pts: 1877, recent: '✅✅✅✅✅', status: 'hot',   prob: 16.2, group: 'A' },
  { rank: 2,  name: '西班牙',   flag: '🇪🇸', pts: 1874, recent: '✅✅❌✅✅', status: 'hot',   prob: 14.8, group: 'B' },
  { rank: 3,  name: '法国',     flag: '🇫🇷', pts: 1850, recent: '✅✅✅❌✅', status: 'hot',   prob: 14.0, group: 'C' },
  { rank: 4,  name: '英格兰',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', pts: 1832, recent: '✅❌✅✅✅', status: 'hot',   prob: 12.5, group: 'D' },
  { rank: 5,  name: '巴西',     flag: '🇧🇷', pts: 1812, recent: '❌✅✅❌✅', status: 'warm',  prob: 10.3, group: 'E' },
  { rank: 6,  name: '葡萄牙',   flag: '🇵🇹', pts: 1796, recent: '✅✅✅❌✅', status: 'warm',  prob: 8.7,  group: 'F' },
  { rank: 7,  name: '德国',     flag: '🇩🇪', pts: 1778, recent: '✅❌✅✅❌', status: 'warm',  prob: 7.2,  group: 'G' },
  { rank: 8,  name: '荷兰',     flag: '🇳🇱', pts: 1755, recent: '✅✅❌✅✅', status: 'warm',  prob: 6.0,  group: 'H' },
  { rank: 9,  name: '意大利',   flag: '🇮🇹', pts: 1732, recent: '✅✅✅❌❌', status: 'mid',   prob: 3.8,  group: 'A' },
  { rank: 10, name: '克罗地亚', flag: '🇭🇷', pts: 1710, recent: '✅❌✅❌✅', status: 'mid',   prob: 2.5,  group: 'B' },
  { rank: 11, name: '比利时',   flag: '🇧🇪', pts: 1692, recent: '❌✅❌✅✅', status: 'mid',   prob: 2.0,  group: 'C' },
  { rank: 12, name: '乌拉圭',   flag: '🇺🇾', pts: 1675, recent: '✅✅❌✅❌', status: 'mid',   prob: 1.5,  group: 'D' },
  { rank: 13, name: '摩洛哥',   flag: '🇲🇦', pts: 1665, recent: '✅✅✅✅❌', status: 'mid',   prob: 1.2,  group: 'E' },
  { rank: 14, name: '丹麦',     flag: '🇩🇰', pts: 1652, recent: '❌✅✅❌✅', status: 'mid',   prob: 0.8,  group: 'F' },
  { rank: 15, name: '瑞士',     flag: '🇨🇭', pts: 1640, recent: '✅❌✅✅❌', status: 'mid',   prob: 0.6,  group: 'G' },
  { rank: 16, name: '日本',     flag: '🇯🇵', pts: 1628, recent: '✅✅✅❌✅', status: 'mid',   prob: 0.5,  group: 'H' },
  { rank: 17, name: '美国',     flag: '🇺🇸', pts: 1615, recent: '✅❌❌✅✅', status: 'mid',   prob: 0.4,  group: 'A' },
  { rank: 18, name: '韩国',     flag: '🇰🇷', pts: 1600, recent: '✅✅❌✅❌', status: 'mid',   prob: 0.3,  group: 'B' },
  { rank: 19, name: '墨西哥',   flag: '🇲🇽', pts: 1588, recent: '❌✅❌✅❌', status: 'cold',  prob: 0.2,  group: 'C' },
  { rank: 20, name: '塞内加尔', flag: '🇸🇳', pts: 1575, recent: '✅❌✅✅❌', status: 'cold',  prob: 0.1,  group: 'D' },
];

// ---------- 历届冠军 ----------
const history = [
  { year: 2022, champ: '阿根廷', host: '卡塔尔' },
  { year: 2018, champ: '法国',   host: '俄罗斯' },
  { year: 2014, champ: '德国',   host: '巴西' },
  { year: 2010, champ: '西班牙', host: '南非' },
  { year: 2006, champ: '意大利', host: '德国' },
  { year: 2002, champ: '巴西',   host: '韩国/日本' },
  { year: 1998, champ: '法国',   host: '法国' },
  { year: 1994, champ: '巴西',   host: '美国' },
];

// ---------- 状态映射 ----------
const statusMap = {
  hot:  { label: '🔥 大热', cls: 'status-hot' },
  warm: { label: '⚡ 热门', cls: 'status-warm' },
  mid:  { label: '🔹 中游', cls: 'status-mid' },
  cold: { label: '❄️ 黑马', cls: 'status-cold' },
};

// ============================================================
// 渲染
// ============================================================

// ---- 排名表 ----
function renderRankTable() {
  const tbody = document.querySelector('#rankTable tbody');
  tbody.innerHTML = '';
  teams.forEach(t => {
    const st = statusMap[t.status];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.rank}</td>
      <td>${t.flag} ${t.name}</td>
      <td>${t.pts}</td>
      <td style="font-size:0.85rem;letter-spacing:2px;">${t.recent}</td>
      <td><span class="status-badge ${st.cls}">${st.label}</span></td>
    `;
    tbody.appendChild(tr);
  });
}

// ---- 下拉框 ----
function populateSelect() {
  const sel = document.getElementById('teamSelect');
  teams.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t.name;
    opt.textContent = `${t.flag} ${t.name}`;
    sel.appendChild(opt);
  });
}

// ---- 历届冠军 ----
function renderHistory() {
  const grid = document.getElementById('historyGrid');
  grid.innerHTML = '';
  history.forEach(h => {
    const div = document.createElement('div');
    div.className = 'history-item';
    div.innerHTML = `
      <div class="year">${h.year}</div>
      <div class="champ">🏆 ${h.champ}</div>
      <div class="host">📍 ${h.host}</div>
    `;
    grid.appendChild(div);
  });
}

// ---- 夺冠概率图表 ----
function renderChart() {
  const top8 = teams.slice(0, 8);
  const labels = top8.map(t => t.flag + ' ' + t.name);
  const data = top8.map(t => t.prob);
  const colors = ['#f0c040','#e63946','#3a7bd5','#2ecc71','#9b59b6','#e67e22','#1abc9c','#e84393'];

  const ctx = document.getElementById('probChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: '夺冠概率 (%)',
        data,
        backgroundColor: colors,
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: ctx => `${ctx.parsed.y}%`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#2a3346' },
          ticks: { color: '#8899b0', callback: v => v + '%' }
        },
        x: {
          grid: { display: false },
          ticks: { color: '#bcc9db', font: { size: 11 } }
        }
      }
    }
  });
}

// ---- 预测提交 ----
function setupPrediction() {
  const btn = document.getElementById('predictBtn');
  const sel = document.getElementById('teamSelect');
  const result = document.getElementById('predictResult');

  btn.addEventListener('click', () => {
    const name = sel.value;
    const team = teams.find(t => t.name === name);
    if (!team) return;

    const st = statusMap[team.status];
    result.classList.remove('hidden');
    result.innerHTML = `
      <p style="font-size:1.2rem;font-weight:600;">${team.flag} ${team.name}</p>
      <p>🏅 FIFA 排名：第 ${team.rank} 位 | 积分：${team.pts}</p>
      <p>📈 夺冠概率：<strong style="color:#f0c040;">${team.prob}%</strong></p>
      <p>🔥 热度：${st.label}</p>
      <div class="prob-bar"><div class="prob-fill" style="width:${team.prob}%"></div></div>
      <p style="margin-top:0.6rem;color:#8899b0;font-size:0.85rem;">${team.recent} 近 5 场表现</p>
    `;
  });
}

// ---- 初始化 ----
document.addEventListener('DOMContentLoaded', () => {
  renderRankTable();
  populateSelect();
  renderHistory();
  renderChart();
  setupPrediction();
});
