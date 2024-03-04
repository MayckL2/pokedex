
// Tipagem dos pokemons
export type PokemonType = {
    id: number,
    name: string,
    weight: number,
    height: number,
    types: Array<{ type: { name: string } }>,
    sprites: {
        back_default: string,
        front_default: string,
        back_shiny: string,
        front_shiny: string,
    },
    stats: Array<{base_stat: number, stat: {name:string}}>
}

// url da api
const url = 'https://pokeapi.co/api/v2'

// chama todos os pokemons
export async function getAll(next: string = '') {
    let response = await fetch(next ? next : url + '/pokemon/')
    let data = await response.json()
    return data
}

// chama pokemon pelo id ou nome
export async function getPokemon(name = '') {
    try {
        let response = await fetch(url + '/pokemon/' + name)
        let data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

// pesquisa pelo pokemon pelo nome
export async function searchPokemon(name = '') {
    try {
        let response = await fetch(url + '/pokemon/' + name)
        let data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

// chama todos os tipos de pokemons
export async function getTypes(name = '') {
    let response = await fetch(url + '/type/' + name)
    let data = await response.json()
    return data
}

// chama todos os habitates dos pokemons
export async function getHabitats(name = '') {
    let response = await fetch(url + '/pokemon-habitat/' + name)
    let data = await response.json()
    return data
}

// Chama dados do github para exibição
export async function getGitHub(){
    let response = await fetch('https://api.github.com/users/mayckl2')
    let data = await response.json()
    return data
}