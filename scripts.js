// Toggle navigation mobile
// document.addEventListener('DOMContentLoaded', () => {
//   const navToggle = document.querySelector('.nav-toggle');
//   const mainNav = document.querySelector('.main-nav');

//   navToggle.addEventListener('click', () => {
//     mainNav.classList.toggle('open');
//   });
// });

document.addEventListener('DOMContentLoaded', () => { 
  // 1. Gestion du toggle mobile
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const siteheader = document.querySelector('.site-header'); // Ajouté pour le scroll

  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  // 2. Gestion de l'effet de scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      siteheader.classList.add('scrolled');
    } else {
      siteheader.classList.remove('scrolled');
    }
  });

    document.addEventListener('click', (e) => {
    if (e.target.closest('.product-card')) {
      const clickedCard = e.target.closest('.product-card');
      const productSpecs = document.getElementById('product-specs');
      // If clicking on already active card
      if (clickedCard.classList.contains('active')) {
        clickedCard.classList.remove('active');
        productSpecs.style.display = 'none'; // Hide the specs
      } else {
        // If clicking on a different card
        document.querySelectorAll('.product-card').forEach(c => c.classList.remove('active'));
        clickedCard.classList.add('active');
        productSpecs.style.display = 'flex'; // Show the specs
        productSpecs.style.backgroundColor = '#dff4ff';
      }
    }
  });
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

  // Gestion clic sur product-card
  document.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if(!card) return;

    if(card.classList.contains('active')) {
      // Si clic sur la même carte : fermeture
      card.classList.remove('active');
      shadowbox.classList.remove('open');
      shadowbox.innerHTML = '';
      shadowbox.removeAttribute('hx-get');
      return;
    }

    // Sinon, changement de produit actif
    document.querySelectorAll('.product-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    // Charge produit et ouvre shadowbox
    loadProduct(card.dataset.url);
  });

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






/* -------------------- */

//   document.addEventListener('click', (e) => {
//     if (e.target.closest('.product-card')) {
//       const clickedCard = e.target.closest('.product-card');
//       document.querySelectorAll('.product-card').forEach(c => c.classList.remove('active'));
//       clickedCard.classList.add('active');
//     }
//   });
// });

//Reset scroll on HX-GET
document.body.addEventListener('htmx:afterSwap', function(evt) {
  var triggerElement = evt.detail.elt;
  if (triggerElement.classList.contains('reset-scroll')) {
    window.scrollTo(0, 0);
  }
});