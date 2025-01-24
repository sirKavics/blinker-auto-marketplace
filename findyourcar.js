function openMenu() {
  document.body.classList += " menu--open";
};

function closeMenu() {
  document.body.classList.remove("menu--open");
};

// API url: https://auto.dev/api/listings?apikey=ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20=
// API authorization key: Authorization: Bearer ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20=

async function main() {
const response = await fetch("https://auto.dev/api/listings?apikey=ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20=", {
  headers: {
    "Authorization": "Bearer ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20="
  }
})
};

main();