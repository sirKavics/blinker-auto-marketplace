function openMenu() {
  document.body.classList += " menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
}

let selectedSearchType = "name";

function selectOption(index) {
  const options = document.querySelectorAll(".toggle__option");
  const slider = document.querySelector(".toggle__slider");
  const searchTypes = ["name", "model", "year"];

  selectedSearchType = searchTypes[index] || "name";

  slider.style.transform = `translateX(${index * 100}%)`;
  options.forEach((option) => option.classList.remove("toggle__active"));
  options[index].classList.add("toggle__active");

  console.log(`Search type changed to: ${selectedSearchType}`);
}

function initHomeSearch() {
  const searchForm = document.getElementById("search__bar");
  const searchInput = document.querySelector(".search__input");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const searchValue = searchInput.value.trim();

      if (searchValue) {
        const url = `findyourcar.html?search=${encodeURIComponent(
          searchValue
        )}&type=${encodeURIComponent(selectedSearchType)}`;
        window.location.href = url;
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleOptions = document.querySelectorAll(".toggle__option");
  if (toggleOptions.length > 0) {
    selectOption(0);
  }

  initHomeSearch();
});
