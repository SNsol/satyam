import { apiUrl } from '../helpers';

export const cartService = {
  cartProducts,
  addCart,
  updateCart,
  removeCart
};

function cartProducts() {
  const url = apiUrl + '/api/Orders/Get';

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
      let cartProducts = products.map(product => {
        return {
          id: product.ProductCode,
          quantity: product.QuantityOrdered,
          price: product.PriceEach,
          originalPrice: product.BuyPrice,
          name: product.ProductName,
          thumb: product.Thumb
        };
      });
  	  return cartProducts;
  	});
}

function addCart(product) {
  const url = apiUrl + '/api/Orders/AddtoCart';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': authorization
  };
  let body = {
    'CustomerNumber': user.customerId,
    'ProductCode': product.ProductCode,
    'QuantityOrdered': 1
  };

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
      	return response.json()
      }

      let error = new Error('Failed to Add Cart');
	    return Promise.reject(error);
  	}).then(result => {
      let addedProduct = {
        id: product.ProductCode,
        quantity: 1,
        price: product.Sales_rate,
        originalPrice: product.BuyPrice,
        name: product.ProductName,
        thumb: product.Thumb
      };
  	  return addedProduct;
  	});
}

function updateCart(product, productCount) {
  const url = apiUrl + '/api/Orders/AddtoCart';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': authorization
  };
  let body = {
    'CustomerNumber': user.customerId,
    'ProductCode': product.ProductCode,
    'QuantityOrdered': productCount
  };

  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      let error = new Error('Failed to Add Cart');
      return Promise.reject(error);
    }).then(result => {
      let updatedProduct = {
        id: product.ProductCode,
        quantity: productCount,
        price: product.Sales_rate,
        originalPrice: product.BuyPrice,
        name: product.ProductName,
        thumb: product.Thumb
      };
      return updatedProduct;
    });
}

function removeCart(productId) {
  const url = apiUrl + '/api/Orders/Delete';

  let user = JSON.parse(localStorage.getItem("user"));
  let authorization = "Bearer " + user.token;
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': authorization
  };
  let body = {
    'CustomerNumber': user.customerId,
    'ProductCode': productId
  };
  const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions)
  	.then(response => {
      if (response.ok) {
      	return response.json()
      }
      let error = new Error('Failed to Add Cart');
      return Promise.reject(error);
  	}).then(result => {
  	  return productId;
  	});
}