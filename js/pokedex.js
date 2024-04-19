let ol$ = document.querySelector('#pokedex');
//let pokemons = [];
let btn$ = document.querySelectorAll('.btn');
const getCharacters = async() => {
    let pokemons = [];
    for (let i = 1; i <= 151; i++){
        const url = 'https://pokeapi.co/api/v2/pokemon/' + i; 
        const responde = await fetch(url);
        const data = await responde.json();
        pokemons.push(data);

    }
    return pokemons;
}

const mapCharacters = (getCharactersSinMap) => {
    return getCharactersSinMap.map((character)=>({
        nombre: character.name,
        imagen: character.sprites['front_default'],
        type: character.types.map(type=> type.type.name).join(','),
        id:character.id,
    }));
};

const drawCharacters = (charactersmapp) =>{
    ol$.innerHTML = " ";
    for(let character of charactersmapp){
        let characterDiv$ = document.createElement('div');
        characterDiv$.className = 'card';
        ol$.appendChild(characterDiv$);
        characterDiv$.appendChild(getImages(character));
        characterDiv$.appendChild(setTittle(character));
        characterDiv$.appendChild(setSubtitle(character));
        characterDiv$.appendChild(getType(character));

    }
}
const getImages = (character) =>{
    let spritesPokemon$ = document.createElement('img');
        spritesPokemon$.className = 'card-image';
        spritesPokemon$.setAttribute('src',character.imagen);
        spritesPokemon$.setAttribute('alt',character.nombre);
        return spritesPokemon$;
}
const setTittle = (character) =>{
    let namePokemon$ = document.createElement('h2');
    namePokemon$.className = 'card-tittle';
    namePokemon$.textContent = character.nombre;
    return namePokemon$
}
const setSubtitle = (character) => {
    let idPokemon$ = document.createElement('h3');
        idPokemon$.className = 'card-subtitle';
        idPokemon$.textContent = character.id;
        return idPokemon$;
}
const getType = (character) =>{
    let typePokemon$ = document.createElement('h3');
        typePokemon$.className= 'tipe';
        typePokemon$.textContent = character.type;
        return typePokemon$;
}

const Input = (pokemons) => {
    const input$ = document.querySelector('#input');
   input$.addEventListener('input',(event)=>{
const search = event.target.value.toLowerCase();
const filter = pokemons.filter(pokemons =>
pokemons.nombre.toLowerCase().includes(search));
drawCharacters(filter);
});
};

const addTypeButtonClickEvent = (pokemons) => {
    btn$.forEach(button => { 
        button.addEventListener("click", () => { 
            let type = button.textContent.toLowerCase(); 
            if (type === "ver todos") {
               drawCharacters(pokemons); 
            } else {
               const filtrearpokemons = pokemons.filter(pokemon =>
                    pokemon.type.includes(type)
                ); 
                drawCharacters(filtrearpokemons); 
            }
        });
    });
};
      


async function init() {
    const getCharactersSinMap = await getCharacters();
    const charactersmapp = mapCharacters(getCharactersSinMap);
    drawCharacters(charactersmapp);
    Input(charactersmapp);
    addTypeButtonClickEvent(charactersmapp);

}
init()
