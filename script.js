// script.js

document.addEventListener('DOMContentLoaded', () => {
  // ヘッダ設定
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-container');
  const icon = toggle.querySelector('i');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });

  // 画像の切り替え機能
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

  const container = document.getElementById('cards-container');
  const filters = document.querySelectorAll('.filter-tag');

  // JSON をフェッチしてカード描画
  fetch("./works.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(cards => {
      // 日付順にソート
      cards.sort((a, b) => new Date(b.date) - new Date(a.date));

      // カード要素をすべて生成
      cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card';
        div.dataset.type = card.type;

        // サブテーマ
        if (card.subthemes?.length) {
          const subDiv = document.createElement('div');
          subDiv.className = 'card-subthemes';
          card.subthemes.forEach(st => {
            const span = document.createElement('span');
            span.className = 'subtheme';
            span.textContent = st;
            subDiv.appendChild(span);
          });
          div.appendChild(subDiv);
        }

        // タイトル
        const h3 = document.createElement('h3');
        h3.className = 'card-title';
        h3.textContent = card.title;
        div.appendChild(h3);

        // 説明
        if (card.description) {
          const pDesc = document.createElement('p');
          pDesc.className = 'card-description';
          pDesc.textContent = card.description;
          div.appendChild(pDesc);
        }

        // 日付
        if (card.date) {
          const pDate = document.createElement('p');
          pDate.className = 'card-date';
          pDate.textContent = card.date;
          div.appendChild(pDate);
        }

        // タグ
        if (card.tags?.length) {
          const tagsDiv = document.createElement('div');
          tagsDiv.className = 'card-tags';
          card.tags.forEach(t => {
            const span = document.createElement('span');
            span.className = 'card-tag';
            span.textContent = t;
            tagsDiv.appendChild(span);
          });
          div.appendChild(tagsDiv);
        }

        // リンク
        if (card.links?.length) {
          const linksDiv = document.createElement('div');
          linksDiv.className = 'card-links';
          card.links.forEach(l => {
            const a = document.createElement('a');
            a.href = l.url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.textContent = l.label;
            linksDiv.appendChild(a);
          });
          div.appendChild(linksDiv);
        }

        container.appendChild(div);
      });

      // 初期フィルタリング（All）
      applyFilter('all');
    })
    .catch(err => console.error("読み込み失敗:", err));

  // フィルタ処理
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  function applyFilter(filter) {
    document.querySelectorAll('#cards-container .card').forEach(cardEl => {
      cardEl.style.display = (filter === 'all' || cardEl.dataset.type === filter)
        ? 'block'
        : 'none';
    });
  }
});
