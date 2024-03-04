import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { getGitHub } from "../services/api";
import { FaTools } from "react-icons/fa";
import Social from "../components/social";

export default function About() {
    const [photo, setPhoto] = useState()

    async function loadPhoto() {
        let response = await getGitHub()
        console.log(response)
        setPhoto(response.avatar_url)
    }

    useEffect(() => {
        loadPhoto()
    }, [])

    return (<>
        <Header />

        <main className="min-h-screen">
            <div className="m-8 bg-sky-700 rounded-xl">
                <h1 className="font-pokemon text-3xl w-full rounded-t-xl border-t-2 border-x-2 p-8">About me</h1>

                <section className="border-2 p-8 rounded-b-xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center rounded-lg border-2 overflow-hidden mb-8">
                        <div className="col-span-1 rounded-lg overflow-hidden outline m-4 min-h-56 w-[90%] object-cover">
                            <img src={photo} alt="Foto desenvolvedor" className="" />
                        </div>

                        <div className="col-span-2 p-4 flex flex-col gap-2 h-full w-full border-t-2 md:border-t-0 md:border-l-2">
                            <p className="text-xl font-bold">Desenvolvi este site sobre o anime pokemon para demonstrar minhas habilidades como desenvolvedor front-end, juntamente, praticando das melhores praticas de desenvolvimento web.</p>

                            <div className="flex flex-col gap-2">
                                <label className="flex gap-1 items-center"><FaTools /> Tecnologias</label>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">React.js</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">Typescript</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">React router</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">Radix UI</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">Frame motion</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">React toastify</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">Tailwind</li>
                                    <li className="flex items-center justify-center p-1 font-bold rounded-lg bg-sky-500 text-center">React Tooltip</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Social/>
                </section>
            </div>
        </main>

        <Footer />
    </>)
}