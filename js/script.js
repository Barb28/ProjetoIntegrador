let ong1 = { nome: "ONG Patinhas que Brilham", lat: -23.955416, lon: -46.345823};
let ong2 = { nome: "ONG Defesa da Vida Animal", lat: -23.961186202073417, lon: -46.30923364528388};
let ong3 = { nome: "Instituto Eliseu", lat: -23.95124589382297, lon: -46.3347634590732};
let ong4 = { nome: "OSCIP SOS Animais de Rua", lat: -23.964307098751306, lon: -46.34104944742831};

let mapa = L.map('mapa').setView([-23.9608, -46.3336], 13);

let limitesSantos = [
  [-24.05, -46.45], // sudoeste (lat, lon)
  [-23.85, -46.25]  // nordeste (lat, lon)
];

mapa.setMaxBounds(limitesSantos);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(mapa);

let botao = document.getElementById('botao-de-pesquisa');
let caixa = document.getElementById('caixa-de-pesquisa');

botao.onclick = function() {
  let texto = caixa.value.toLowerCase();

  if (texto === "ong patinhas que brilham") {
    mapa.setView([ong1.lat, ong1.lon], 16);
    L.marker([ong1.lat, ong1.lon]).addTo(mapa)
      .bindPopup(ong1.nome).openPopup();
  } 
  else if (texto === "ong defesa da vida animal") {
    mapa.setView([ong2.lat, ong2.lon], 16);
    L.marker([ong2.lat, ong2.lon]).addTo(mapa)
      .bindPopup(ong2.nome).openPopup();
  } 
  else if (texto === "instituto eliseu") {
    mapa.setView([ong3.lat, ong3.lon], 16);
    L.marker([ong3.lat, ong3.lon]).addTo(mapa)
      .bindPopup(ong3.nome).openPopup();
  } 
  else if (texto === "oscip sos animais de rua") {
    mapa.setView([ong4.lat, ong4.lon], 16);
    L.marker([ong4.lat, ong4.lon]).addTo(mapa)
      .bindPopup(ong4.nome).openPopup();
  } 
  else {
    alert("ONG não encontrada!");
  }
}