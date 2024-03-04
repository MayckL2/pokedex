import { BsPersonVcardFill } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Tooltip } from "react-tooltip";


export default function Social() {
    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <p className="font-bold text-center">Veja mais projeto no meu github, linkedin ou portifolio</p>

            <ul className="flex gap-6 items-center flex-wrap">
                <li>
                    <a href="https://github.com/MayckL2" target="_blank" data-tooltip-id="my-tooltip" data-tooltip-content="GitHub!">
                        <FaGithub className="text-3xl hover:text-sky-900 transition-all" />
                    </a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/mayck-luciano-993403171" target="_blank" data-tooltip-id="my-tooltip" data-tooltip-content="Linkedin">
                        <FaLinkedin className="text-3xl hover:text-sky-900 transition-all" />
                    </a>
                </li>
                <li>
                    <a href="https://portifolio-4-0.vercel.app/" target="_blank" data-tooltip-id="my-tooltip" data-tooltip-content="Portifolio">
                        <BsPersonVcardFill className="text-3xl hover:text-sky-900 transition-all" />
                    </a>
                </li>
            </ul>
            <Tooltip id="my-tooltip" />
        </div>
    )
}