const roleConfig = {
  admin: {
    title: 'Administration Dashboard',
    roleLabel: 'Admin',
    nav: ['Dashboard', 'Students', 'Courses & Classes', 'Schedules', 'Enrollment', 'Attendance', 'Scores', 'Certificates', 'Announcements', 'Reports', 'Activity History'],
    stats: [
      ['Active Students', '1,248', '+42 this month'],
      ['Classes Today', '18', 'Across 6 rooms'],
      ['Pending Enrollments', '24', 'Requires review'],
      ['Certificates Ready', '12', 'Ready to issue']
    ],
    tableTitle: "Today's Schedule",
    headers: ['Time', 'Class', 'Instructor', 'Room', 'Status'],
    rows: [
      ['08:00 – 09:30', 'Calculus I', 'Dr. Sara Nouri', 'Room 101', 'In progress'],
      ['09:45 – 11:15', 'Physics II', 'Dr. Reza Farahi', 'Room 202', 'In progress'],
      ['11:30 – 13:00', 'English Literature', 'Ms. Leila Karim', 'Room 303', 'Scheduled'],
      ['13:30 – 15:00', 'Data Structures', 'Dr. Arman Khalili', 'Lab 1', 'Scheduled'],
      ['15:15 – 16:45', 'Financial Accounting', 'Mr. Hadi Mansouri', 'Room 201', 'Scheduled']
    ],
    activity: ['New enrollment request from Ali Rezaei', 'Certificate issued to Sara Behzad', 'Physics II attendance recorded', 'New student added: Nima Jafari', 'Midterm examination announcement published'],
    quick: ['Add student', 'Create class', 'Publish announcement', 'Issue certificate'],
    chartTitle: 'Enrollment overview',
    chart: [42, 54, 66, 72, 78, 86, 92]
  },
  hr: {
    title: 'HR Dashboard',
    roleLabel: 'HR',
    nav: ['Dashboard', 'Teachers', 'Staff', 'Employee Attendance', 'Leave Records', 'HR Documents', 'HR Reports', 'Activity History'],
    stats: [
      ['Active Employees', '86', '+3 this quarter'],
      ['Present Today', '79', '92% attendance'],
      ['Leave Requests', '7', 'Needs review'],
      ['Documents Expiring', '4', 'Within 30 days']
    ],
    tableTitle: 'Leave Requests',
    headers: ['Employee', 'Department', 'Leave type', 'Dates', 'Status'],
    rows: [
      ['Sahar Mohammadi', 'Languages', 'Annual leave', '10–12 Aug', 'Pending'],
      ['Hadi Mansouri', 'Finance', 'Medical leave', '8 Aug', 'Approved'],
      ['Nadia Azimi', 'Administration', 'Annual leave', '18–21 Aug', 'Pending'],
      ['Karim Ahmadi', 'Science', 'Personal leave', '15 Aug', 'Approved']
    ],
    activity: ['Employment record updated for Nadia Azimi', 'Leave request submitted by Sahar Mohammadi', 'Teacher contract uploaded', 'July attendance report exported'],
    quick: ['Add employee', 'Review leave', 'Upload document', 'Run HR report'],
    chartTitle: 'Employee attendance',
    chart: [84, 86, 83, 88, 90, 91, 92]
  },
  it: {
    title: 'IT Dashboard',
    roleLabel: 'IT',
    nav: ['Dashboard', 'User Accounts', 'Roles & Permissions', 'System Settings', 'Security Logs', 'Backups', 'Activity History'],
    stats: [
      ['Active Accounts', '94', '3 roles configured'],
      ['Open Requests', '6', '2 high priority'],
      ['Failed Logins', '11', 'Last 24 hours'],
      ['Backup Status', 'Healthy', 'Completed 02:15'],
    ],
    tableTitle: 'Recent System Events',
    headers: ['Time', 'Event', 'User', 'Source', 'Status'],
    rows: [
      ['10:42', 'Password reset completed', 'l.safi', 'Portal', 'Resolved'],
      ['10:16', 'Repeated sign-in failures', 'Unknown', '172.16.1.24', 'Review'],
      ['09:31', 'Role permission updated', 'o.nazari', 'Portal', 'Completed'],
      ['02:15', 'Nightly database backup', 'System', 'Backup service', 'Healthy']
    ],
    activity: ['Account disabled for former staff member', 'Security policy updated', 'Backup integrity check completed', 'New Admin account activated'],
    quick: ['Create account', 'Reset password', 'Review security log', 'Check backups'],
    chartTitle: 'System health',
    chart: [96, 98, 97, 99, 98, 100, 99]
  }
};

const storedSession = localStorage.getItem('staffSession');
if (!storedSession) window.location.replace('portal.html');

let session;
try {
  session = JSON.parse(storedSession);
} catch {
  localStorage.removeItem('staffSession');
  window.location.replace('portal.html');
}

const config = roleConfig[session?.role];
if (!config) {
  localStorage.removeItem('staffSession');
  window.location.replace('portal.html');
}

const icons = {
  Dashboard: '<path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  default: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>'
};

function icon(name, classes = 'h-5 w-5') {
  return `<svg viewBox="0 0 24 24" class="${classes}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.default}</svg>`;
}

document.querySelector('[data-dashboard-title]').textContent = config.title;
document.querySelector('[data-user-name]').textContent = session.name;
document.querySelector('[data-user-role]').textContent = config.roleLabel;
document.querySelector('[data-avatar]').textContent = session.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
document.querySelector('[data-avatar-header]').textContent = session.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
document.querySelector('[data-chart-title]').textContent = config.chartTitle;

const sidebarNav = document.querySelector('[data-sidebar-nav]');
sidebarNav.innerHTML = config.nav.map((item, index) => `
  <button class="dash-nav ${index === 0 ? 'active' : ''}" data-nav-item="${item}">
    ${icon(item)}<span>${item}</span>
  </button>`).join('');

sidebarNav.addEventListener('click', (event) => {
  const target = event.target.closest('[data-nav-item]');
  if (!target) return;
  sidebarNav.querySelectorAll('.dash-nav').forEach((button) => button.classList.remove('active'));
  target.classList.add('active');
  if (target.dataset.navItem !== 'Dashboard') showToast(`${target.dataset.navItem} module is ready for backend connection.`);
  closeSidebar();
});

document.querySelector('[data-stats]').innerHTML = config.stats.map(([label, value, note], index) => `
  <article class="metric-card">
    <div class="flex items-start justify-between gap-4">
      <div><p class="text-sm font-semibold text-muted">${label}</p><p class="mt-2 text-3xl font-extrabold tracking-tight text-navy">${value}</p></div>
      <span class="flex h-10 w-10 items-center justify-center rounded-full bg-teal/12 text-teal">${icon(index === 0 ? 'Dashboard' : 'default', 'h-5 w-5')}</span>
    </div>
    <p class="mt-3 text-xs font-semibold text-muted">${note}</p>
  </article>`).join('');

document.querySelector('[data-table-title]').textContent = config.tableTitle;
document.querySelector('[data-table-head]').innerHTML = `<tr>${config.headers.map((head) => `<th class="whitespace-nowrap px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-muted">${head}</th>`).join('')}</tr>`;
document.querySelector('[data-table-body]').innerHTML = config.rows.map((row) => `<tr class="border-t border-slate-100 hover:bg-mist/60">${row.map((cell, index) => `<td class="whitespace-nowrap px-5 py-3.5 text-sm ${index === row.length - 1 ? 'font-bold text-teal' : index === 1 ? 'font-semibold text-navy' : 'text-slate-600'}">${cell}</td>`).join('')}</tr>`).join('');

document.querySelector('[data-activity]').innerHTML = config.activity.map((item, index) => `
  <li class="flex gap-3 border-b border-slate-100 py-3 last:border-0">
    <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">${icon('default', 'h-4 w-4')}</span>
    <div><p class="text-sm font-semibold text-navy">${item}</p><p class="mt-0.5 text-xs text-muted">${index * 13 + 8} minutes ago</p></div>
  </li>`).join('');

document.querySelector('[data-quick-actions]').innerHTML = config.quick.map((item) => `
  <button class="flex min-h-20 items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition hover:border-teal hover:bg-teal/5" data-quick-action="${item}">
    <span><span class="block text-sm font-bold text-navy">${item}</span><span class="mt-1 block text-xs text-muted">Open this workflow</span></span>
    <span class="text-teal">${icon('default', 'h-5 w-5')}</span>
  </button>`).join('');

document.querySelector('[data-quick-actions]').addEventListener('click', (event) => {
  const target = event.target.closest('[data-quick-action]');
  if (target) showToast(`${target.dataset.quickAction} selected. Connect the backend to complete this action.`);
});

const months = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
document.querySelector('[data-chart]').innerHTML = config.chart.map((value, index) => `
  <div class="flex h-full flex-1 flex-col items-center justify-end gap-2">
    <span class="text-[10px] font-bold text-muted">${value}${session.role === 'admin' ? '0' : '%'}</span>
    <div class="w-full max-w-10 rounded-t-md bg-teal transition-all" style="height:${Math.max(30, Math.round(value * 1.5))}px"></div>
    <span class="text-[10px] text-muted">${months[index] || 'Aug'}</span>
  </div>`).join('');

document.querySelector('[data-logout]').addEventListener('click', () => {
  localStorage.removeItem('staffSession');
  window.location.replace('portal.html');
});

document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.currentTarget.querySelector('input').value.trim();
  showToast(query ? `Search prepared for “${query}”. Backend connection is required.` : 'Enter something to search.');
});

const sidebar = document.querySelector('[data-sidebar]');
const backdrop = document.querySelector('[data-sidebar-backdrop]');
document.querySelector('[data-sidebar-open]').addEventListener('click', () => {
  sidebar.classList.remove('-translate-x-full');
  backdrop.classList.remove('hidden');
});
document.querySelector('[data-sidebar-close]').addEventListener('click', closeSidebar);
backdrop.addEventListener('click', closeSidebar);

function closeSidebar() {
  if (window.innerWidth >= 1024) return;
  sidebar.classList.add('-translate-x-full');
  backdrop.classList.add('hidden');
}

function showToast(message) {
  document.querySelector('[data-toast]')?.remove();
  const toast = document.createElement('div');
  toast.dataset.toast = '';
  toast.className = 'toast fixed bottom-5 right-5 z-[80] max-w-sm rounded-xl bg-navy px-5 py-4 text-sm font-semibold text-white shadow-2xl';
  toast.textContent = message;
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

window.SepidanI18n.initializeI18n();
