import { Link } from 'react-router-dom'
import logoImg from '@/assets/logo.png'
// bg-neutral-900
export const Header = () => {
    return (
        <header className="fixed w-full h-12 inset-0 flex items-center z-50  before:block before:absolute before:inset-0 before:bg-neutral-900 before:opacity-95">
            <div className="container mx-auto px-4 flex items-center gap-8 relative z-10">
                <div className="text-green-500 text-xl font-medium">
                    <Link to="/" className="flex gap-1 items-center">
                        <img className="w-8 h-8" src={logoImg} alt="" />
                        <span className="hidden lg:inline-block">
                            Lass
                            <span className="text-sky-500"> Anime List</span>
                        </span>
                    </Link>
                    <img src="" alt="" />
                </div>
                <ul className="flex gap-8">
                    <li className="text-stone-200 text-lg hover:text-white duration-150">
                        <Link to="/anime">Anime</Link>
                    </li>
                    <li className="text-stone-200 text-lg hover:text-white duration-150">
                        <Link to="/manga">Manga</Link>
                    </li>
                </ul>
            </div>
        </header>
    )
}
