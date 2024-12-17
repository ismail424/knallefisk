import { Component, createSignal } from "solid-js";
import { Motion } from "@motionone/solid";
import About from "./About";
import video from "/assets/video/havet.mp4";
import logo from "/assets/img/logo.svg";
import Pictures from "../Pictures";
import Prices from "components/Prices";

const Home: Component = () => {
    const [fadeOut, setFadeOut] = createSignal(1);
    const [scale, setScale] = createSignal(1);
    
    const navigate_animation = (url: string) => {
        setFadeOut(0.9);
        setScale(0.7);
        setTimeout(() => {
            location.replace(url);
        }, 200);
    };

    return (
        <>
        <style>
            {`
                .holiday-notice {
                    background: rgba(255, 255, 255, 0.92);
                    padding: 10px 15px;
                    border-radius: 6px;
                    max-width: 440px;
                    margin: 15px auto;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
                    border: 2px solid #e2b13c;
                }

                .notice-title {
                    color: #d4152c;
                    font-size: 18px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 4px;
                }

                .notice-main {
                    color: #2c5282;
                    font-size: 15px;
                    font-weight: 500;
                    margin-bottom: 3px;
                    line-height: 1.3;
                }

                .extra-hours {
                    color: #2c5282;
                    font-size: 12px;
                    font-weight: 500;
                    border-top: 1px solid rgba(226, 177, 60, 0.3);
                    padding-top: 4px;
                    margin-top: 4px;
                }

                .notice-details {
                    color: #4a5568;
                    font-size: 12px;
                    font-weight: 400;
                    line-height: 1.3;
                }

                @media (max-width: 770px) {
                    .holiday-notice {
                        max-width: 90%;
                        margin: 10px auto;
                    }
                    .notice-title {
                        font-size: 16px;
                    }
                    .notice-main {
                        font-size: 14px;
                    }
                }
            `}
        </style>

        <main class="main">
            <video autoplay muted loop id="bg-video">
                <source src={video} type="video/mp4" />
            </video>

            <div class="video_bakgrund">
                <div class="caption">
                    <Motion
                        animate={{ opacity: [0, 1], scale: [0.9, 1] }}
                        transition={{ duration: 0.7, easing: "ease-in-out" }}
                    >
                        <div id="banner_logo">
                            <img id="logo_picture" src={logo} />      
                        </div>
                        <h6 id="content_text">Färska delikatesser från hav och sjö</h6>
                        
                        <Motion
                            animate={{ opacity: [0, 1], y: [-10, 0] }}
                            transition={{ duration: 0.7, easing: "ease-out", delay: 0.3 }}
                        >
                            <div class="holiday-notice">
                                <div class="notice-title">Extraöppet! ⭐️</div>
                                <div class="notice-main">
                                    Nu har vi öppet ALLA DAGAR fram till nyår!
                                </div>
                                <div class="notice-details">
                                    Stängt endast 24/12, 25/12 och 26/12
                                </div>
                                <div class="extra-hours">
                                    Måndagar & Söndagar öppet extra:
                                    <br />
                                    Måndag: 10:00-18:00 • Söndag: 10:00-16:00
                                </div>
                            </div>
                        </Motion>

                        <br />
                        <div class="beställ">
                            <Motion
                                onClick={() => {
                                    navigate_animation("/bestall_online");
                                }}
                                animate={{ opacity: [1, fadeOut()], scale: [1, scale()] }}
                            >
                                <a href="/bestall_online">Beställ nu</a>
                            </Motion>
                        </div>
                    </Motion>   
                </div>
            </div>
        </main>
            <Prices />
            <About />
            <Pictures />
        </>
    );
}

export default Home;