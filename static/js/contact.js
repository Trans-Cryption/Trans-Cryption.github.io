document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('anon-form');
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = 'feedback';

    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, { method: 'POST', body: formData });
      if (!response.ok) throw new Error('Erreur réseau');

      const data = await response.json();
      if (data.success) {
        feedback.textContent = 'Merci pour ton message ! 🎉';
        feedback.classList.add('show', 'success');
        form.reset();
      } else {
        throw new Error(data.message || 'Un problème est survenu');
      }
    } catch (err) {
      feedback.textContent = err.message;
      feedback.classList.add('show', 'error');
    }
  });
});
