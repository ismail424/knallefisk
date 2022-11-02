import { Component, createSignal } from "solid-js";

import { Motion } from "@motionone/solid";
import About from "./About";
import video from "/assets/video/havet.mp4";
import logo from "/assets/img/logo.svg";
import Pictures from "../Pictures";

const Home: Component = () => {
    const [fadeOut, setFadeOut] = createSignal(1);
    const [ scale, setScale ] = createSignal(1);
    
    const navigate_animation = ( url: string) => {
        setFadeOut(0.9);
        setScale(0.7);
        setTimeout(() => {
            location.replace(url);
        }
        , 200);
    };

    return (
        <>
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
                    <div id="banner_logo" >
                        <img id="logo_picture"  src={logo} > </img>      
                    </div>
                    <h6 id="content_text">Färska delikatesser från hav och sjö</h6>
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
            < About />
            < Pictures />
        </>
    );
}

export default Home;