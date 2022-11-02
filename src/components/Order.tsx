import type { Component  } from "solid-js";
import emailjs from '@emailjs/browser';

const Order: Component = () => {
    let form: any;
    const sendEmail = (e: any) => {
        e.preventDefault();

        const YOUR_SERVICE_ID = import.meta.env.PUBLIC_SERVICE_ID as string;
        const YOUR_TEMPLATE_ID = import.meta.env.PUBLIC_TEMPLATE_ID as string;
        const YOUR_PUBLIC_KEY = import.meta.env.PUBLIC_PUBLIC_KEY as string;
        
        const tempParams = {
            from_name : form["name"].value,
            from_number :form["number"].value,
            message: form["message"].value,
            from_date : form["date"].value.toString(),
        };

        emailjs.send(YOUR_SERVICE_ID,YOUR_TEMPLATE_ID, tempParams, YOUR_PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

            alert("Tack för din beställning!");
            form.reset();
    };

    return (
        <div id="mt-100">
            <div class="container">
                <div id="form">
                    <div class="fisk" id="fisk"></div>
                    <div class="fisk" id="fisk2"></div>
                        <form id="bestall_online_form" ref={form} onSubmit={(e) => sendEmail(e)} >
                            
                            <div class="formgroup" id="name-form">
                                <label for="name">Namn och efternamn*</label>
                                <input type="text" id="name" name="from_name" />
                            </div>
                            
                            <div class="formgroup" id="date-form">
                                <label for="date">Datum <span id="spanspan" >(När vill du hämta din beställning)</span>*</label>
                                <input type="date" id="date" name="from_date" />
                            </div>     

                            <div class="formgroup" id="number-form">
                                <label for="number">Telefonnummer*</label>
                                <input type="number" id="number" name="from_number" />
                            </div>
                            
                            <div class="formgroup" id="message-form">
                                <label for="message">Beställning / beskrivning*</label>
                                <textarea id="message" name="message"></textarea>
                            </div>

                            <input type="submit" value="Beställ" />
                        </form>
                    </div>
                <br /><br />
            </div>
        </div>

    );
}

export default Order;