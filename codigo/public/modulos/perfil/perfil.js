document.querySelectorAll('.aba').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.aba').forEach(el => el.classList.remove('active'));
        btn.classList.add('active');
    });
});
