// JavaScript del portfolio
// Aquí añadiremos las interacciones de la web cuando las necesitemos.

// Evita que los enlaces provisionales (#) salten al principio de la página.
document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});
