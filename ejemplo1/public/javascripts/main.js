const element = document.getElementById("databases");

const collections = document.getElementById("collections");

const getCollections = () => {
  const dbName = element.value;
  const url = "/collections/" + dbName;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      collections.innerHTML = "";

      myJson.forEach(g => {
        const opt = document.createElement("option");
        opt.appendChild(document.createTextNode(g.name));
        opt.value = g.name;
        collections.appendChild(opt);
      });
    });
};

element.addEventListener("change", getCollections);
