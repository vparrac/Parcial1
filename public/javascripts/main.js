window.onload = () => {
  mensaje.hidden = true;
  document.getElementById("cardRegistro").hidden = true;
};
nv = navio(d3.select("#navio"), 600);
const element = document.getElementById("databases");
const mensaje = document.getElementById("msg");
const collections = document.getElementById("collections");
const createCard = document.getElementById("botonCrearRegistro");
const tabla = document.getElementById("laTabla");
let structure = [];
const getCollections = () => {
  mensaje.hidden = false;
  document.getElementById("cardRegistro").hidden = false;
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
      genera_tabla();
    });
};

function genera_tabla() {
  tabla.innerHTML = "";
  createCard.innerHTML = "";
  mensaje.innerHTML = "";
  const tblBody = document.createElement("tbody");
  const thead = document.createElement("thead");
  tabla.appendChild(thead);
  tabla.appendChild(tblBody);
  const url = "/data/" + element.value + "/" + collections.value;
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      nv = navio(d3.select("#navio"), 600);
      nv.data(myJson);
      nv.addAllAttribs();
      structure = [];
      if (myJson.length > 0) {
        createCard.innerHTML = "";
        mensaje.innerHTML = "";
        f = myJson[0];
        const hileraCabecera = document.createElement("tr");
        for (a in f) {
          // Parte del create
          if (!(a == "_id")) {
            structure.push(a);
            const group = document.createElement("form-group");
            const label = document.createElement("label");
            label.for = a;
            label.innerHTML = a;

            const input = document.createElement("input");
            input.id = "FC" + a;
            input.className = "form-control";
            input.name = a;
            group.appendChild(label);
            group.appendChild(input);
            createCard.appendChild(group);
          }

          const tittle = document.createElement("th");
          tittle.appendChild(document.createTextNode(a));
          hileraCabecera.appendChild(tittle);
        }

        const submit = document.createElement("button");
        submit.className = "btn btn-light";
        submit.type = "submit";
        submit.innerHTML = "Crear";
        createCard.appendChild(document.createElement("br"));
        createCard.appendChild(submit);

        //formCreate= document.getElementById("createForm");

        //form.appendChild(document.createElement("br"));
        //form.appendChild(submit);

        thead.appendChild(hileraCabecera);

        myJson.forEach(f => {
          const hileraCuerpo = document.createElement("tr");
          for (a in f) {
            const tittle = document.createElement("td");
            tittle.appendChild(document.createTextNode(f[a]));
            hileraCuerpo.appendChild(tittle);
          }
          tblBody.appendChild(hileraCuerpo);
        });
      } else {
        document.getElementById("cardRegistro").hidden = true;
        tabla.innerHTML = "";
        createCard.innerHTML = "";
        mensaje.innerHTML = "";
        const classCard = document.createElement("div");
        classCard.className = "card bg-danger text-white";
        const bodyCard = document.createElement("div");
        bodyCard.className = "card-body";
        const msg = document.createElement("p");
        msg.className = "card-text";
        msg.appendChild(
          document.createTextNode("No hay registros para la tabla buscada")
        );
        bodyCard.appendChild(msg);
        classCard.appendChild(bodyCard);
        mensaje.appendChild(classCard);
      }
    });
}

const createPostJson = () => {
  const a = {};
  structure.forEach(element => {
    a[element] = document.getElementById("FC" + element).value;
  });

  return a;
};
const guardarRegistro = evt => {
  console.log("en guardaar");
  const data = createPostJson();
  const url = "/post/" + element.value + "/" + collections.value;
  fetch(url, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify(data)
  }).then(() => {
    const url = "/data/" + element.value + "/" + collections.value;
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log("en algun lado");
        createCard.innerHTML = "";
        
        structure = [];

        createCard.innerHTML = "";
        
        tabla.innerHTML = innerHTML = "";
        f = myJson[0];
        const hileraCabecera = document.createElement("tr");

        const tblBody = document.createElement("tbody");
        const thead = document.createElement("thead");
        tabla.appendChild(thead);
        tabla.appendChild(tblBody);
        for (a in f) {
          // Parte del create
          if (!(a == "_id")) {
            structure.push(a);
            const group = document.createElement("form-group");
            const label = document.createElement("label");
            label.for = a;
            label.innerHTML = a;

            const input = document.createElement("input");
            input.id = "FC" + a;
            input.className = "form-control";
            input.name = a;
            group.appendChild(label);
            group.appendChild(input);
            createCard.appendChild(group);
          }

          const tittle = document.createElement("th");
          tittle.appendChild(document.createTextNode(a));
          hileraCabecera.appendChild(tittle);
        }

        const submit = document.createElement("button");
        submit.className = "btn btn-light";
        submit.type = "submit";
        submit.innerHTML = "Crear";
        createCard.appendChild(document.createElement("br"));
        createCard.appendChild(submit);

        
        //formCreate= document.getElementById("createForm");

        //form.appendChild(document.createElement("br"));
        //form.appendChild(submit);

        //const tittle = document.createElement("th");
        //tittle.appendChild(document.createTextNode("Acciones"));
        //hileraCabecera.appendChild(tittle);
        //hileraCabecera.appendChild(tittle);
        thead.appendChild(hileraCabecera);

        myJson.forEach(f => {
          const hileraCuerpo = document.createElement("tr");
          for (a in f) {
            const tittle = document.createElement("td");
            tittle.appendChild(document.createTextNode(f[a]));
            hileraCuerpo.appendChild(tittle);
          }
          tblBody.appendChild(hileraCuerpo);
        });
      });
  });
  evt.preventDefault();
};

element.addEventListener("change", getCollections);
collections.addEventListener("change", genera_tabla);
createCard.addEventListener("submit", guardarRegistro);
