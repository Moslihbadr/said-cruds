let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let temp;

// get total function
function getTotal() {
    if (price.value && taxes.value) {
        let ertt = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = ertt;
        total.style.backgroundColor = "#12b012";
    } else {
        total.innerHTML = '';
        total.style.backgroundColor = "#a00d02";
    }
}

// getting product information from local storage
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = []
}


submit.addEventListener =  () => {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
        count: count.value,

    }
    if (title.value && price.value && category.value && newPro.count < 100) {
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[temp] = newPro;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        } clearData()
    }
    // updating product information in local storage
    localStorage.setItem('product', JSON.stringify(dataPro))
    // displaying the updated product list
    sowData()
}

//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    category.value = '';
    count.value = '';
}

// read
function sowData() {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += ` 
            <tr>  
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()" >deleteAll  (${dataPro.length})</button>`;
    } else {
        btnDelete.innerHTML = '';
    }
}
sowData()

// delete 
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    sowData()
}

// delete all data 
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    sowData()
}
function update(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal()
    count.style.display = 'none';
    submit.innerHTML = "update";
    mood = 'update'
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

//search
let searchMood = 'category';

function getsearchMood(id) {
    let search = document.getElementById('Search');
    if (id == 'Searchcategory') {
        searchMood = 'category';
    
    } else if (id == 'Searchtitle'){
        searchMood = 'title'
    }

    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = '';
    searchData()

}

// search function
function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {


        if (searchMood == 'category') {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += ` 
            <tr>  
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `;
            }


        } else {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += ` 
            <tr>  
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button id"update" onclick="update(${i})">update<button></td>
                        <td><button id"delete" onclick="deleteData(${i})">delete<button></td>   
                    </tr> `;
            }



        }
    }
    document.getElementById('tbody').innerHTML = table;
}



