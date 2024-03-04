import { Link, useLocation } from "react-router-dom";
import * as Tabs from '@radix-ui/react-tabs';
import { useEffect, useState } from "react";

export default function Header() {
    const [tab, setTab] = useState('home')
    let location = useLocation();

    useEffect(()=>{
        let pathName = location.pathname.replace('/', '')
        setTab(pathName ? pathName : 'home')
    },[])

    return (<header className="w-full flex flex-col sm:flex-row justify-between px-8 py-4">
        <h1 className="font-pokemon text-3xl text-center">Pokedex</h1>

        <div className="flex items-end justify-center mt-4 sm:mt-0">
            <Tabs.Root defaultValue="home" onValueChange={(e) => setTab(e)}>
                <Tabs.List>
                    <Tabs.Trigger value="home" className={`${tab == 'home' ? 'border-yellow-500 text-yellow-500' : 'border-transparent'} border-b-2 transition-all p-2 font-bold text-lg`}>
                        <Link to={'/'}>Home</Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="habitats" className={`${tab == 'habitats' ? 'border-yellow-500 text-yellow-500' : 'border-transparent'} border-b-2 transition-all p-2 font-bold text-lg`}>
                        <Link to={'/habitats/1'}>Habitats</Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="types" className={`${tab == 'types' ? 'border-yellow-500 text-yellow-500' : 'border-transparent'} border-b-2 transition-all p-2 font-bold text-lg`}>
                        <Link to={'/types/1'}>Types</Link>
                    </Tabs.Trigger>
                    <Tabs.Trigger value="about" className={`${tab == 'about' ? 'border-yellow-500 text-yellow-500' : 'border-transparent'} border-b-2 transition-all p-2 font-bold text-lg`}>
                        <Link to={'/about'}>About</Link>
                    </Tabs.Trigger>
                </Tabs.List>
            </Tabs.Root>
        </div>

    </header>)
}