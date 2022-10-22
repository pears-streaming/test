// regex email /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
let someProduct = [];

let reponseServeur = [];

let sommeProduits;

let commandeProducts = JSON.parse(localStorage.getItem("commandes"));

let addProduit = JSON.parse(localStorage.getItem("produit"));

const panierDisplay = async () => {
  console.log("salut");
  if (addProduit) {
    await addProduit;
    console.log(addProduit);

    // formulaireContact.classList.add("display-none");

    // continueCommande.addEventListener("click", () => {
    //   formulaireContact.classList.remove("display-none");
    // });

    blocTitrePanier.classList.add("flex-column-start");
    blocTitrePanier.classList.remove("flex-start");
    blocTitrePanier.innerHTML = `<h2 id="titre-panier">PANIER</h2><span class="trait-design-panier"></span>
    `;

    injectJs.innerHTML = addProduit
      .map(
        (produit) => `
    <div id="basketProduit" class="flex-around">
    <div id="blocImage">
      <img src="${produit.imageUrl} " alt="image meuble ${produit.name} " />
    </div>
    <div id="blocProduit" class="flex-column-around">
      <h2>${produit.name} </h2>
      <p>${produit.teinte} </p>
      <p>${produit.price.toString().replace(/00/, "")} E</p>
      <p>Ref:<br/>${produit._id} </p>
      <p><i class="fas fa-truck"></i> en stock</p>
    </div>
    <div id="bloc-change-produit" class="flex-around">
      <div class="flex-centre">
        <button class="bouton-moins" data-id="${produit._id}" data-teinte="${
          produit.teinte
        }">-</button>
        <span class="produit-quantite">${produit.quantite} </span>
        <button class="bouton-plus" data-id="${produit._id}" data-teinte="${
          produit.teinte
        }">+</button>
      </div>
      <div><p class="prix-total-quantite">
      ${
        produit.quantite * produit.price.toString().replace(/00/, "")
      } E</p></div>
      <div><i class="bouton-corbeille fas fa-trash-alt gris"  data-id="${
        produit._id
      }" data-teinte="${produit.teinte}"></i></div>
    </div>
  </div>
    `,
      )
      .join("");
    calculProduit();

    removeProduct();

    plusQuantite();

    minQuantite();

    return;
  } else {
    formulaireContact.classList.add("display-none");
    continueCommande.addEventListener("click", () => {
      location.href = "panier.html";
      alert("Ajoutez des produits au panier pour continuer");
    });
    spanQuantite.classList.remove("flex-centre");
    spanQuantite.classList.add("display-none");
  }
};

panierDisplay();

const removeProduct = async (panierDisplay) => {
  await panierDisplay;
  console.log("je suis la fonction removeProduct");
  let corbeilles = document.querySelectorAll(".bouton-corbeille");
  console.log(corbeilles);

  corbeilles.forEach((corbeille) => {
    corbeille.addEventListener("click", () => {
      console.log(corbeille);

      let totalAddProduitRemove = addProduit.length;

      console.log(totalAddProduitRemove);

      if (totalAddProduitRemove == 1) {
        return (
          localStorage.removeItem("produit"),
          console.log("remove tout le panier"),
          (location.href = "panier.html")
        );
      } else {
        someProduct = addProduit.filter((el) => {
          if (
            corbeille.dataset.id != el._id ||
            corbeille.dataset.teinte != el.teinte
          ) {
            return true;
          }
        });
        console.log(someProduct);
        localStorage.setItem("produit", JSON.stringify(someProduct));
        calculProduit();
        console.log("corbeille remove le produit en question");
        location.href = "panier.html";
      }
    });
  });
  return;
};

const plusQuantite = async (panierDisplay) => {
  await panierDisplay;
  console.log("fonction plus");
  let plus = document.querySelectorAll(".bouton-plus");
  console.log(plus);
  plus.forEach((positive) => {
    positive.addEventListener("click", () => {
      console.log(positive);

      for (i = 0; i < addProduit.length; i++) {
        if (
          addProduit[i]._id == positive.dataset.id &&
          addProduit[i].teinte == positive.dataset.teinte
        ) {
          return (
            addProduit[i].quantite++,
            localStorage.setItem("produit", JSON.stringify(addProduit)),
            (document.querySelectorAll(".produit-quantite")[i].textContent =
              addProduit[i].quantite),
            (document.querySelectorAll(".prix-total-quantite")[
              i
            ].textContent = `
              ${
                addProduit[i].quantite *
                addProduit[i].price.toString().replace(/00/, "")
              } E`),
            calculProduit(),
            console.log("quantite++")
          );
        }
      }
    });
  });
};

const minQuantite = async (panierDisplay) => {
  await panierDisplay;
  let moins = document.querySelectorAll(".bouton-moins");
  console.log(moins);
  moins.forEach((negative) => {
    negative.addEventListener("click", () => {
      console.log(negative);

      let totalAddProduit = addProduit.length;

      for (i = 0; i < totalAddProduit; i++) {
        console.log(totalAddProduit);
        if (addProduit[i].quantite == 1 && totalAddProduit == 1) {
          return (
            localStorage.removeItem("produit"),
            (location.href = "panier.html"),
            console.log("remove tout le panier")
          );
        }
        if (
          addProduit[i].quantite == 1 &&
          totalAddProduit != 1 &&
          addProduit[i]._id == negative.dataset.id &&
          addProduit[i].teinte == negative.dataset.teinte
        ) {
          addProduit.splice(i, 1);
          localStorage.setItem("produit", JSON.stringify(addProduit));
          location.href = "panier.html";
          console.log("remove le produit en question");
        }
        if (
          (addProduit[i].quantite != 1 &&
            totalAddProduit != 1 &&
            addProduit[i]._id == negative.dataset.id &&
            addProduit[i].teinte == negative.dataset.teinte) ||
          (addProduit[i].quantite != 1 &&
            totalAddProduit == 1 &&
            addProduit[i]._id == negative.dataset.id &&
            addProduit[i].teinte == negative.dataset.teinte)
        ) {
          return (
            addProduit[i].quantite--,
            localStorage.setItem(
              "produit",
              JSON.stringify(addProduit),
              (document.querySelectorAll(".produit-quantite")[i].textContent =
                addProduit[i].quantite),
              (document.querySelectorAll(".prix-total-quantite")[
                i
              ].textContent = `
            ${
              addProduit[i].quantite *
              addProduit[i].price.toString().replace(/00/, "")
            } E`),
              calculProduit(),
              console.log("quantite--"),
            )
          );
        }
      }
    });
  });
};

const calculProduit = async (
  panierDisplay,
  minQuantite,
  plusQuantite,
  removeProduct,
) => {
  await panierDisplay;
  await minQuantite;
  await plusQuantite;
  await removeProduct;

  console.log("je calcule les produits");

  let produitPrice = [];
  let quantiteTotalProduit = [];

  let newTableau = JSON.parse(localStorage.getItem("produit"));
  console.log(newTableau);

  let afficheQuantite = document.querySelectorAll(".produit-quantite");
  console.log(afficheQuantite);

  newTableau.forEach((product) => {
    produitPrice.push(
      product.price.toString().replace(/00/, "") * product.quantite,
    );
    quantiteTotalProduit.push(product.quantite);
  });
  console.log(produitPrice);
  console.log(quantiteTotalProduit);

  nbArticle.textContent = `${eval(quantiteTotalProduit.join("+"))} articles `;

  spanQuantite.classList.remove("display-none");
  spanQuantite.classList.add("flex-centre");
  spanQuantite.textContent = `${eval(quantiteTotalProduit.join("+"))} `;

  console.log(produitPrice.toString());

  sommeProduits = eval(produitPrice.toString().replace(/,/g, "+"));
  console.log(sommeProduits);

  prixArticle.textContent = sommeProduits + " E";
  prixTtc.textContent = sommeProduits + " E";
};
