const cards = document.querySelectorAll('.dropdownCard');

cards.forEach(card => {
  const corOriginal = "#355092"; // cor inicial
  const corAtivo = "#3f7ccd";    // cor quando ativo

  // Inicializa a cor
  card.style.backgroundColor = corOriginal;

  // Clique no card
  card.addEventListener('click', () => {
    if (card.classList.contains('dropDownAtivo')) {
      card.classList.remove('dropDownAtivo');
      card.style.backgroundColor = corOriginal;
    } else {
      card.classList.add('dropDownAtivo');
      card.style.backgroundColor = corAtivo;
    }
  });
});

// Opcional: manter cor original ao redimensionar a tela
window.addEventListener('resize', () => {
  cards.forEach(card => {
    if (!card.classList.contains('dropDownAtivo')) {
      card.style.backgroundColor = "#355092";
    }
  });
});