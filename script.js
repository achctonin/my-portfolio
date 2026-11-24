/* ============================================================
   MOBILE NAV
   ============================================================ */
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
});

// Close mobile nav after a link is tapped
mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    });
});

/* ============================================================
   IMAGE CAROUSEL (Metropolitan Theater project)
   ============================================================ */
const carouselState = {};

function initCarousels() {
    document.querySelectorAll('.carousel').forEach(carousel => {
        const id = carousel.id;
        const track = carousel.querySelector('.carousel-track');
        const imgs = track ? track.querySelectorAll('img') : [];
        if (imgs.length <= 1) return;

        carouselState[id] = { index: 0, total: imgs.length };

        const dotsEl = carousel.querySelector('.carousel-dots');
        if (dotsEl) {
            dotsEl.innerHTML = '';
            imgs.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.onclick = () => goToSlide(id, i);
                dotsEl.appendChild(dot);
            });
        }
    });
}

function slideCarousel(id, dir) {
    const state = carouselState[id];
    if (!state) return;
    goToSlide(id, (state.index + dir + state.total) % state.total);
}

function goToSlide(id, index) {
    const state = carouselState[id];
    if (!state) return;
    state.index = index;

    const carousel = document.getElementById(id);
    const track = carousel.querySelector('.carousel-track');
    track.style.transform = `translateX(-${index * 100}%)`;

    const dots = carousel.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

document.addEventListener('DOMContentLoaded', initCarousels);