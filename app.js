document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10;
    let currentPage = 1;
    let pokemonData = [];
    
    const pokemonList = document.getElementById('pokemon-list');
    const paginationContainer = document.getElementById('pagination');

    const loadPokemonData = async () => {
        try {
            const response = await fetch('pokemonData.json');
            pokemonData = await response.json();
            renderPokemonList();
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    };

    const renderPokemonList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPokemonList = pokemonData.slice(startIndex, endIndex);

        pokemonList.innerHTML = '';

        currentPokemonList.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = pokemon.name;
            pokemonList.appendChild(listItem);
        });

        renderPagination();
    };

    const renderPagination = () => {
        const totalPages = Math.ceil(pokemonData.length / itemsPerPage);
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                renderPokemonList();
            });

            paginationContainer.appendChild(pageButton);
        }
    };

    loadPokemonData();
});
