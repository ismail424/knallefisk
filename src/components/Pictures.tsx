const Pictures = () => {
    const images = [
        { src: "/img/bild1.webp", alt: "En bild på en färsk lax sida!" },
        { src: "/img/bild7.webp", alt: "Räkmacka" },
        { src: "/img/bild8.webp", alt: "Laxmacka" },
        { src: "/img/bild4.jpg", alt: "Bild på framsidan av vår butik" },
        { src: "/img/bild5.webp", alt: "Färska fiskfilér" },
        { src: "/img/bild2.webp", alt: "Färska fiskfilér" },
        { src: "/img/bild6.webp", alt: "Bild på räkor" },
        { src: "/img/bild3.webp", alt: "Bild på havskräftor" }
    ];

    return (
        <section className="section" id="bilder_section">
            <div className="container">
                <div id="bilder_section_bilder">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.src}
                            loading="lazy"
                            alt={image.alt}
                            width="24.5%"
                            height="240"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pictures;