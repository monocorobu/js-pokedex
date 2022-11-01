const pokemonListInHtml = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecord = 150
const limit = 6
let offset = 0




function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
                const newHtml = pokemonList.map((pokemon) => `
        <li class="pokemon ${pokemon.type} ">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    <div class="details">
                        <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}                        

                        </ol>
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>
            </li>   
        
        `).join('')


    pokemonListInHtml.innerHTML += newHtml
})
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', ()=>{    
    offset += limit   
    
    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecord) {
        const newLimit = maxRecord - offset  
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset, limit)
    }

    
})