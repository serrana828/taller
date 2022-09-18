const ORDER_BY_PROD_COST = "Price.";
const ORDER_ASC_BY_COST = "asc.";
const ORDER_DESC_BY_COST = "des.";
let catID = localStorage.getItem("catID");
const PRODUCTS_JSON = PRODUCTS_URL + catID + ".json";
let currentProductsArray = [];
let minPrice = undefined;
let maxPrice = undefined;
let currentSortCriteria = undefined;


function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_PROD_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
        }
    else if (criteria === ORDER_ASC_BY_COST)
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setProductID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductsList() {
    let htmlContentToAppend = "";
        for (let i = 0; i < currentProductsArray.products.length; i++) {
        let product = currentProductsArray.products[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {
            htmlContentToAppend += `
            <div onclick="setProductID(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4><b>`+ product.name + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + product.currency + "&nbsp;-&nbsp;" + product.cost + `</b> </h4> 
                        <br>
                        <p> `+ product.description + `</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` artículos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
            document.getElementById("product").innerHTML = htmlContentToAppend;
        }
    }
}
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_JSON).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            
            document.getElementById("catName").innerHTML = currentProductsArray.catName;

            showProductsList(currentProductsArray);
        }
    });
user ()
    document.getElementById("sortByPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductsList();
    });


    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductsList();
    });
});