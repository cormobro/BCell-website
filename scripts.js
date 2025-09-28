

document.addEventListener('DOMContentLoaded', () => {
  // 1. Gestion du toggle mobile
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const siteheader = document.querySelector('.site-header'); // Ajouté pour le scroll

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('nav-toggle').checked = false;
  });
});

  // 2. Gestion de l'effet de scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      siteheader.classList.add('scrolled');
    } else {
      siteheader.classList.remove('scrolled');
    }
  });


  // capture clicks BEFORE htmx handlers run
document.addEventListener('click', function (e) {
  const clickedCard = e.target.closest('.products-product-list-link');
  if (!clickedCard) return;

  // Si la carte est déjà active -> on remplace la requête prévue par htmx
  if (clickedCard.classList.contains('active')) {
    // empêche htmx d'envoyer sa propre requête
    e.preventDefault();
    e.stopImmediatePropagation();

    const productSpecs = document.getElementById('product-specs');
    if (!productSpecs) return;

    clickedCard.classList.remove('active');
    //productSpecs.style.display = 'flex';

    // URL de la page "choisir produit" — utilise un chemin absolu pour éviter les problèmes relatifs
    const chooseUrl = '/fragments/products/choose_product.html';

    if (window.htmx) {
      // appelle htmx manuellement -> respecte les events htmx
      htmx.ajax('GET', chooseUrl, { target: '#product-specs', swap: 'innerHTML' });
    } else {
      // fallback si htmx non chargé
      fetch(chooseUrl)
        .then(r => r.text())
        .then(html => { productSpecs.innerHTML = html; })
        .catch(err => console.error('Fetch failed', err));
    }

    return;
  }
  document.querySelectorAll('.products-product-list-link').forEach(c => c.classList.remove('active'))
  clickedCard.classList.add('active');
}, true);
});

  // Initialisation au chargement
  if (window.scrollY > 10) {
    siteheader.classList.add('scrolled');
  }

 /* ---- Gestion Shadowbox ---- */

(function(){
  const shadowbox = document.querySelector('.shadowbox');
  if(!shadowbox) return;

  // Fonction pour charger un produit
  function loadProduct(url) {
    shadowbox.setAttribute('hx-get', url);
    htmx.trigger(shadowbox, 'refresh'); // déclenche la requête hx-get manuellement
  }

  // Au chargement, charger le premier produit actif
  const activeCard = document.querySelector('.product-card.active');
  if(activeCard) {
    loadProduct(activeCard.dataset.url);
  }


  // Après swap HTMX : ouvrir la shadowbox avec animation
  shadowbox.addEventListener('htmx:afterSwap', () => {
    shadowbox.classList.add('open');
  });

  // Optionnel : fermer shadowbox avec animation (max-height)
  shadowbox.addEventListener('transitionend', e => {
    if(e.propertyName === 'max-height' && !shadowbox.classList.contains('open')) {
      shadowbox.innerHTML = '';
    }
  });
})();


//Reset scroll on HX-GET
document.body.addEventListener('htmx:afterSwap', function(evt) {
  var triggerElement = evt.detail.elt;
  if (triggerElement.classList.contains('reset-scroll')) {
    window.scrollTo(0, 0);
  }
});
