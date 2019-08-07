import { apiUrl } from '../helpers';

export const productService = {
  dashboardDetails,
  subcategories,
  productsForCategory,
  productsForSubcategory,
  productDetail
};

function dashboardDetails() {
  const url = apiUrl + '/api/Product/ProductFamily';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
  	.then(response => response.json())
  	.then(json => {
      var result = {
        categories: [],
        bestSelling: [],
        topSelling: []
      };
      result.categories = json.category ? json.category : [];
      result.bestSelling = json.TopBestSellingList ? json.TopBestSellingList : [];
      result.topSelling = json.TopDemandingList ? json.TopDemandingList : [];
  	  return result;
  	});
}

function subcategories(categoryId) {
  let catId = categoryId ? categoryId : "";
  const url = apiUrl + '/api/Product/Categories?id=' + catId;

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
  	.then(response => response.json())
  	.then(subcategories => {
  	  return subcategories;
  	});
}

function productsForCategory(categoryId) {
  let catId = categoryId ? categoryId : "";
  const url = apiUrl + '/api/product/GetAdvancedCategoryList?PageNo=1&PageSize=100&CategoryID=' + catId + '&SortColumn=&SortOrder=';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
  	.then(response => response.json())
  	.then(products => {
  	  return products;
  	});
}

function productsForSubcategory(subcategoryId) {
  let catId = subcategoryId ? subcategoryId : "";
  const url = apiUrl + '/api/product/GetAdvancedSubCategoryList?PageNo=1&PageSize=100&SubCategoryID=' + catId + '&SortColumn=&SortOrder=';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
  	.then(response => response.json())
  	.then(products => {
  	  return products;
  	});
}

function productDetail(productId) {
  let prodId = productId ? productId : "";
  const url = apiUrl + '/api/Product/GetProductDetails?ProductID=' + prodId;

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Authorization': authorization
  };
  const requestOptions = {
    method: 'GET',
    headers: headers
  };

  return fetch(url, requestOptions)
    .then(response => response.json())
    .then(productDetail => {
      return productDetail;
    });
}