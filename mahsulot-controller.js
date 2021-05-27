let tbody = document.querySelector('tbody');
let mahsulotSoni = document.querySelector('#mahsulot-soni');
let sahifaSoni = document.querySelector('#sahifa-soni');
let joriySahifa = document.querySelector('#joriy-sahifa');
let nextBtn = document.getElementById("next");
let backBtn = document.getElementById('back');
let currentPage = 0;
let currentSize = 10;
let totalElements = 0;
let totalPages = 0;




function loadData() {

    http.get(`/api/mahsulot?page=${currentPage}&${currentSize}`, function (res) {
        let page = JSON.parse(res);
        tbody.innerHTML = "";
        let txt = "";
        console.log(page);

        if (page && typeof (page) == 'object') {
            pageSetting(page);

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


function pageSetting(page) {
    totalElements = page.totalElements;
    totalPages = page.totalPages;
    mahsulotSoni.innerHTML = totalPages;
    sahifaSoni.innerHTML = page.totalPages;
    joriySahifa.innerHTML = page.number + 1;
    let list = document.querySelector("#pagination-list");

    for (let i = 1; i < list.length-1; i++) {
        list.children.remove(list.children[i]);
    }

    for (let i = 1; i <= totalPages; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        li.innerHTML = `<a class="page-link" onclick='pageChange(${i})' >${i}</a>`;
     

        list.insertBefore(li, nextBtn);
    }


}



function pageChange(target) {

    if (target === 'next') {
        currentPage++;
    } else if (target === 'back') {
        currentPage--;
    } else {
        if(typeof(target)=='number' && 1<= target && target <= totalPages){
            currentPage = target - 1;
        }
    }

    if (currentPage == totalPages - 1) {
        nextBtn.classList.add("disabled");
    } else if (currentPage == 0) {
        backBtn.classList.add("disabled");
    } else {
        nextBtn.classList.remove('disabled');
        backBtn.classList.remove('disabled');
    }




    loadData();
}


