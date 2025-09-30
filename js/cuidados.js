const cards = document.querySelectorAll('.dropdownCard');

cards.forEach(card => {
  const corOriginal = "#355092"; // cor inicial
  const corAtivo = "#3f7ccd";    // cor quando ativo

  // Inicializa a cor
  card.style.backgroundColor = corOriginal;

  // Clique no card
  card.addEventListener('click', () => {
    if (card.classList.contains('ativo')) {
      card.classList.remove('ativo');
      card.style.backgroundColor = corOriginal;
    } else {
      card.classList.add('ativo');
      card.style.backgroundColor = corAtivo;
    }
  });
});

// Opcional: manter cor original ao redimensionar a tela
window.addEventListener('resize', () => {
  cards.forEach(card => {
    if (!card.classList.contains('ativo')) {
      card.style.backgroundColor = "#355092";
    }
  });
});