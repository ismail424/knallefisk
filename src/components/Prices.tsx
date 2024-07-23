import { Component, createResource, createSignal } from "solid-js";

interface Price {
  id: number;
  title: string;
  price: number;
  sale_price: number | null;
  on_sale: boolean;
  image: string;
  is_visible: boolean;
}

const Prices: Component = () => {
  const baseUrl = import.meta.env.PUBLIC_URL;
  const [error, setError] = createSignal("");

  const [prices] = createResource<Price[]>(async () => {
    try {
      const response = await fetch(baseUrl + '/api/products');
      if (response.ok) {
        const data = await response.json();
        return data.filter((price: Price) => price.is_visible);
      }
    } catch (e) {
      setError("Failed to fetch prices");
    }
  });

  return (
    <section class="prices-section">
      <h2 class="prices-title">Våra priser</h2>
      {error() && <p class="error-message">{error()}</p>}
      {prices.loading && <p class="loading-message">Laddar...</p>}
      <div class="prices-grid">
        {prices()?.map((price) => (
          <div class="price-card">
            {price.on_sale && <div class="sale-label">Rea</div>}
            <img src={baseUrl + "/static/uploads/" + price.image} alt={price.title} class="price-image" />
            <div class="price-info">
              <h3 class="price-title">{price.title}</h3>
              {price.on_sale ? (
                <div class="price-sale">
                  <span class="price-original">{price.price} kr</span>
                  <span class="price-discount">{price.sale_price} kr</span>
                </div>
              ) : (
                <span class="price-regular">{price.price} kr</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {prices()?.length === 0 && <p class="no-prices-message">Inga priser tillgängliga för tillfället.</p>}
    </section>
  );
};

export default Prices;