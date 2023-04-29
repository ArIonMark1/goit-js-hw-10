import './css/styles.css'

// #################################################################
const pokemonBlock = document.querySelector('div[class=pokemon-card]')
const pokemonList = document.querySelector('.pokemon-list');
// #################################################################

const params = new URLSearchParams({
    offset: 1,
    limit: 5
});

const link = fetch(`https://pokeapi.co/api/v2/pokemon`)
// #################################################################
link.then(response => {
    if (!response.ok) {
        throw new Error(response.status)
    }
    return response.json()
})
    .then(pokemon => {
        console.log('pokemon: ', pokemon.results)

        //****************************
        const pokemonName = pokemon.results.map((pokemon) => {
            return `
                    <li class="pokemon-data">
                        <h2>${pokemon.name}</h2>
                        <p><a class='card-link' href="${pokemon.url}">Show Pokemon card</a></p>
                    </li>
            `
        }).join('');

        pokemonList.insertAdjacentHTML('beforeend', pokemonName)
        //****************************
    })
    .catch(error => console.error(`${error}:: Wrong link to serwer!!! `))

// #################################################################

pokemonList.addEventListener('click', (event) => { 
    event.preventDefault();
    console.log(event.target.href);

    pokemonCardMarkup(event.target.href);
})

function pokemonCardMarkup(link) { 
    
    fetch(link)
        .then((response) => { 
            if (!response.ok) { 
                throw Error(':: Pokemon does not exist!!')
            }
            return response.json();
        })
        .then((data) => { 
            pokemonBlock.innerHTML = markupOne(data);
        })
        .catch((err) => console.error(err))
}

function markupOne(pokemon) { 

    const { name, sprites, weight, height, abilities: [...args] } = pokemon;

        const pokemonAbil = args.map(element => {
            return` <li class="list-group-item">${element.ability.name}</li> `
        }).join('');
    
    return `
        <div class="card">

            <div class="card-img-top">
                <img src="${sprites.front_default}" width='150px' height='150px' alt="${name}" />
            </div>
            <div class="card-body">

                <h2 class="card-title">Name: ${name}</h2>
                <p class="card-text">Weight: ${weight} kg.</p>
                <p class="card-text">Height: ${height}'</p>
                <p class="card-text"><b>Skills</b></p>
                <ul class="list-group"></ul>
                    ${pokemonAbil}
                </ul>
            </div>
        </div>
    `
};