import type { Component } from "solid-js";

import bild1 from "/assets/img/bild1.webp";
import bild2 from "/assets/img/bild2.webp";
import bild3 from "/assets/img/bild3.webp";
import bild4 from "/assets/img/bild4.jpg";
import bild5 from "/assets/img/bild5.webp";

import bild6 from "/assets/img/bild6.webp";
import bild7 from "/assets/img/bild7.webp";
import bild8 from "/assets/img/bild8.webp";

const Pictures: Component = () => {
    return (
        <section class="section" id="bilder_section">
            <div class="container">
                <div id="bilder_section_bilder">
                    <img src={bild1} loading="lazy" alt="En bild på en färsk lax sida!" width="24.5%" height="240"></img>
                    <img src={bild7} loading="lazy" alt="Räkmacka" width="24.5%" height="240"></img>
                    <img src={bild8} loading="lazy" alt="Laxmacka" width="24.5%" height="240"></img>
                    <img src={bild4} loading="lazy" alt="Bild på framsidan av vår butik" width="24.5%" height="240"></img>
                    <img src={bild5} loading="lazy" alt="Färska fiskfilér" width="24.5%" height="240"></img>
                    <img src={bild2} loading="lazy" alt="Färska fiskfilér" width="24.5%" height="240"></img>
                    <img src={bild6} loading="lazy" alt="Bild på räkor" width="24.5%" height="240"></img>
                    <img src={bild3} loading="lazy" alt="Bild på havskräftor" width="24.5%" height="240"></img>
                </div>
            </div>
        </section>
    );
}

export default Pictures;