document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('pdf-form');
  const msgEl = document.getElementById('message');

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // send form data
    const formData = new FormData(form);
    const response = await fetch('/', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      // get PDF blob & trigger download
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_data.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // show success message
      msgEl.textContent = 'Data Successfully Saved.';
    } else {
      msgEl.textContent = 'Oops! Something went wrong.';
      msgEl.style.color = 'var(--vibrant-coral)';
    }
  });
});
