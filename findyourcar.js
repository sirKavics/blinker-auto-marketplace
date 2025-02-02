function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const apiUrl = "https://myfakeapi.com/api/cars";

async function main() {
  const response = await fetch(apiUrl);
  const carsData = await response.json();
  const carListEl = document.querySelector(".car__list");
  console.log(carsData);
  carListEl.innerHTML = carsData.cars.map((auto) => carHTML(auto)).join("");
}

main();

function carHTML(auto) {
  return `<div class="car__card cursor-pointer">
            <div class="car__card--container">
              <figure class="car__img--container">
                <img
                  src="./Assets/acura__test.jpg"
                  class="car__img--wrapper"
                  alt=""
                />
              </figure>
              <div class="car__info">
                <p class="car__name light-blue">${auto.car_model_year} ${auto.car} ${auto.car_model}</p>
                <div class="car-specs__container">
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gauge-high"></i>
                    </figure>
                    <p class="spec__info light-blue">${auto.milage} km</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-car-side"></i>
                    </figure>
                    <p class="spec__info light-blue">${auto.car_color}</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gears"></i>
                    </figure>
                    <p class="spec__info light-blue">${auto.transmission}</p>
                  </div>
                </div>
                <p class="car__price light-blue">${auto.price}</p>
              </div>
            </div>
          </div>`
};

function searchInfoHTML(info) {
  return `<div class="search-info__container">
          <h1 class="search-info">
            Search results for
            <span class="bright-blue">"${info.search}"</span>
          </h1>
        </div>`
}