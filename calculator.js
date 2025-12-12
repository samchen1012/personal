// 簡單安全的計算解析器（在 eval 前做基本檢查）
(function(){
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');
  let expr = '';

  function updateDisplay(){
    display.textContent = expr === '' ? '0' : expr;
  }

  function sanitizeForEval(s){
    // 僅允許數字、運算符、小數點與括號
    if(/^[0-9+\-*/().\s]+$/.test(s)) return s;
    return null;
  }

  function calculate(){
    const sanitized = sanitizeForEval(expr.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-'));
    if(!sanitized) return '錯誤';
    try{ const val = Function('return ('+sanitized+')')();
      return (typeof val === 'number' && isFinite(val)) ? String(val) : '錯誤';
    }catch(e){ return '錯誤' }
  }

  keys.addEventListener('click', (e)=>{
    const btn = e.target.closest('button');
    if(!btn) return;
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    if(action === 'clear'){ expr = ''; updateDisplay(); return }
    if(action === 'back'){ expr = expr.slice(0,-1); updateDisplay(); return }
    if(action === 'equals'){ const res = calculate(); expr = (res==='錯誤'? '' : res); updateDisplay(); return }
    if(val){ // 數字或運算符
      // 轉換顯示用符號到內部運算符
      const map = {'×':'*','÷':'/','−':'-'};
      const push = map[val] || val;
      expr += push;
      updateDisplay();
    }
  });

  // 鍵盤支援
  window.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); document.querySelector('[data-action="equals"]').click(); return }
    if(e.key === 'Backspace'){ e.preventDefault(); document.querySelector('[data-action="back"]').click(); return }
    if(e.key === 'Escape'){ e.preventDefault(); document.querySelector('[data-action="clear"]').click(); return }
    const allowed = '0123456789+-*/().';
    if(allowed.includes(e.key)){
      e.preventDefault(); expr += e.key; updateDisplay();
    }
  });

  updateDisplay();
})();
