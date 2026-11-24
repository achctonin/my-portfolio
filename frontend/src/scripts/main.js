const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const narrow = window.matchMedia('(max-width: 700px)');
function closeMenu() {
  navigation.hidden = narrow.matches;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.textContent = 'Menu';
}
function syncNavigation() {
  toggle.hidden = !narrow.matches;
  closeMenu();
}
syncNavigation();
narrow.addEventListener('change', syncNavigation);
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Close menu' : 'Menu';
  navigation.hidden = !open;
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && narrow.matches && !navigation.hidden) {
    closeMenu();
    toggle.focus();
  }
});
const image = document.querySelector('#project-image');
const caption = document.querySelector('#image-caption');
const controls = [...document.querySelectorAll('[data-image]')];
controls.forEach((button, index) => {
  button.addEventListener('click', () => {
    controls.forEach(control => control.setAttribute('aria-pressed', String(control === button)));
    image.src = `../../../src/metropolitan-th/${button.dataset.image}.png`;
    image.alt = `Metropolitan Theater application ${button.dataset.image} module`;
    caption.textContent = `0${index + 1} / ${button.textContent} module — application screenshot`;
  });
});

// Keep native details semantics, with interruptible opening AND closing motion.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.personal-notes details').forEach(details => {
  const summary = details.querySelector('summary');
  let animation = null;
  let expanded = details.open;
  details.dataset.expanded = String(expanded);

  function settle() {
    if (animation) animation.cancel();
    animation = null;
    details.open = expanded;
    details.style.overflow = '';
    summary.setAttribute('aria-expanded', String(expanded));
  }

  summary.addEventListener('click', event => {
    event.preventDefault();
    const start = details.getBoundingClientRect().height;
    if (animation) animation.cancel();
    expanded = !expanded;
    details.dataset.expanded = String(expanded);
    summary.setAttribute('aria-expanded', String(expanded));
    if (reducedMotion.matches || typeof details.animate !== 'function') {
      settle();
      return;
    }

    // Keep content present until the closing animation finishes.
    details.open = true;
    const style = getComputedStyle(details);
    const border = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    const end = expanded
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + border;
    details.style.overflow = 'hidden';
    animation = details.animate(
      { height: [`${start}px`, `${end}px`] },
      { duration: 320, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' }
    );
    animation.onfinish = settle;
  });
  // Apply a changed OS preference immediately, even during an animation.
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) settle();
  });
});
