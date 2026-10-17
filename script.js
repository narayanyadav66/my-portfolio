try {
  if (window.Typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('element').textContent = '';
    new Typed('#element', { strings: ['Web Developer', 'Fullstack Developer', 'Python Developer'], typeSpeed: 50, backSpeed: 30, backDelay: 1400, loop: true });
  }
} catch (e) {}

var menu = document.getElementById('menu'), links = document.getElementById('links');
menu.addEventListener('click', function () {
  var open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('open'); menu.setAttribute('aria-expanded', false); } });

var navLinks = Array.prototype.slice.call(document.querySelectorAll('#links a'));
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id); });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('header[id], section[id]').forEach(function (s) { io.observe(s); });
}

document.getElementById('resume').addEventListener('click', function (e) { e.preventDefault(); });

document.getElementById('copy').addEventListener('click', function () {
  var btn = this, el = document.getElementById('email');
  function done() { btn.textContent = 'Copied'; setTimeout(function () { btn.textContent = 'Copy email'; }, 1500); }
  function fallback() { var r = document.createRange(); r.selectNodeContents(el); var s = getSelection(); s.removeAllRanges(); s.addRange(r); }
  try { navigator.clipboard.writeText(el.textContent).then(done, fallback); } catch (e) { fallback(); }
});
