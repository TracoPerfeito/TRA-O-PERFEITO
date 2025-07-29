

let darkmode = localStorage.getItem('darkmode')
const themeToggle = document.getElementById('themeToggle')

const enableDarkmode = () => {
  document.body.classList.add('darkmode')
  localStorage.setItem('darkmode', 'active')
  themeToggle.checked = true
}

const disableDarkmode = () => {
  document.body.classList.remove('darkmode')
  localStorage.removeItem('darkmode')
  themeToggle.checked = false
}

// Verifica se já está em modo escuro ao carregar a página
if (darkmode === 'active') {
  enableDarkmode()
}

// Alterna quando o usuário clica
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    enableDarkmode()
  } else {
    disableDarkmode()
  }
})





