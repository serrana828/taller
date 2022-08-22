const PRODUCTOS101_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";

    for(let product of array.products){ 
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name + "-" + product.currency + "" + product.cost +` </h4> 
                        <p> `+ product.description +`</p> 
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
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTOS101_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            htmlContentToAppend = resultObj.data;
            showProductsList(htmlContentToAppend);
        }
    });
});





