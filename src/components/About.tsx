const About = () => {
    return (
        <article id="mt-100">
            <div className="container">
                <div id="om_oss_grid">
                    <div className="bild_banner">
                        <img
                            src="/img/store_front.webp"
                            alt="Bild på framsidan av fisk affären"
                            width="100%"
                            height="500px"
                            id="imgimg"
                        />
                    </div>
                    <div className="Text">
                        <br />
                        <p id="besbes">
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
};

export default About;