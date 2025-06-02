function enableDragScroll(carrosselId) {
  const carrossel = document.getElementById(carrosselId);
  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;
  let lastX;
  let rafID;

  carrossel.addEventListener('mousedown', (e) => {
    isDown = true;
    carrossel.classList.add('dragging');
    startX = e.pageX - carrossel.offsetLeft;
    scrollLeft = carrossel.scrollLeft;
    lastX = startX;
    velocity = 0;
    cancelAnimationFrame(rafID);
  });

  carrossel.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    carrossel.classList.remove('dragging');
    momentumScroll();
  });

  carrossel.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    carrossel.classList.remove('dragging');
    momentumScroll();
  });

  carrossel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - carrossel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carrossel.scrollLeft = scrollLeft - walk;

    // Calcula a velocidade pela diferença do movimento do mouse
    velocity = x - lastX;
    lastX = x;
  });

  function momentumScroll() {
    velocity *= 0.95; // desaceleração suave
    carrossel.scrollLeft -= velocity;

    if (Math.abs(velocity) > 0.5) {
      rafID = requestAnimationFrame(momentumScroll);
    }
  }
}

// Ativando os dois carrosseis:
enableDragScroll("carroseul1");
enableDragScroll("carroseul2");

document.querySelectorAll('img').forEach(img => {
  img.ondragstart = () => false;
});

document.querySelectorAll('btn').forEach(btn => {
  btn.ondragstart = () => false;
});

