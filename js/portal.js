const demoAccounts = {
  'admin@demo.sepidan': { password: 'Admin123!', role: 'admin', name: 'Demo Admin' },
  'hr@demo.sepidan': { password: 'Hr123!', role: 'hr', name: 'Demo HR' },
  'it@demo.sepidan': { password: 'It123!', role: 'it', name: 'Demo IT' }
};

const loginForm = document.querySelector('[data-login-form]');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loginError = document.querySelector('[data-login-error]');
const loginButton = document.querySelector('[data-login-button]');
const passwordToggle = document.querySelector('[data-password-toggle]');

passwordToggle?.addEventListener('click', () => {
  const isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';
  passwordToggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
});

document.querySelectorAll('[data-demo-account]').forEach((button) => {
  button.addEventListener('click', () => {
    const account = demoAccounts[button.dataset.demoAccount];
    emailInput.value = button.dataset.demoAccount;
    passwordInput.value = account.password;
    emailInput.focus();
  });
});

loginForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  loginError.hidden = true;
  const email = emailInput.value.trim().toLowerCase();
  const account = demoAccounts[email];

  if (!account || account.password !== passwordInput.value) {
    loginError.textContent = 'The email or password is incorrect. Try one of the demo accounts below.';
    loginError.hidden = false;
    passwordInput.focus();
    return;
  }

  loginButton.disabled = true;
  loginButton.textContent = 'Signing in…';
  localStorage.setItem('staffSession', JSON.stringify({
    email,
    role: account.role,
    name: account.name,
    signedInAt: Date.now()
  }));
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 450);
});

window.SepidanI18n.initializeI18n();
