import { Component,  createResource, createSignal  } from "solid-js";

const Prices: Component = () => {
    
    const baseUrl = import.meta.env.PUBLIC_URL;
    const [error, setError] = createSignal(null);

    const [Prices] = createResource(async () => {
        const response = await fetch(baseUrl + '/api/prices?populate=*');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }

        setError(response.statusText);
        throw new Error('Failed to fetch prices');
    });



    return (
        <div class="container" style="margin-top:40px;">
            <span>{Prices.loading && "Loading..."}</span>
            <span>{error() && "Error: " + error()}</span>
            <div class="all_cards">
                { Prices.loading ? null : Prices().data.map((price :any) => (
                    <div class="card">
                        <div class="card-picture">
                            <img src= {baseUrl + price.attributes.picture.data.attributes.formats.large.url} alt={price.attributes.picture.data.attributes.name} />
                        </div>
                        <div class="card-body">
                            <p class="card-body-name">{price.attributes.name}</p>
                            { price.attributes.discount ? 
                                <div class="card-body-discount">
                                    <p class="card-body-price-original ">{price.attributes.price} kr</p>
                                    <p class="card-body-discount-price">{price.attributes.discount_price} kr</p> 
                                </div>
                                : 
                                <p class="card-body-price">{price.attributes.price} kr</p>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Prices;