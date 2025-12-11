// 初始化主題
(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const printBtn = document.getElementById('printBtn');

  const applyTheme = (theme)=>{
    if(theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }

  const saved = localStorage.getItem('theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(saved);

  if(btn){
    btn.addEventListener('click', ()=>{
      const isDark = root.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  if(printBtn){
    printBtn.addEventListener('click', ()=>{
      window.print();
    });
  }

  // 平滑滾動
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // 模擬送出表單
  const sendBtn = document.getElementById('sendBtn');
  if(sendBtn){
    sendBtn.addEventListener('click', ()=>{
      const name = document.getElementById('cname').value || '匿名';
      const email = document.getElementById('cemail').value || '無';
      alert(`已模擬送出：\n姓名：${name}\nEmail：${email}`);
    });
  }
})();
