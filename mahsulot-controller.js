let tbody = document.querySelector('tbody');
let mahsulotSoni = document.querySelector('#mahsulot-soni');
let sahifaSoni = document.querySelector('#sahifa-soni');
let nextBtn = document.getElementById("next");
let backBtn = document.getElementById('back');
let currentPage = 0;
let currentSize = 10;
let totalElements = 0;
let totalPages = 0;
let sort = "id";
let sortDirection = 'ASC';




function loadData() {

    http.get(`/api/mahsulot?page=${currentPage}&size=${currentSize}&sort=${sort},${sortDirection}`, function (res) {
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
    mahsulotSoni.innerHTML = totalElements;
    sahifaSoni.innerHTML = page.totalPages;
    let list = document.querySelector("#pagination-list");

    // List elementlarini tozalash kerak
    var lis = document.querySelectorAll('#pagination-list li');
    console.log(lis)
    for (var i = 1; i < lis.length - 1; i++) {
        let li = lis[i]
        li.parentNode.removeChild(li);
    }
 let k = 3;
    let start = currentPage - k;
    if (start < 1) {
        start = 1;
        k += k - currentPage;
    }
    let end = currentPage + k;
    if (end > totalPages) end = totalPages;




    for (let i = start; i <= end; i++) {
        let li = document.createElement('li');
        li.classList.add('page-item');
        if (i == currentPage + 1)
            li.classList.add('active');

        li.innerHTML = `<a class="page-link"  onclick='pageChange(${i})' >${i}</a>`;


        list.insertBefore(li, nextBtn);
    }


}

function sizeChange(size) {
    currentSize = size;
    console.log(currentSize);
    if (currentSize * (currentPage + 1) > totalElements) {
        pageChange(currentPage);
    } else
        loadData();
}


function pageChange(target) {

    if (target === 'next') {
        currentPage++;
    } else if (target === 'back') {
        currentPage--;
    } else {
        if (typeof (target) == 'number' && 1 <= target && target <= totalPages) {
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


let currentSortElement = document.querySelector('th');

function sorting(element, target){
    if (currentSortElement == element){
        sortDirection = sortDirection == 'ASC'? 'DESC' : 'ASC';
    } else {
        sortDirection = 'ASC';
    }
    currentSortElement.style.borderBottom = '';

    let i = currentSortElement.querySelector('i');
    i.classList.remove('fa-sort-desc');
          i.classList.remove('fa-sort-asc');
    currentSortElement = element;
    currentSortElement.style.borderBottom = 'solid 1px white';
    if(sortDirection == 'ASC'){
        let i = currentSortElement.querySelector('i');
  i.classList.remove('fa-sort-desc');
        i.classList.add('fa-sort-asc');
      
    } else {
        i.classList.remove('fa-sort-asc');
        i.classList.add('fa-sort-desc');
    }

    sort = target;
    loadData();
}