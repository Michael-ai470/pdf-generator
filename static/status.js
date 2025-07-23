const statusEl = document.getElementById('status');

function updateStatus() {
  if (!statusEl) return;
  statusEl.textContent = navigator.onLine ? 'Online' : 'Offline';
  statusEl.style.color = navigator.onLine ? 'var(--mint-green)' : 'var(--vibrant-coral)';
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);
window.addEventListener('load', updateStatus);