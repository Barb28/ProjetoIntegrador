document.addEventListener('DOMContentLoaded', () => {

    const btnPesquisar = document.getElementById('btn-pesquisar');
    const todosOsCards = document.querySelectorAll('.pet-card');
    
        const mensagemNenhumAnimal = document.getElementById('nenhum-animal-encontrado');

    const filtros = {
        especie: document.getElementById('especie'),
        raca: document.getElementById('raca'),
        porte: document.getElementById('porte'),
        sexo: document.getElementById('sexo'),
        ong: document.getElementById('ong')
    };

    btnPesquisar.addEventListener('click', filtrarPets);


    function filtrarPets() {
        const valoresFiltro = {
            especie: filtros.especie.value,
            raca: filtros.raca.value,
            porte: filtros.porte.value,
            sexo: filtros.sexo.value,
            ong: filtros.ong.value
        };

        
        let animaisVisiveis = 0;

        todosOsCards.forEach(card => {
            const dadosDoCard = {
                especie: card.dataset.especie,
                raca: card.dataset.raca,
                porte: card.dataset.porte,
                sexo: card.dataset.sexo,
                ong: card.dataset.ong
            };

            let mostrarCard = true;

            for (const chave in valoresFiltro) {
                if (valoresFiltro[chave] && valoresFiltro[chave] !== dadosDoCard[chave]) {
                    mostrarCard = false;
                    break;
                }
            }

            if (mostrarCard) {
                card.style.display = 'flex';
                
                animaisVisiveis++;
            } else {
                card.style.display = 'none';
            }
        });

        
        if (animaisVisiveis === 0) {
             mensagemNenhumAnimal.style.display = 'block';
        } else {
            mensagemNenhumAnimal.style.display = 'none';
        }
    }
});