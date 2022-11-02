import type { Component } from 'solid-js';

const Header: Component<{url: string}> = ({url}) => {

    const all_links = [
        {name: 'Hem', url: '/'},
        {name: 'Priser', url: '/priser'},
        {name: 'Hitta butik', url: '/hitta_butik'},
        {name: 'Kontakta oss', url: '/kontakta_oss'},
        {name: 'Beställ online', url: '/bestall_online'},

    ];
    let nav: any, mobile_meny: any;
    
    const hamburger_menu = () => {
        console.log(nav);
        nav.classList.toggle("nav_active");
        mobile_meny.classList.toggle('change');
    }

    return (
        <header class="header"  id="header_black">
            <div class="container">
                <nav class="main-nav">

                    {/* <!-- ***** Meny knapp (mobil) ***** --> */}
                    <div id="hidden_header"></div>
                    <div class="container2" id="mobile_meny" ref={mobile_meny} onClick={hamburger_menu}>
                        <div class="bar1"></div>
                        <div class="bar2"></div>
                        <div class="bar3"></div>
                    </div>


                    {/* <!-- ***** Meny ***** --> */}
                    <ul id="nav" class="nav" ref={nav}>
                        {all_links.map((link) => (
                            <li>
                                <a href={link.url} class={url === link.url ? 'active' : ''} >{link.name}</a>
                            </li>
                        ))}
                    </ul>

                    {/* <!-- ***** Logo ***** --> */}
                    <a href="/" class="logo" id="logo_name">Knallefisk</a>

                </nav>
            </div>
        </header>
    );
};

export default Header;