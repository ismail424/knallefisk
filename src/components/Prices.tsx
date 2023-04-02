import { Component,  createResource, createSignal  } from "solid-js";

const Prices: Component = () => {
    
    const baseUrl = import.meta.env.PUBLIC_URL;
    const [error, setError] = createSignal("");

    const [Prices] = createResource(async () => {
        try{
            const response = await fetch(baseUrl + '/api/products');
            if (response.ok) {
                const data = await response.json();
                return data;
            }
        }
        catch (e) {
            setError("Failed to fetch prices");
        }
    });

    return (
        <div class="container" style="margin-top:40px;">
            <span>{Prices.loading && "Loading..."}</span>
            <span>{error() && "Error: " + error()}</span>
            <div class="all_cards">
                { Prices.loading ? null : Prices().map((price :any) => (
                    <div class="card">
                        <div class="card-picture">
                            <img src= {baseUrl + "/static/uploads/"+ price.image} alt={price.image} />
                        </div>
                        <div class="card-body">
                            <p class="card-body-name">{price.title}</p>
                            { price.on_sale ? 
                                <div class="card-body-discount">
                                    <p class="card-body-price-original ">{price.price} kr</p>
                                    <p class="card-body-discount-price">{price.sale_price} kr</p> 
                                </div>
                                : 
                                <p class="card-body-price">{price.price} kr</p>
                            }
                        </div>
                    </div>
                ))}
                { Prices.loading ? null : Prices().length === 0 ? <>Det finns inga priser att visa</> : null }
            </div>
        </div>
    );
}

export default Prices;