let selectedSearchType = "name";

function selectOption(index) {
  const options = document.querySelectorAll(".toggle__option");
  const slider = document.querySelector(".toggle__slider");
  const searchTypes = ["name","model","year"];

  selectedSearchType = searchTypes[index] || "name";

  slider.style.transform = `translateX(${index * 100}%)`;
  options.forEach((option) => option.classList.remove("toggle__active"));
  options[index].classList.add("toggle__active");

  console.log(`Search type changed to: ${selectedSearchType}`)
}

async function renderCars() {
  const searchButton = document.querySelector(".btn__search");
  const searchInput = document.querySelector(".search__input");
  const searchForm = document.getElementById("search__bar");
  const searchInfo = document.getElementById("search__info");
  const carList = document.querySelector(".car__list");
  const priceFilter = document.getElementById("price");

  if (!searchInput || !searchButton || !carList || !searchForm) {
    console.log("Required DOM elements not found.");
    return;
  }

  carList.style.display = "none";
  searchInfo.innerHTML = "";
  
  if (!searchForm.dataset.bound) {
    searchForm.dataset.bound = true;

    searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Search input value:", searchInput.value);
      await fetchAndFilterCars(searchInput, carList, searchInfo, priceFilter);
    });

    searchButton.addEventListener("click", async (event) => {
      event.preventDefault();
      console.log("Search input value:", searchInput.value);
      await fetchAndFilterCars(searchInput, carList, searchInfo, priceFilter);
    });

    priceFilter.addEventListener("change", async () => {
      await fetchAndFilterCars(searchInput, carList, searchInfo, priceFilter);
    });
  };
}

  async function fetchAndFilterCars(searchInput, carList, searchInfo, priceFilter) {
    try {
      let searchValue = searchInput.value.trim();
      
      if (!searchValue) {
        carList.innerHTML = `<p>Please enter car ${selectedSearchType} to search.</p>`;
        carList.style.display = "";
        return;
      };

      console.log("Selected Search Type Before Fetch:", selectedSearchType);
      console.log("Search Value Before Fetch:", searchValue);

      carList.style.removeProperty("display");
      searchInfo.innerHTML = searchInputHTML(searchValue);
      searchValue = searchValue.charAt(0).toUpperCase() + searchValue.slice(1);
      carList.innerHTML = "<p>Loading...</p>";
      
      const response = await fetch(
        `https://myfakeapi.com/api/cars/${selectedSearchType}/${searchValue}`);

        console.log(`https://myfakeapi.com/api/cars/${selectedSearchType}/${searchValue}`)

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        
        const carsData = await response.json();
        console.log("Fetched cars data:", carsData);
        
        if (carsData.Cars && Array.isArray(carsData.Cars) && carsData.Cars.length > 0) {
          const selectedPriceRange = priceFilter.value.trim();
          let minPrice = 0, maxPrice = Infinity;

          if (selectedPriceRange.includes("-")) {
            const priceRange = selectedPriceRange.split("-").map(Number);
            minPrice = Number(priceRange[0]) || 0;
            maxPrice = Number(priceRange[1]) || Infinity;
          }

          console.log(`Filtering between: $${minPrice} - $${maxPrice}`);

          const filteredCars = carsData.Cars.filter((car) => {
            let carPrice = car.price.match(/\d+/g, "");
            carPrice = carPrice ? parseInt(carPrice.join(""), 10) : 0;

            carPrice = Math.round(carPrice / 100);

            console.log(`Car: ${car.car_model}, Price: ${carPrice}`);

            return carPrice >= minPrice && carPrice <= maxPrice;
          });
          
          carList.innerHTML = filteredCars.length > 0 ? filteredCars.map((car) => carCardHTML(car)).join("")
          : "<p>No cars found in this price range</p>";
      } else {
        carList.innerHTML = "<p>No cars found.</p>";
      }
    } catch (error) {
      console.error("Error fetching car data:", error);
      carList.innerHTML = "<p>Error fetching car data: Data not available.</p>";
    }
  }

function carCardHTML(car) {
  return `<div class="car__card no-cursor">
            <div class="car__card--container">
              <figure class="car__img--container">
                <img
                  src="./Assets/image not available template.png"
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