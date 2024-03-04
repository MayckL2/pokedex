import { motion } from "framer-motion";
import { PokemonType } from "../services/api";
import { Link } from "react-router-dom";

export function choseColor(type: string, name: string) {
  let x = type == 'type' ? true : false
  switch (name) {
    case 'shadow':
      return x ? 'bg-slate-900' : 'text-slate-900'
    case 'dark':
      return x ? 'bg-slate-800' : 'text-slate-800'
    case 'dragon':
      return x ? 'bg-purple-700' : 'text-purple-700'
    case 'ice':
      return x ? 'bg-cyan-400' : 'text-cyan-400'
    case 'electric':
      return x ? 'bg-yellow-500' : 'text-yellow-500'
    case 'steel':
      return x ? 'bg-stone-400' : 'text-stone-400'
    case 'ghost':
      return x ? 'bg-purple-600' : 'text-purple-600'
    case 'rock':
      return x ? 'bg-orange-800' : 'text-orange-800'
    case 'ground':
      return x ? 'bg-orange-600' : 'text-orange-600'
    case 'fighting':
      return x ? 'bg-red-800' : 'text-red-800'
    case 'fire':
      return x ? 'bg-red-500' : 'text-red-500'
    case 'grass':
      return x ? 'bg-green-500' : 'text-green-500'
    case 'bug':
      return x ? 'bg-lime-500' : 'text-lime-500'
    case 'water':
      return x ? 'bg-cyan-500' : 'text-cyan-500'
    case 'flying':
      return x ? 'bg-purple-400' : 'text-purple-400'
    case 'fairy':
      return x ? 'bg-pink-500' : 'text-pink-500'
    case 'gost':
      return x ? 'bg-purple-500' : 'bg-purple-500'
    case 'poison':
      return x ? 'bg-purple-500' : 'text-purple-500'
    case 'psychic':
      return x ? 'bg-purple-400' : 'text-purple-400'
    default:
      return x ? 'bg-slate-500' : 'text-slate-500'
  }
}

export function Pokemon(props: any) {
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


  return (
    <motion.ul
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {props.data.map((value: PokemonType, key: number) => (
        <Link to={`/pokemon/${value.id}`}>
          <motion.li key={key} className="cursor-pointer bg-sky-600 rounded-lg p-4 relative flex flex-col gap-2 capitalize" variants={item}>
            <img className="bg-pokeBox bg-no-repeat bg-cover w-full h-40 object-contain outline" src={value?.sprites?.front_default} alt={value.name} />
            <p className={`absolute bottom-5 left-6 font-bold ${choseColor('name', value?.types && value?.types[0].type.name)}`}>{value.name}</p>
            <div className={`absolute top-6 right-6 text-sm flex gap-1`}>
              {value.types.map((index: any, key: number) => {
                return <span key={key} className={`p-1 rounded font-bold ${choseColor('type', index.type.name)}`}>
                  {index.type.name}
                </span>
              })}
            </div>
          </motion.li>
        </Link>
      ))}
    </motion.ul>
  )
}
