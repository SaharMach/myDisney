import logo from '../assets/imgs/disneylogo.png'

export function SideBar() {
    return (
        <aside className="side-bar h-full z-10 left-px flex flex-col justify-center z-50" >
            <div className='logo'>

                <img src="https://img.hotstar.com/image/upload/v1656431462/web-images/logo-d-plus-horizontal.svg" alt="" />
            </div>
            <div className='navs-con'>

                <section className="navs flex flex-col gap-10 items-center justify-center text-slate-300" >
                    <section className='w-full'>
                        <span class="material-symbols-outlined">
                            account_circle
                        </span>
                        <span className='hide'>
                            My space
                        </span>
                    </section >
                    <section className='w-full'>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                        <span className='hide'>
                            Search
                        </span>
                    </section>
                    <section className='w-full'>
                        <span class="material-symbols-outlined">
                            home
                        </span>
                        <span className='hide'>
                            Home
                        </span>
                    </section>
                    <section className='w-full'>
                        <span class="material-symbols-outlined">
                            tv_gen
                        </span>
                        <span className='hide'>
                            Series
                        </span>
                    </section>
                    <section className='w-full'>
                        <span class="material-symbols-outlined">
                            tv
                        </span>
                        <span className='hide'>
                            Movies
                        </span>
                    </section>
                </section>
            </div>
        </aside>
    )
}