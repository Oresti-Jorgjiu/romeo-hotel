
(function(){
  const cfg = window.ROMEO_CONFIG || {};
  document.querySelectorAll('[data-phone]').forEach(el=>el.textContent=cfg.phoneDisplay||'');
  document.querySelectorAll('a[data-email]').forEach(el=>{el.textContent=cfg.email||''; el.href='mailto:'+(cfg.email||'');});
  document.querySelectorAll('[data-address]').forEach(el=>el.textContent=cfg.address||'');
  document.querySelectorAll('[data-map]').forEach(el=>{if(cfg.mapEmbed) el.src=cfg.mapEmbed;});

  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if(menuBtn && nav){
    menuBtn.addEventListener('click', ()=>{
      nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true':'false');
    });
  }

  const form = document.querySelector('[data-booking-form]');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const fd = new FormData(form);
      const data = Object.fromEntries(fd.entries());
      const required = ['name','phone','checkin','checkout','room'];
      const missing = required.some(k => !data[k]);
      const status = document.querySelector('[data-status]');
      if(missing){
        if(status) status.textContent = status.dataset.required || 'Please complete all required fields.';
        return;
      }
      const msg = [
        'Hello, I want to request a booking at Romeo Hotel.',
        'Name: ' + (data.name || ''),
        'Email: ' + (data.email || ''),
        'Phone: ' + (data.phone || ''),
        'Check-in: ' + (data.checkin || ''),
        'Check-out: ' + (data.checkout || ''),
        'Guests: ' + (data.guests || ''),
        'Room: ' + (data.room || ''),
        data.message ? 'Message: ' + data.message : ''
      ].filter(Boolean).join('\n');
      const url = 'https://wa.me/' + (cfg.whatsappNumber || '') + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank', 'noopener');
      if(status) status.textContent = status.dataset.sent || 'Your WhatsApp request is ready.';
    });
  }

  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
  document.querySelectorAll('[data-lightbox]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      if(!lightbox || !lightboxImg) return;
      lightboxImg.src = this.getAttribute('href');
      lightbox.classList.add('show');
    });
  });
  document.querySelectorAll('[data-close-lightbox]').forEach(btn=>{
    btn.addEventListener('click', ()=> lightbox && lightbox.classList.remove('show'));
  });
  if(lightbox){
    lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.classList.remove('show'); });
  }

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent = new Date().getFullYear());
})();
