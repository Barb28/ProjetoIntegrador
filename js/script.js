const ongs = [
  {
    nome: "ONG Patinhas que Brilham",
    lat: -23.955416,
    lon: -46.345823,
    endereco: "R. Carvalho de Mendonça, 670",
    foto: "img/logo-patinhasquebrilham.jpg",
    instagram: "ongpatinhasquebrilham",
    numero: "(13) 99782-5737",
    servicos: ["adocao"]
  },
  {
    nome: "ONG Defesa da Vida Animal (DVA)",
    lat: -23.961186,
    lon: -46.309234,
    endereco: "R. Alm. Tamandaré, 136",
    foto: "img/logo-dva.jpg",
    instagram: "ongdva",
    numero: "(13) 3273-3245",
    servicos: ["medico", "lar", "adocao"]
  },
  {
    nome: "Instituto Eliseu (antiga ONG Viva Bicho)",
    lat: -23.951246,
    lon: -46.334763,
    endereco: "R. João Guerra, 319",
    foto: "img/logo-institutoeliseu.png",
    instagram: "institutoeliseu",
    numero:"(13) 99611-5779",
    servicos: ["adocao", "medico", "lar"]
  }
];
 
let mapa = L.map('mapa').setView([-23.9608, -46.3336], 13);
 
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(mapa);
 
mapa.setMaxBounds([
  [-24.05, -46.45],
  [-23.85, -46.25]
]);
 
const caixa = document.getElementById("caixa-de-pesquisa");
const botao = document.getElementById("botao-de-pesquisa");
const resultados = document.getElementById("resultados-pesquisa");
 
let marcadorAtual = null;
 
function buscarONG() {
  const termo = caixa.value.toLowerCase();
  resultados.innerHTML = "";
  resultados.style.display = "block";
 
  const encontrados = ongs.filter(ong => ong.nome.toLowerCase().includes(termo));
 
  if(encontrados.length === 0) {
    resultados.innerHTML = "<p>Nenhuma ONG encontrada.</p>";
    return;
  }
 
  encontrados.forEach(ong => {
    const div = document.createElement("div");
    div.classList.add("ong");
 
    div.innerHTML = `
      <img src="${ong.foto}" alt="${ong.nome}">
      <div class="ong-info">
        <h3>${ong.nome}</h3>
        <p>${ong.endereco}</p>
        <p><i class="fab fa-instagram"></i>
      <a href="https://instagram.com/${ong.instagram}"
         target="_blank"
         rel="noopener noreferrer">
         @${ong.instagram}
      </a>
      </p>
        <p><i class="fa-solid fa-phone"></i>${ong.numero}</p>
        <div class="servicos">
          ${ong.servicos.includes("adocao") ? '<i class="fa-solid fa-heart" title="Adoção"></i>' : ''}
          ${ong.servicos.includes("lar") ? '<i class="fa-solid fa-house" title="Lar Temporário"></i>' : ''}
          ${ong.servicos.includes("vacina") ? '<i class="fa-solid fa-syringe" title="Vacinas"></i>' : ''}
          ${ong.servicos.includes("medico") ? '<i class="fa-solid fa-hospital" title="Serviços Veterinários"></i>' : ''}
        </div>
      </div>
    `;
 
    resultados.appendChild(div);
 
    if(marcadorAtual) mapa.removeLayer(marcadorAtual);
 
    marcadorAtual = L.marker([ong.lat, ong.lon]).addTo(mapa)
      .bindPopup(ong.nome).openPopup();
 
    mapa.setView([ong.lat, ong.lon], 16);
  });
}
 
botao.addEventListener("click", buscarONG);
caixa.addEventListener("keypress", e => {
  if(e.key === "Enter") buscarONG();
});
 
let menuHamburguer = document.querySelector(".menu-hamburguer");
let menu = document.querySelector(".menu")
let btnFechar = document.getElementById("sair")
 
console.log(menuHamburguer)
 
menuHamburguer.addEventListener("click", () =>{
    menu.classList.add("ativo")
})
 
btnFechar.addEventListener("click", () =>{
    menu.classList.remove("ativo")
})