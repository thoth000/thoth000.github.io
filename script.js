// script.js

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-container');
  const icon = toggle.querySelector('i');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // 初期表示では全カードを表示
  document.querySelectorAll('.filter-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('#works .card').forEach(card => {
        const type = card.getAttribute('data-type');
        card.style.display = (filter === 'all' || filter === type) ? 'block' : 'none';
      });
    });
  });

  const profileImg = document.getElementById('profile-img');

  if (profileImg) {
    profileImg.style.cursor = 'pointer';
    profileImg.addEventListener('click', () => {
      const currentSrc = profileImg.getAttribute('src');
      const altSrc     = profileImg.getAttribute('data-alt');
      // src と data-alt を入れ替え
      profileImg.setAttribute('src',     altSrc);
      profileImg.setAttribute('data-alt', currentSrc);
    });
  }
});
