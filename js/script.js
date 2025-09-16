const mapa = L.map('mapa').setView([-23.9608, -46.3336], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap colaboradores'
}).addTo(mapa);

const limitesSantos = [
  [-24.05, -46.45], // sudoeste (lat, lng)
  [-23.85, -46.25]  // nordeste (lat, lng)
];
mapa.setMaxBounds(limitesSantos);
mapa.on('drag', () => mapa.panInsideBounds(limitesSantos, { animate: true }));
mapa.setMinZoom(12);
mapa.setMaxZoom(18);

const marcadores = L.layerGroup().addTo(mapa);

const botaoPesquisa = document.getElementById('botao-de-pesquisa');
const caixaPesquisa = document.getElementById('caixa-de-pesquisa');
const resultadosDiv = document.getElementById('resultados-pesquisa');

if (!botaoPesquisa || !caixaPesquisa || !resultadosDiv) {
  console.error('Elemento(s) faltando: verifique se os ids "botao-de-pesquisa", "caixa-de-pesquisa" e "resultados-pesquisa" existem no HTML.');
}

async function buscar() {
  const raw = caixaPesquisa.value.trim();
  if (!raw) {
    resultadosDiv.style.display = 'none';
    return;
  }

  resultadosDiv.style.display = 'block';
  resultadosDiv.innerHTML = '<p style="margin:8px;">Buscando...</p>';

  const viewbox = '-46.45,-23.85,-46.25,-24.05';
  const q = encodeURIComponent(raw);
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=8&viewbox=${viewbox}&bounded=1&accept-language=pt-BR&q=${q}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    marcadores.clearLayers();
    resultadosDiv.innerHTML = '';
    if (!data || data.length === 0) {
      resultadosDiv.innerHTML = '<p style="margin:8px;">Nenhum resultado encontrado em Santos.</p>';
      return;
    }

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.margin = '0';

    data.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.display_name;
      li.style.padding = '8px';
      li.style.cursor = 'pointer';
      li.style.borderBottom = '1px solid #eee';
      li.dataset.lat = item.lat;
      li.dataset.lon = item.lon;

      li.addEventListener('click', () => {
        const lat = parseFloat(li.dataset.lat);
        const lon = parseFloat(li.dataset.lon);

        marcadores.clearLayers();
        mapa.setView([lat, lon], 16);
        const marker = L.marker([lat, lon]).addTo(marcadores);
        marker.bindPopup(item.display_name).openPopup();

        resultadosDiv.style.display = 'none';
      });

      ul.appendChild(li);
    });

    resultadosDiv.appendChild(ul);

  } catch (err) {
    console.error('Erro na busca:', err);
    resultadosDiv.innerHTML = `<p style="margin:8px;">Erro na busca: ${err.message}</p>`;
  }
}

if (botaoPesquisa) botaoPesquisa.addEventListener('click', buscar);
if (caixaPesquisa) {
  caixaPesquisa.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      buscar();
    }
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.barra-de-pesquisa') && !e.target.closest('#resultados-pesquisa')) {
    resultadosDiv.style.display = 'none';
  }
});