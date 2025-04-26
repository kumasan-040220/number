let questionPoints = [];   // 出題される点リスト
let modePoints = 2;        // 初期モードは2点モード

window.onload = function() {
  generateQuestion();
};

// モードを切り替える関数
function setMode(points) {
  modePoints = points;
  clearFormula();
  generateQuestion();
}

// 問題を作る（モードに応じて点数を変更）
function generateQuestion() {
  questionPoints = [];
  for (let i = 0; i < modePoints; i++) {
    const x = Math.floor(Math.random() * 5) + 1;
    const y = x * x + 2;
    questionPoints.push({ x: x, y: y });
  }

  let text = '【通ってほしい点】<br>';
  for (const p of questionPoints) {
    text += `(${p.x}, ${p.y}) `;
  }
  document.getElementById('questionArea').innerHTML = text;
}

function appendFormula(value) {
  const input = document.getElementById('formulaInput');
  const start = input.selectionStart;
  const end = input.selectionEnd;

  const before = input.value.substring(0, start);
  const after = input.value.substring(end);
  input.value = before + value + after;

  const newPosition = start + value.length;
  input.setSelectionRange(newPosition, newPosition);
  input.focus();
}

function clearFormula() {
  document.getElementById('formulaInput').value = '';
}

function submitFormula() {
  const formula = document.getElementById('formulaInput').value.trim();
  if (formula === '') {
    alert('式を作ってください！');
    return;
  }

  let allCorrect = true;
  for (const p of questionPoints) {
    const result = evaluateFormula(p.x, formula);
    console.log(`x=${p.x} → 計算結果=${result}, 出題y=${p.y}`);

    if (Math.abs(result - p.y) > 0.01) {
      allCorrect = false;
      break;
    }
  }

  if (allCorrect) {
    alert('クリア！次の問題へ！');
    clearFormula();
    generateQuestion();
  } else {
    alert('失敗！もう一度チャレンジしてね');
  }
}

function evaluateFormula(xValue, formula) {
  try {
    const func = new Function('x', `return ${formula};`);
    return func(xValue);
  } catch (e) {
    console.error('式の評価エラー:', e);
    return NaN;
  }
}
