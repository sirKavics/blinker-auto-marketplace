// apiKey = ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20=
// apiAdress = https://auto.dev/api/listings?apikey=ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20=

async function main() {
    const cars = await fetch(`https://parseapi.back4app.com/classes/Car_Model_List?count=1&limit=10`)
    const carsData = await cars.json();
}

main();

console.log(fetch("https://auto.dev/api/listings?apikey=ZrQEPSkKZmFsZjU1NUBnbWFpbC5jb20="))