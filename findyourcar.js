function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

// PRICE FILTER
const minButton = document.querySelector(".min-slider__button");
const maxButton = document.querySelector(".max-slider__button");
const sliderTrack = document.querySelector(".slider__track");

let minValue = 0;
let maxValue = 100000;
let currentMin = minValue;
let currentmax = maxValue;

const updatePriceRange = () => {
  priceRangeText.innerHTML = `<span class="blue">Price range:</span><br />
              $${currentMin.toLocaleString()} to $${currentmax.toLocaleString()}`;
};

const setButtonPosition = (button, percent) => {
  button.style.left = `${percent}%`;
};

const handleDrag = (button, isMin) => {
  let startX = 0;

  const onMouseMove = (e) => {
    const sliderRect = sliderTrack.parentElement.getBoundingClientRect();
    const sliderWidth = sliderRect.width;
  }
}

// SEARCH AND RENDER CARS
let selectedSearchType = "name";

function selectOption(index) {
  const options = document.querySelectorAll(".toggle__option");
  const slider = document.querySelector(".toggle__slider");
  const searchTypes = ["name","model","year"];
  selectedSearchType = searchTypes[index] || "name";

  slider.style.transform = `translateX(${index * 100}%)`;
  options.forEach(option => option.classList.remove("toggle__active"));
  options[index].classList.add("toggle__active");

  console.log(`Search type changed to: ${selectedSearchType}`)
}

async function renderCars() {
  const searchButton = document.querySelector(".btn__search");
  const searchInput = document.querySelector(".search__input");
  const searchForm = document.getElementById("search__bar");
  const searchInfo = document.getElementById("search__info");
  const carList = document.querySelector(".car__list");

  if (!searchInput || !searchButton || !carList || !searchForm) {
    console.log("Required DOM elements not found.");
    return;
  }

  carList.style.display = "none";
  searchInfo.innerHTML = "";

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });

  searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      let searchValue = searchInput.value.trim();
      
      if (!searchValue) {
        carList.innerHTML = `<p>Please enter car ${selectedSearchType} to search.</p>`;
        carList.style.display = "";
        return;
      };

      carList.style.removeProperty("display");
      searchInfo.innerHTML = searchInputHTML(searchValue);

      searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
      carList.innerHTML = "<p>Loading...</p>";
      
      const response = await fetch(
        `https://myfakeapi.com/api/cars/${selectedSearchType}/${searchValue}`);
        
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        
        const carsData = await response.json();
        console.log("Fetched cars data:", carsData);
        
        if (
          carsData.Cars &&
          Array.isArray(carsData.Cars) &&
          carsData.Cars.length > 0
        ) {
        carList.innerHTML = carsData.Cars.map((car) => carCardHTML(car)).join("");
      } else {
        carList.innerHTML = "<p>No cars found.</p>";
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
      carList.innerHTML = "<p>Error fetching car data: Data not available.</p>";
    }
  });
}

function carCardHTML(car) {
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
                <p class="car__name light-blue">${car.car_model_year} ${car.car} <br> ${car.car_model}</p>
                <div class="car-specs__container">
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gauge-high"></i>
                    </figure>
                    <p class="spec__info light-blue">${
                      car.milage ?? "N/A"
                    } km</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-car-side"></i>
                    </figure>
                    <p class="spec__info light-blue">${car.car_color}</p>
                  </div>
                  <div class="car__spec">
                    <figure class="spec__img">
                      <i class="fa-solid fa-gears"></i>
                    </figure>
                    <p class="spec__info light-blue">${
                      car.transmission ?? "N/A"
                    }</p>
                  </div>
                </div>
                <p class="car__price light-blue">${
                  car.price ?? "Contact for price"
                }</p>
              </div>
            </div>
          </div>`;
}

function searchInputHTML(searchValue) {
  return `<h1 class="search-info">
            Search results for: <br>
            <span class="bright-blue">"${searchValue}"</span>
          </h1>
        </div>`;
}

renderCars();