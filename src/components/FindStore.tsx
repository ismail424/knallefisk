import { Component  } from "solid-js";

const FindStore: Component = () => {
    return (
        <section>
            <div class="container">
                <div class="oppettider">

                    <article class="boras">
                        <h2 id="boras_title">Borås</h2>
                        <table class="oppettider_table">
                            <tbody>
                                <tr >
                                    <td>Måndag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr >
                                    <td>Tisdag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >18:00</td>
                                </tr>
                                <tr  >
                                    <td>Onsdag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >18:00</td>
                                </tr>
                                <tr  >
                                    <td>Torsdag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >18:00</td>
                                </tr>
                                <tr >
                                    <td>Fredag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >19:00</td>
                                </tr>
                                <tr >
                                    <td>Lördag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >15:00</td>
                                </tr>
                                <tr  >
                                    <td>Söndag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1065.0512317216635!2d12.933504154929423!3d57.73170229381581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465aa7204c244b79%3A0x1d516f3454bd77dd!2sKnalle%20Fisk!5e0!3m2!1ssv!2sse!4v1616927781991!5m2!1ssv!2sse" width="100%" height="450" id="iframe"  allowfullscreen></iframe>
                        <p>(Utanför Willys)</p>

                    </article>
                    <hr id="line_mobile" />
                    
                    <article class="skene">
                        <h2 id="skene_title">Skene</h2>
                        <table class="oppettider_table">
                            <tbody>
                                <tr>
                                    <td>Måndag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Tisdag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>Onsdag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr  >
                                    <td>Torsdag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >18:00</td>
                                </tr>
                                <tr >
                                    <td>Fredag</td>
                                    <td >10:00</td>
                                    <td>-</td>
                                    <td >19:00</td>
                                </tr>
                                <tr >
                                    <td>Lördag</td>
                                    <td>10:00</td>
                                    <td>-</td>
                                    <td>15:00</td>
                                </tr>
                                <tr >
                                    <td>Söndag</td>
                                    <td class="red">Stängt</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d536.1354135958156!2d12.647960488173517!3d57.48614171965853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x96f6138a27b74bc5!2zNTfCsDI5JzEwLjEiTiAxMsKwMzgnNTQuNiJF!5e0!3m2!1ssv!2sse!4v1667306940644!5m2!1ssv!2sse" width="100%" height="450" allowfullscreen ></iframe>
                        <p>(Utanför Willys)</p>
                    </article>


                </div>

            </div>
            <br />
        </section>
    );
}

export default FindStore;