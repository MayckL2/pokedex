import { useEffect, useState } from 'react'
import { Pokemon } from '../components/pokemon'
import { motion, useScroll } from "framer-motion"
import { getAll, getPokemon, searchPokemon } from '../services/api'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { MdCatchingPokemon } from 'react-icons/md'
import Header from '../components/header'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/footer'
import Gif from '../assets/gif.gif'

export default function Home() {
    const { scrollYProgress } = useScroll()
    const [data, setData] = useState<Array<any>>([])
    const [pagination, setPagination] = useState<{ next: string | undefined, previous: string }>()
    const [pesquisa, setPesquisa] = useState('')
    const [load, setLoad] = useState(false)
    const [notFound, setNotFound] = useState(false)
    const [pageLoad, setPageLoad] = useState(false)

    // Carregar pokemons da api
    async function loadPokemons(page = '') {
        // habilita carregamento e se caso nada for encontrado
        setLoad(false)
        setNotFound(false)
        // pega nomes dos pokemons
        let response = await getAll(page)
        setPagination({ next: response.next, previous: response.previous })
        let pokemons = []
        // pega dados mais especificos dos pokemons pelo nome e salva em um array
        for (let i = 0; i < response.results.length; i++) {
            pokemons.push(await getPokemon(response.results[i].name))
        }
        console.log(pokemons)
        // salva pokemons retornados e desabilita carregamento
        setData(pokemons)
        setLoad(true)
        setNotFound(false)
        setPageLoad(true)
    }

    // pesquisa pelo nome do pokemon
    async function loadSearchPokemon(search: string) {
        // habilita carregamento
        setLoad(false)
        // limpa paginação
        setPagination({ next: pagination?.next, previous: '' })
        // pesquisa pokemon
        let response = await searchPokemon(search)
        // se nada for encotrado, exibe mensagem de not found
        if (!response) {
            console.log(response)
            setData([])
            setNotFound(true)
        } else {
            setData([response])
            setNotFound(false)
        }
        // encerra carregamento
        setLoad(true)
    }

    // carrega 20 pokemons quando pagina for carregada
    useEffect(() => {
        loadPokemons()
        toast.success('🦄 Bem vindo!', {
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
    }, [])

    // mostrar todos os pokemons quando campo de pesquisa estiver vazio
    useEffect(() => {
        if (pesquisa == '') {
            loadPokemons()
        }
    }, [pesquisa])

    // passa para proxima pagina de pokemons
    function handleNext(): void {
        setData([])
        loadPokemons(pagination?.next)
        setPesquisa('')
    }

    // volta para pagina anterior de pokemons
    function handlePrevious(): void {
        setData([])
        loadPokemons(pagination?.previous)
        setPesquisa('')
    }

    function handleSubmit(e: any) {
        e.preventDefault()
        console.log(e.target[0].value)
        if (e.target[0].value) {
            loadSearchPokemon(e.target[0].value)
        } else {
            console.log('digita alguma coisa arrombado')
        }
    }

    return (
        <>
            {!pageLoad && <div className='absolute w-full h-screen z-10 bg-sky-500'>
                <div className="absolute top-20 left-[10%] font-pokemon text-end flex flex-col gap-8">
                    <p className='text-6xl sm:text-8xl'>Pokedex</p>
                    <span>made by Mayck Luciano</span>
                </div>
                <img className='absolute right-0 bottom-0' src={Gif} alt='Carregamento' />
            </div>
            }

            <Header />
            <ToastContainer />

            <motion.div
                className="progress-bar"
                style={{ scaleX: scrollYProgress }}
            />

            <main className='flex flex-col gap-8 m-8 p-4 rounded-xl bg-sky-700 '>
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        {/* Se preenchido, botão é exibido */}
                        {pagination?.next && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handleNext}>Next <FaArrowRight /></button>}
                        {pagination?.previous && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handlePrevious}><FaArrowLeft /> Previous</button>}
                    </div>

                    <form onSubmit={handleSubmit} className='relative rounded-xl outline outline-yellow-500 pl-10 transition-all'>
                        <MdCatchingPokemon className='text-yellow-500 absolute top-3 left-2 text-2xl' />
                        <input type='text' name='pesquisa' placeholder='Eevee' onChange={(e) => setPesquisa(e.target.value)} maxLength={20} className='bg-transparent w-20 h-full outline-none focus:w-48 transition-all' />
                    </form>
                </div>

                {/* Mostra imagem de carregamento, depois exibe pokemons ou imagem de não encontrada */}
                {!load ?
                    <div className='w-full py-20 flex flex-col justify-center items-center'>
                        <img className='w-40 animate-bounce' src={'/sleeping.png'} alt='loading' />
                        <p className='text-3xl font-bold'>Loading...</p>
                    </div>
                    :
                    !notFound ? <Pokemon data={data} /> :
                        <div className='w-full py-20 flex flex-col justify-center items-center'>
                            <img className='w-40' src={'/cubone.png'} alt='cranio de cubone' />
                            <p className='text-3xl'><span className='font-bold'>{pesquisa}</span> not found...</p>
                        </div>
                }

                <div className='flex gap-4 self-end'>
                    {/* Se preenchido, botão é exibido */}
                    {pagination?.next && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handleNext}>Next <FaArrowRight /></button>}
                    {pagination?.previous && <button className='p-2 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center' onClick={handlePrevious}><FaArrowLeft /> Previous</button>}
                </div>
            </main>

            <Footer />
        </>
    )
}