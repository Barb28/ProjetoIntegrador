const cards = document.querySelectorAll('.dropdownCard');

cards.forEach(card => {
  const corOriginal = "#355092";
  const corAtivo = "#3f7ccd";

  card.style.backgroundColor = corOriginal;

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

window.addEventListener('resize', () => {
  cards.forEach(card => {
    if (!card.classList.contains('dropDownAtivo')) {
      card.style.backgroundColor = "#355092";
    }
  });
});