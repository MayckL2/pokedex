import { useEffect, useState } from 'react'
import { PokemonType, getHabitats, getPokemon } from '../services/api'
import Header from '../components/header'
import * as Tabs from '@radix-ui/react-tabs';
import { Pokemon } from '../components/pokemon';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from '../components/footer';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";

type habitatType = {
    name: string,
    url: string
}

export default function Habitats() {
    const [choices, setChoices] = useState<Array<habitatType>>([])
    const [tab, setTab] = useState('')
    const [pokemons, setPokemons] = useState<Array<PokemonType>>([])
    const [erro, setErro] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate();
    const { page } = useParams()

    // Carrega todos os habitates
    async function loadHabitats() {
        let response = await getHabitats()
        console.log(response.results)
        setChoices(response.results)
    }

    // Chama pokemons pertencentes a determinado habitate
    async function pokemonFromHabitats(name: string, pagination: number = 1) {
        navigate(`/habitats/${pagination}`)
        setLoaded(false)
        let response = await getHabitats(name)
        console.log(response)
        let pokemons = []
        // pega dados mais especificos dos pokemons pelo nome e salva em um array
        for (let i = 0; i < 20; i++) {
            if (response.pokemon_species[i * pagination]) {
                let data = await getPokemon(response.pokemon_species[i * pagination].name)
                if(data) pokemons.push(data)
                data = {}
            }
        }
        if (pokemons.length == 0) {
            setErro(true)
        } else {
            setPokemons(pokemons)
        }
        setLoaded(true)
    }

    // coleta pokemons por habitate correspondente
    useEffect(() => {
        pokemonFromHabitats(tab, Number(page))
    }, [tab])

    // carrega habitates e chama por padrão pokemon prertencentes caverna
    useEffect(() => {
        loadHabitats()
        setTab('cave')
        pokemonFromHabitats('cave', Number(page))
    }, [])

    // passa para proxima pagina de pokemons
    function handleNext(): void {
        pokemonFromHabitats(tab, Number(page) + 1)
    }

    // volta para pagina anterior de pokemons
    function handlePrevious(): void {
        if (Number(page) > 1) {
            pokemonFromHabitats(tab, Number(page) - 1)
        } else {
            toast.warning('It no pages to come back...', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce
            })
        }
    }

    // Escolhe imagem de fundo pelo habitate
    function pickHabitat(hab: string) {
        console.log(hab)
        switch (hab) {
            case 'cave':
                return 'bg-cave'
            case 'forest':
                return 'bg-forest'
            case 'grassland':
                return 'bg-grassland'
            case 'mountain':
                return 'bg-mountain'
            case 'rare':
                return 'bg-rare'
            case 'rough-terrain':
                return 'bg-rough_terrain'
            case 'sea':
                return 'bg-sea'
            case 'urban':
                return 'bg-urban'
            case 'waters-edge':
                return 'bg-water_edge'
            default:
                return 'bg-forest'
        }
    }

    return (<>
        <Header />
        <ToastContainer />

        <div className={`${pickHabitat(tab)} bg-no-repeat bg-cover bg-fixed p-8 min-h-screen`}>
            <main className={`flex flex-col justify-center items-center gap-8 rounded-xl bg-sky-700/40`}>
                <Tabs.Root defaultValue="cave" onValueChange={(e) => setTab(e)} className='w-full'>
                    <Tabs.List>
                        <div className='w-full p-4 border-2 rounded-t-xl flex justify-center items-center flex-wrap'>
                            {choices?.length > 0 && choices.map((value: habitatType, key: number) => (
                                <Tabs.Trigger value={value.name} key={key} className={`${tab == value.name ? 'border-yellow-500 text-yellow-500' : 'border-transparent'} border-b-2 transition-all capitalize p-2 font-bold text-base`}>
                                    {value.name}
                                </Tabs.Trigger>
                            ))}
                        </div>
                    </Tabs.List>

                    <section className='p-4 border-x-2 border-b-2 rounded-b-xl'>

                        {erro && <div className='w-full py-20 flex flex-col justify-center items-center'>
                            <img className='w-40' src={'/cubone.png'} alt='cranio de cubone' />
                            <p className='text-3xl'>not found...</p>
                        </div>}

                        <Tabs.Content value={tab}>
                            {/* Mostra imagem de carregamento, depois exibe pokemons ou imagem de não encontrada */}
                            {!loaded ?
                                <div className='w-full py-20 flex flex-col justify-center items-center'>
                                    <img className='w-40 animate-bounce' src={'/sleeping.png'} alt='loading' />
                                    <p className='text-3xl font-bold'>Loading...</p>
                                </div>
                                :
                                <>
                                    <div className='flex gap-4 mb-4'>
                                        {/* Se preenchido, botão é exibido */}
                                        <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handleNext}>Next <FaArrowRight /></button>
                                        <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handlePrevious}><FaArrowLeft /> Previous</button>
                                    </div>
                                    <Pokemon data={pokemons} />
                                </>
                            }

                        </Tabs.Content>
                    </section>

                </Tabs.Root>
            </main>
        </div>

        <Footer/>
    </>)
}