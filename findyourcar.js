function openMenu() {
  document.body.classList += " menu--open";
};

function closeMenu() {
  document.body.classList.remove("menu--open");
};

const apiUrl = 'https://api.smartcar.com/v2.0/vehicles/'

async function main() {
const cars = await fetch(apiUrl)
const carsData = await cars.json();
const carListEl = document.querySelector('.car__list')
console.log(fetch(carsData))
};

main();

function carHTML(car) {
  return `<div class="car__card cursor-pointer">
            <div class="car__card--container">
              <figure class="car__img--container">
                <img
                  src="${carImage}"
                  class="car__img--wrapper"
                  alt=""
                />
              </figure>
              <div class="car__info">
                <p class="car__name light-blue">${carYearAndMake}</p>
                <div class="car-specs__container">
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gauge-high"></i>
                    </figure>
                    <p class="spec__info light-blue">${carMilage} km</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-car-side"></i>
                    </figure>
                    <p class="spec__info light-blue">${carType}</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gears"></i>
                    </figure>
                    <p class="spec__info light-blue">${transmission}</p>
                  </div>
                </div>
                <p class="car__price light-blue">$${price}</p>
              </div>
            </div>
          </div>`
}