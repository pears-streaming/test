const produit = window.location.search.split("?").join("");
console.log(produit);

let produitData = [];
let meubleQuantiteTotal = [];

const fetchProduit = async () => {
  await fetch(`http://localhost:3000/api/furniture/${produit}`)
    .then((res) => res.json())
    .then((promise) => {
      produitData = promise;
      console.log(produitData);
    });
};

const produitDisplay = async () => {
  await fetchProduit();

  document.getElementById("blocCard").innerHTML = `
  <div id="card${
    produitData._id
  } " class="flex-column-around card-size-produit card">
<h3 class="titre-card titre-card-size">${produitData.name.toUpperCase()}</h3>
<img class="image-size" src="${produitData.imageUrl}" alt="image de meuble ${
    produitData.name
  } " />
  <div class="bouton-chene">CHÊNE</div>
  <p class="description-meuble"> ${produitData.description}</p>
  <div>
  <p class="flex-centre"> ${produitData.price
    .toString()
    .replace(/0+$/, "")} Euro</p>

  <div class="flex-around div-list-deroulante">
  <label for="vernis">Choisir vernis</label>
  <select name="vernis" id="vernis">
  </select>
  </div>
  </div>
    <button id="${
      produitData._id
    }" class="bouton-details bouton-acheter">Acheter</button>
  </div>
  `;

  let select = document.getElementById("vernis");
  console.log(select);

  console.log(produitData.varnish);

  produitData.varnish.forEach((vernis) => {
    console.log(vernis);
    let tagOption = document.createElement("option");

    tagOption.innerHTML = `${vernis} `;
    tagOption.value = `${vernis} `;

    select.appendChild(tagOption);
    console.log(tagOption);
  });
  addBasket(produitData);
};

produitDisplay();

const addBasket = () => {
  let bouton = document.getElementById(produitData._id);
  console.log(bouton);
  bouton.addEventListener("click", () => {
    let produitTableau = JSON.parse(localStorage.getItem("produit"));
    let select = document.getElementById("vernis");
    console.log(select.value);
    console.log(produitTableau);

    const fusionProduitTeinte = Object.assign({}, produitData, {
      teinte: `${select.value}`,
      quantite: 1,
    });

    console.log(fusionProduitTeinte);

    if (produitTableau == null) {
      produitTableau = [];
      meubleQuantiteTotal = [];
      produitTableau.push(fusionProduitTeinte);
      console.log(produitTableau);
      localStorage.setItem("produit", JSON.stringify(produitTableau));

      produitTableau = JSON.parse(localStorage.getItem("produit"));
      spanQuantite.textContent = addQuantity(produitTableau);
    } else if (produitTableau != null) {
      meubleQuantiteTotal = [];

      for (i = 0; i < produitTableau.length; i++) {
        console.log("test");
        if (
          produitTableau[i]._id == produitData._id &&
          produitTableau[i].teinte == select.value
        ) {
          return (
            produitTableau[i].quantite++,
            console.log("quantite++"),
            localStorage.setItem("produit", JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("produit"))),
            (spanQuantite.textContent = addQuantity(produitTableau))
          );
        }
      }
      for (i = 0; i < produitTableau.length; i++) {
        if (
          (produitTableau[i]._id == produitData._id &&
            produitTableau[i].teinte != select.value) ||
          produitTableau[i]._id != produitData._id
        ) {
          return (
            console.log("nouveau"),
            produitTableau.push(fusionProduitTeinte),
            localStorage.setItem("produit", JSON.stringify(produitTableau)),
            (produitTableau = JSON.parse(localStorage.getItem("produit"))),
            (spanQuantite.textContent = addQuantity(produitTableau))
          );
        }
      }
    }
  });
  return (
    (produitTableau = JSON.parse(localStorage.getItem("produit"))),
    (spanQuantite.textContent = addQuantity(produitTableau))
  );
};

/////////////////////////////////////// afficher quantite panier ////////////////////////////

const addQuantity = (produitTableau) => {
  if (produitTableau) {
    produitTableau.forEach((meuble) => {
      meubleQuantiteTotal.push(meuble.quantite);
    });
    spanQuantite.classList.remove("display-none");
    spanQuantite.classList.add("flex-centre");

    return (spanQuantite.textContent = `${eval(
      meubleQuantiteTotal.join("+"),
    )} `);
  } else {
    spanQuantite.classList.remove("flex-centre");
    spanQuantite.classList.add("display-none");
  }
};
