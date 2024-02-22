import logo from '../assets/imgs/disneylogo.png'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
export function SideBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [toggleMenu, setToggleMenu] = useState(false)
    const activeClass = toggleMenu ? '' : 'hide';

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 768) {
                setToggleMenu(false)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <aside className="side-bar z-10 left-px justify-center z-50" >
            <Link to={'/'}>
                <div className='logo'>
                    <img src="https://img.hotstar.com/image/upload/v1656431462/web-images/logo-d-plus-horizontal.svg" alt="" />
                </div>
            </Link>
            <span onClick={() => setToggleMenu(!toggleMenu)} class="material-symbols-outlined menu">
                menu
            </span>
            <div className={`navs-con ${activeClass}`}>
                <section className="navs flex flex-col text-slate-300" >
                    <section className='w-full'>
                        <Link to={`${user ? '/watchlist' : '/login'}`}>

                            <span class="material-symbols-outlined">
                                account_circle
                            </span>
                            <span className='hide'>
                                My space
                            </span>
                        </Link>
                    </section >
                    <section className='w-full'>
                        <Link to={'/search'}>
                            <span class="material-symbols-outlined">
                                search
                            </span>
                            <span className='hide'>
                                Search
                            </span>
                        </Link>
                    </section>
                    <section className='w-full'>
                        <Link to={'/'}>
                            <span class="material-symbols-outlined">
                                home
                            </span>
                            <span className='hide'>
                                Home
                            </span>
                        </Link>
                    </section>
                    <section className='w-full'>
                        <Link to={'/series'}>
                            <span class="material-symbols-outlined">
                                tv_gen
                            </span>
                            <span className='hide'>
                                Series
                            </span>
                        </Link>
                    </section>
                    <section className='w-full'>
                        <Link to={'/'}>
                            <span class="material-symbols-outlined">
                                tv
                            </span>
                            <span className='hide'>
                                Movies
                            </span>
                        </Link>
                    </section>
                </section>
            </div>
        </aside>
    )
}