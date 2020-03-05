const element = document.getElementById("databases");

const getCollections = () => {  
  const dbName = element.value;
  const url="/collections/"+dbName;  
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      nv.data(myJson);
      nv.addAllAttribs();
      console.log("MJS", myJson);
    });
};

element.addEventListener("change", getCollections);
