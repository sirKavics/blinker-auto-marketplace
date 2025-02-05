function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

const apiUrl = "https://myfakeapi.com/api/cars";

// function search(event) {
  //   event.preventDefault();
  //   event.target;
  // }

  
  async function renderCars() {
    const carSearchEl = document.querySelector(".search__input").value
    const carListEl = document.querySelector(".car__list");
    const response = await fetch(`https://myfakeapi.com/api/cars`)
    const carsData = await response.json();
    console.log(carsData)
    carListEl.innerHTML = carsData.cars.map((auto) => carHTML(auto)).join("");
  }
  
  renderCars();

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
                <p class="car__name light-blue">${auto.car_model_year} ${auto.car} <br> ${auto.car_model}</p>
                <div class="car-specs__container">
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gauge-high"></i>
                    </figure>
                    <p class="spec__info light-blue">${auto.milage ?? "N/A"} km</p>
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
                    <p class="spec__info light-blue">${auto.transmission ?? "N/A"}</p>
                  </div>
                </div>
                <p class="car__price light-blue">${auto.price ?? "Contact for price"}</p>
              </div>
            </div>
          </div>`
};

function searchInfoHTML(input) {
  return `<div class="search-info__container">
          <h1 class="search-info">
            Search results for
            <span class="bright-blue">"${input}"</span>
          </h1>
        </div>`
};