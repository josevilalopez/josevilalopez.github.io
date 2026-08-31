// Navegación: la portada se muestra al entrar y cada apartado se abre por separado.
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('[data-section]');

function showSection(id) {
  sections.forEach(section => {
    section.classList.toggle('visible', section.id === id);
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === id);
  });

  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    showSection(link.dataset.section);
  });
});

// Si se carga la página con #galeria, por ejemplo, abrimos directamente esa sección.
const initialId = window.location.hash.replace('#', '');
if (initialId && document.getElementById(initialId)?.classList.contains('content-section')) {
  showSection(initialId);
}

// Galería: las miniaturas son cuadradas, pero al hacer clic la foto se muestra completa.
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeButton = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || 'Fotografía ampliada';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    openLightbox(item.dataset.image, image?.alt);
  });
});

closeButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
});

// Los enlaces de ejemplo que todavía no tienen contenido no hacen saltar la página.
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});
