const track = document.querySelector(".carousel-track");
const items = gsap.utils.toArray(".carousel-item");

function createInfiniteCarousel() {
  gsap.killTweensOf(items);

  // Calcula largura total (item + gap)
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const itemWidth = items[0].offsetWidth + gap;
  const totalWidth = itemWidth * items.length;

  // Posiciona cada item em linha
  gsap.set(items, { x: (i) => i * itemWidth });

  // Cria animação contínua e suave
  gsap.to(items, {
    x: `-=${totalWidth}`, // move para a esquerda
    duration: 10, // ajuste a velocidade
    ease: "none",
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
    },
  });
}

// Inicializa e reconfigura no resize
createInfiniteCarousel();
window.addEventListener("resize", createInfiniteCarousel);
