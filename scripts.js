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

  // Initialisation au chargement
  if (window.scrollY > 10) {
    siteheader.classList.add('scrolled');
  }
});
