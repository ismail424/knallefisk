import type { Component } from "solid-js";

import store_front from "/assets/img/store_front.webp";
const About: Component = () => {
    return (
        <article  id="mt-100">
            <div class="container">
                <div id="om_oss_grid">
                    <div class="bild_banner">
                        <img src={store_front} alt="Bild på framsidan av fisk affären" width="100%" height="500px" id="imgimg"  />
                    </div>
                    <div class="Text">
                        <br />
                        <p id="besbes" >
                            Knallefisk startades år 2006 av en trevlig fiskhandlare som såg fram
                            emot att starta ett eget företag. Med 15 år av erfarenhet inom fiskbranchen
                            erbjuder han och hans anställda alltid den bästa kvaliteten till det lägsta
                            priset. Här hittar du allt från färsk fisk till färdiga delikatesser, som hämtas direkt
                            från GÖTBORGS FISKAUKTION.
                        </p>
                    </div>
                </div>
            </div>
        </article>

    );
}

export default About;