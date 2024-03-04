import Social from "./social";


export default function Footer(){
    return(<footer className="p-8 flex justify-between items-center bg-sky-700">
        <h1 className="font-pokemon text-xl">Thanks for visiting</h1>

        <Social/>
    </footer>)
}