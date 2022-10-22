let meubleData = [];

const fetchMeuble = async () => {
  await fetch("http://localhost:3000/api/furniture")
    .then((res) => res.json())
    .then((promise) => {
      meubleData = promise;
      console.log(meubleData);
    });
};

const meubleDisplay = async () => {
  await fetchMeuble();

  document.getElementById(
    "banniere",
  ).innerHTML = `<div><img class="image-banniere" src="${meubleData[3].imageUrl}" alt="image banniere du site"/>
  </div>
  `;
  document.getElementById("blocCard").innerHTML = meubleData
    .map(
      (meuble) => `
  <div id="card${meuble._id}" class="flex-column-around card-size card">
  <h3 class="titre-card">${meuble.name.toUpperCase()}</h3>
  <img class="image-size" src="${meuble.imageUrl}" alt="image de meuble ${
        meuble.name
      }"/>
    <div class="bouton-chene">CHÊNE</div>
    <p class="description-meuble">${meuble.description}</p>
    <button id="${meuble._id}" class="bouton-details">Voir</button>
    <p>${meuble.price.toString().replace(/0+$/, "")} Euro</p>

  
  </div>
  `,
    )
    .join("");

  let boutons = document.querySelectorAll(".bouton-details");
  console.log(boutons);

  boutons.forEach((bouton) =>
    bouton.addEventListener("click", () => {
      console.log(bouton);

      window.location = `produit.html?${bouton.id} `;
    }),
  );
};

meubleDisplay();

/////////////////////////////////////// afficher quantite panier ////////////////////////////

let produitLocal = JSON.parse(localStorage.getItem("produit"));

let meubleQuantiteTotal = [];
console.log(produitLocal);

if (produitLocal) {
  produitLocal.forEach((meuble) => {
    meubleQuantiteTotal.push(meuble.quantite);
  });
  spanQuantite.classList.remove("display-none");
  spanQuantite.classList.add("flex-centre");

  spanQuantite.textContent = `${eval(meubleQuantiteTotal.join("+"))} `;
} else {
  spanQuantite.classList.remove("flex-centre");
  spanQuantite.classList.add("display-none");
}
