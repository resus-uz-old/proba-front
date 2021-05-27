let tbody = document.querySelector('tbody');


http.get("/api/mahsulot", function (res) {
    let mahsulotlar = JSON.parse(res);
    tbody.innerHTML = "";
    let txt = "";
    console.log(mahsulotlar);
    if(mahsulotlar && typeof(mahsulotlar) == 'object'){
        mahsulotlar.forEach(m => {
            txt += `  <tr>
            <td scope="row">${m.id}</td>
            <td>${m.nom}</td>
            <td>${m.narx}</td>
        </tr>`;
        });
        tbody.innerHTML = txt;
        
    } else {
        console.log(mahsulotlar);
    }



}, function (error) {
    console.error(error);
});






