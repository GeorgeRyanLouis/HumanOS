const themeToggleBtn = document.getElementById('themeToggleBtn');
function applyTheme(theme){
  if(theme==='dark'){
    document.body.classList.add('dark-theme');
    if(themeToggleBtn) themeToggleBtn.textContent = '🌙';
  }else{
    document.body.classList.remove('dark-theme');
    if(themeToggleBtn) themeToggleBtn.textContent = '☀️';
  }
}
if(themeToggleBtn){
  themeToggleBtn.addEventListener('click', ()=>{
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);
