let tbody = document.querySelector('tbody');
let currentPage = 0;
let currentSize = 10;

function loadData(){

http.get(`/api/mahsulot?page=${currentPage}&${currentSize}`, function (res) {
    let page = JSON.parse(res);
    tbody.innerHTML = "";
    let txt = "";
    console.log(page);
    if(page && typeof(page) == 'object'){
        page.content.forEach(m => {
            txt += `  <tr>
            <td scope="row">${m.id}</td>
            <td>${m.nom}</td>
            <td>${m.narx}</td>
        </tr>`;
        });
        tbody.innerHTML = txt;
        
    } else {
        console.log(page);
    }



}, function (error) {
    console.error(error);
});
}


function pageChange(target){
    if(target === 'next'){
        currentPage++;
        loadData();

    }
}


