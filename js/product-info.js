let productID = localStorage.getItem("productID");
const PRODUCT_INFO_JSON = PRODUCT_INFO_URL + productID + ".json";
const PRODUCT_INFO_COMMENTS_JSON = PRODUCT_INFO_COMMENTS_URL + productID + ".json";
let currentProductInfoArray = []
let currentProductCommentsArray = []

console.log(productID);
function showProductImages (){
     
    let htmlContentToAppendImages = `

    <div id="carouselExampleIndicators" class="carousel" data-bs-ride="true">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="` + currentProductInfoArray.images[0] + `" class="d-block w-100" alt="product images">
      </div>
      <div class="carousel-item">
        <img src="` + currentProductInfoArray.images[1] + `" class="d-block w-100" alt="product images">
      </div>
      <div class="carousel-item">
        <img src="` + currentProductInfoArray.images[2] + `" class="d-block w-100" alt="product images">
      </div><div class="carousel-item">
      <img src="` + currentProductInfoArray.images[3] + `" class="d-block w-100" alt="product images">
    </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
        
            `
            document.getElementById("productImages").innerHTML = htmlContentToAppendImages;
}



function showProductInfo(){
    let productCurrencyCost = currentProductInfoArray.currency + " " + currentProductInfoArray.cost
    document.getElementById("productCurrencyCost").innerHTML = productCurrencyCost;
    document.getElementById("productDescription").innerHTML = currentProductInfoArray.description;
   document.getElementById("productCategory").innerHTML = currentProductInfoArray.category;
   document.getElementById("productSouldCount").innerHTML = currentProductInfoArray.soldCount;
   
}

function stars(score){
    let stars='';
    for(let i = 1; i <= 5; i ++) {
        if (i<=score){
          stars += '<img src="/img/estrellita.png" width=20>'; 
        }else{
          stars+='<img src="/img/estrellaza.png" width=20>';
        }
       }
       return stars;
               
    };
function showProductComments(){
    let htmlContentToAppendComments = "";
    for (let i = 0; i < currentProductCommentsArray.length; i++) {
        htmlContentToAppendComments += `
        <div>
        <h3><b>Comentarios</h3></b><br>
        <b>` +currentProductCommentsArray[i].user +` </b> ` + " - " + currentProductCommentsArray[i].dateTime + " - " +stars(currentProductCommentsArray[i].score) + `   <br> 
        ` +currentProductCommentsArray[i].description +`
        </div><br>
        <div>
        
        `
        document.getElementById("comments").innerHTML = htmlContentToAppendComments
    }
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_JSON).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            document.getElementById("productName").innerHTML = currentProductInfoArray.name;
            
            showProductImages(currentProductInfoArray);
            showProductInfo(currentProductInfoArray);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_JSON).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductCommentsArray = resultObj.data;
            showProductComments(currentProductCommentsArray);
        }
    })
user ()
})