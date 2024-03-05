import { useEffect, useState } from 'react'
import { PokemonType, getPokemon, getTypes } from '../services/api'
import Header from '../components/header'
import * as Tabs from '@radix-ui/react-tabs';
import { Pokemon, choseColor } from '../components/pokemon';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Footer from '../components/footer';
import { toast, Bounce, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type habitatType = {
    name: string,
    url: string
}

export default function Types() {
    const [choices, setChoices] = useState<Array<habitatType>>([])
    const [tab, setTab] = useState('')
    const [pokemons, setPokemons] = useState<Array<PokemonType>>([])
    const [loaded, setLoaded] = useState(false)
    const [erro, setErro] = useState(false)
    const navigate = useNavigate();
    const { page } = useParams()
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTab(event.target.value);
        console.log(event.target.value)
    };

    // carrega tipos, pesquisa por padrão pokemons tipo 'normal' e reseta paginação
    async function loadTypes() {
        let response = await getTypes()
        console.log(response.results)
        setChoices(response.results)
        setTab('normal')
        pokemonFromType('normal', Number(page))
    }

    // Carrega todos os pokemons dos tipos correspondentes
    async function pokemonFromType(name: string, pagination: number = 1) {
        navigate(`/types/${pagination}`)
        setErro(false)
        setLoaded(false)
        setPokemons([])
        let response = await getTypes(name)
        let types = []
        // pega dados mais especificos dos pokemons pelo nome e salva em um array
        // coleta de 20 em 20 para melhor performace
        for (let i = 0; i < 20; i++) {
            if (response.pokemon[i * pagination]) {
                types.push(await getPokemon(response.pokemon[i * pagination].pokemon.name))
            }
        }
        // Se nenhum pokemon for encotrado
        if (types.length == 0) {
            setErro(true)
        } else {
            setErro(false)
            setPokemons(types)
        }

        // encerra carregamento
        console.log(types)
        setLoaded(true)
    }

    // reseta paginação e pesquisa pela categoria correspondente
    useEffect(() => {
        console.log(tab)
        navigate(`/types/1`)
        pokemonFromType(tab)
    }, [tab])

    // Ao iniciar a pagina, carrega tipos, pesquisa por padrão pokemons tipo 'normal' e reseta paginação
    useEffect(() => {
        loadTypes()
    }, [])

    // passa para proxima pagina de pokemons
    function handleNext() {
        pokemonFromType(tab, Number(page) + 1)
    }

    // volta para pagina anterior de pokemons
    function handlePrevious() {
        if (Number(page) > 1) {
            pokemonFromType(tab, Number(page) - 1)
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

    return (<>
        <Header />
        <ToastContainer />

        <main className='min-h-screen'>


            <div className='flex flex-col justify-center items-center gap-8 m-8 rounded-xl bg-sky-700'>
                <Tabs.Root defaultValue="normal" onValueChange={(e) => setTab(e)} className='w-full'>
                    <Tabs.List>
                        <div className='w-full p-4 border-2 rounded-t-xl grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-4'>
                            {choices?.length > 0 && choices.map((value: habitatType, key: number) => (
                                <Tabs.Trigger value={value.name} key={key} className={`${tab == value.name ? `${choseColor('type', value.name)} border-yellow-500` : 'border-white'} rounded-3xl border-2 transition-all capitalize p-2 font-bold text-base`}>
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
                                        {pokemons.length == 20 && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handleNext}>Next <FaArrowRight /></button>}
                                        {Number(page) > 1 && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handlePrevious}><FaArrowLeft /> Previous</button>}
                                    </div>
                                    <Pokemon data={pokemons} />
                                </>
                            }

                        </Tabs.Content>
                    </section>

                </Tabs.Root>
            </div>
        </main>

        <Footer />
    </>)
}