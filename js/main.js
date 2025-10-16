const track = document.querySelector(".carousel-track");
const items = gsap.utils.toArray(".carousel-item");

// Defina o gap igual ao do Tailwind (gap-x-4 = 16px)
const GAP = 16;

function createInfiniteCarousel() {
  gsap.killTweensOf(track);

  // Calcula largura total da track (todos os itens + gaps)
  const itemWidth = items[0].offsetWidth + GAP;
  const totalWidth = itemWidth * items.length;

  // Duplicar os itens para garantir continuidade visual
  if (track.children.length === items.length) {
    items.forEach(item => {
      const clone = item.cloneNode(true);
      track.appendChild(clone);
    });
  }

  // Anima a track para a esquerda
  gsap.set(track, { x: 0 });
  gsap.to(track, {
    x: `-=${totalWidth}`,
    duration: 15, // ajuste a velocidade
    ease: "none",
    repeat: -1,
    modifiers: {
      x: (x) => {
        let mod = parseFloat(x) % totalWidth;
        return `${mod}px`;
      },
    },
  });
}

createInfiniteCarousel();
window.addEventListener("resize", createInfiniteCarousel);