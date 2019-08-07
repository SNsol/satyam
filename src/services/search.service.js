import { apiUrl } from '../helpers';

export const searchService = {
  searchSuggestions,
  searchProducts
};

function searchSuggestions(key) {
  let query = key ? key : "";
  const url = apiUrl + '/api/product/GetproductName?ProductName=' + key;

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
  	.then(suggestions => {
  	  return suggestions;
  	});
}

function searchProducts(key) {
  let query = key ? key : "";
  const url = apiUrl + '/api/product/GetproductName?ProductName=' + key;

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