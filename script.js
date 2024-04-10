const fetchLibrary = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (response.status === 403) {
          throw new Error("Forbidden");
        }
        if (response.status === 404) {
          throw new Error("Not Found");
        }
        if (response.status === 500) {
          throw new Error("Server Error");
        }
        throw new Error("Generic Fetch Error");
      }
    })

    .then((books) => {
      const booksContainer = document.getElementById("booksRow");
      books.forEach((book) => {
        const col = document.createElement("div");
        col.classList.add("col-md-4", "col-lg-3", "col-xl-2", "mb-4");

        const card = document.createElement("div");
        card.classList.add("card");

        const img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = book.img;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const title = document.createElement("h5");
        title.classList.add("card-title");
        title.textContent = book.title;

        const asin = document.createElement("p");
        asin.classList.add("card-text");
        asin.textContent = "Asin: " + book.asin;

        const category = document.createElement("p");
        category.classList.add("card-text");
        category.textContent = "Category: " + book.category;

        const price = document.createElement("p");
        price.classList.add("card-text");
        price.textContent = "Prezzo: " + book.price + "$";

        const discardBtn = document.createElement("button");
        discardBtn.classList.add("btn", "btn-danger");
        discardBtn.textContent = "Discard";
        discardBtn.addEventListener("click", () => {
          card.remove();
        });
        cardBody.appendChild(title);
        cardBody.appendChild(asin);
        cardBody.appendChild(category);
        cardBody.appendChild(price);
        cardBody.appendChild(discardBtn);

        card.appendChild(img);
        card.appendChild(cardBody);

        col.appendChild(card);

        booksContainer.appendChild(col);
      });
    });
};

window.onload = () => {
  fetchLibrary();
};
