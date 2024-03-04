import { FaHome } from "react-icons/fa"
import { Link, useParams } from "react-router-dom"
import { PokemonType, getPokemon } from "../services/api"
import { useEffect, useState } from "react"
import { choseColor } from "../components/pokemon"
import { MdCatchingPokemon } from "react-icons/md"
import { motion } from "framer-motion";
import { BsStars } from "react-icons/bs"
import { GiBodyHeight, GiWeight } from "react-icons/gi"
import Header from "../components/header"

export default function PokemonInfo() {
    const { id } = useParams()
    const [data, setData] = useState<PokemonType>()
    const [shiny, setShiny] = useState(false)
    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };
    const item = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    // Pega dados do pokemon pelo id
    async function loadPokemon(id: string) {
        let response = await getPokemon(id)
        console.log(response)
        setData(response)
    }

    // Chama função para pegar dados pelo id
    useEffect(() => {
        loadPokemon(String(id))
    }, [])

    return (<>
        <Header/>
        <main className='flex flex-col m-8 p-4 rounded-xl bg-sky-700 '>
            <button onClick={()=> window.history.back()} className='w-fit p-2 mb-4 rounded-lg bg-sky-600 hover:bg-yellow-500 font-bold text-lg transition-all flex gap-2 items-center'><FaHome /> Home</button>

            {data && <>
                <section className="border-t-4 border-x-4 rounded-t-xl p-4">
                    <div className='flex justify-between flex-wrap items-end'>
                        <div className="flex gap-2">
                            <h2 className="text-6xl capitalize font-bold">{data.name}</h2>
                            <div className="flex items-center">
                                <MdCatchingPokemon />
                                <span className="text-xs">No</span>
                                <p className="text-lg font-bold mx-1">{id}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end w-full md:w-fit mt-4 md:mt-0">
                            {data.types.map((value: any, key: number) => {
                                return <span key={key} className={`px-2 py-1 text-xl capitalize rounded font-bold ${choseColor('type', value.type.name)}`}>{value.type.name}</span>
                            })}
                        </div>
                    </div>
                </section>

                <section className="border-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="flex justify-center rounded-xl w-full h-60 justify-self-center outline">
                        <img src={shiny ? data.sprites.front_shiny : data.sprites.front_default} alt={data.name} />
                    </div>
                    <div className="flex justify-center rounded-xl w-full h-60 justify-self-center outline relative">
                        <BsStars onClick={() => setShiny(prev => !prev)} className="absolute top-2 right-2 text-4xl cursor-pointer hover:text-yellow-500 transition-all" />
                        <img src={shiny ? data.sprites.back_shiny : data.sprites.back_default} alt={data.name} />
                    </div>
                </section>

                <section className="border-x-4 border-b-4 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="outline rounded-xl p-4">
                        <p className="font-bold capitalize flex gap-1 items-center">height <GiBodyHeight className="text-xl"/></p>
                        <span className="text-3xl font-bold">{data.height / 10}m</span>
                    </div>
                    <div className="outline rounded-xl p-4">
                        <p className="font-bold capitalize flex gap-1 items-center">weight <GiWeight className="text-xl"/></p>
                        <span className="text-3xl font-bold">{data.weight / 10}kg</span>
                    </div>
                </section>

                <motion.section
                    className="border-x-4 border-b-4 rounded-b-xl grid grid-cols-1 md:grid-cols-2 gap-4 p-4"
                    variants={container}
                    initial="hidden"
                    animate="visible"
                >
                    {data.stats.map((stat: any, key: number) => (
                        <motion.div key={key} className="bg-sky-600 rounded-lg p-4 relative flex flex-col capitalize" variants={item}>
                            {stat.stat.name == 'hp' ?
                                <>
                                    <p className="font-bold">{stat.stat.name}</p>
                                    <span className="text-3xl font-bold">{stat.base_stat}/{stat.base_stat}</span>
                                </>
                                :
                                <>
                                    <p className="font-bold">{stat.stat.name}</p>
                                    <p className="text-3xl font-bold">{stat.base_stat}<span className=" text-base">pt</span></p>
                                </>
                            }
                        </motion.div>
                    ))}
                </motion.section>
            </>}
        </main>
    </>)

}