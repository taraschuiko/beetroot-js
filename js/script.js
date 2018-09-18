;(function() {
	"use strict";

	// Initializing counter variables and setting the page counters to 0
	var numberOfGoodsCount = 0;
	var numberOfGoods = document.getElementById("number_of_goods");
	numberOfGoods.innerHTML = numberOfGoodsCount;

	var sumOfGoodsCount = 0;
	var sumOfGoods = document.getElementById("sum_of_goods");
	sumOfGoods.innerHTML = sumOfGoodsCount;

	// Getting list of all products on a page
	var products = initProdArray();

	var filteredProducts = initProdArray();

	// Gets list of all currently visible elements on page
	function initProdArray() {
		var productsCurrent = [];
		var numberOfProductsOnPage = document.querySelector(".products-box").childElementCount;
		var elements = document.getElementsByClassName("product-box__item");
		var names = document.getElementsByClassName("product-box__title");
		var prices = document.getElementsByClassName("product-box__meta");
		for (var i = 0; i < numberOfProductsOnPage; i++) {
			var product = {
				element: undefined,
				name: "",
				category: 0,
				price: 0
			};
			product.category = elements.item(i).getAttribute("category");
			product.element = elements.item(i);
			product.name = names.item(i).innerHTML;
			product.price = parseInt(prices.item(i).firstElementChild.innerHTML);
			productsCurrent.push(product);
		}
		return productsCurrent;
	}

	//Updating goods count and sum on top of page when pressing add to cart button
	var buttons = document.getElementsByClassName("product-box__btn");
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function(event) {
			var targetBtn = event.target;
			var targetEl = targetBtn.parentNode.parentNode;
			var targetElPrice = 0;

			for (var i = 0; i < products.length; i++) {
				if (products[i].element == targetEl) {
					targetElPrice = products[i].price;
				}
			}

			// finding quantity input and getting its value
			var targetElQty = 0;
			for (var i = 0; i < targetEl.childNodes.length; i++) {
				if (targetEl.childNodes[i].className == "product-box__meta") {
					for (var j = 0; j < targetEl.childNodes[i].childNodes.length; j++) {
						if (targetEl.childNodes[i].childNodes[j].className == "qty") {
							for (var k = 0; k < targetEl.childNodes[i].childNodes[j].childNodes.length; k++) {
								if (targetEl.childNodes[i].childNodes[j].childNodes[k].className == "qty__item") {
									targetElQty = targetEl.childNodes[i].childNodes[j].childNodes[k].value;

								}
							}
						}
					}
				}
			}

			if (targetElQty > 0) {
				numberOfGoodsCount++;
				numberOfGoods.innerHTML = numberOfGoodsCount;

				sumOfGoodsCount += targetElPrice * targetElQty;
				sumOfGoods.innerHTML = sumOfGoodsCount;
			}
		});
	}

	// Category filtering
	document.getElementById("category_select").addEventListener("change", function(event) {
		var selectedCategory = event.target.value;
		var productsBox;
		if (selectedCategory == 0) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < products.length; i++) {
				productsBox.appendChild(products[i].element);
			}
		} else if (selectedCategory == 1) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < products.length; i++) {
				if (products[i].category == "breakfast") {
					productsBox.appendChild(products[i].element);
				}
			}
		} else if (selectedCategory == 2) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < products.length; i++) {
				if (products[i].category == "soup") {
					productsBox.appendChild(products[i].element);
				}
			}
		} else if (selectedCategory == 3) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < products.length; i++) {
				if (products[i].category == "garnish") {
					productsBox.appendChild(products[i].element);
				}
			}
		}
		filteredProducts = initProdArray();
		filterPrice();
	});

	// Price filtering
	document.getElementById("price_select").addEventListener("change", filterPrice);

	function filterPrice(event) {
		var selectedPrice = document.getElementById("price_select").value;
		var productsBox;
		if (selectedPrice == 0) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < filteredProducts.length; i++) {
				productsBox.appendChild(filteredProducts[i].element);
			}
		} else if (selectedPrice == 30) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < filteredProducts.length; i++) {
				if (filteredProducts[i].price < 30) {
					productsBox.appendChild(filteredProducts[i].element);
				}
			}
		} else if (selectedPrice == 50) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < filteredProducts.length; i++) {
				if (filteredProducts[i].price < 50) {
					productsBox.appendChild(filteredProducts[i].element);
				}
			}
		} else if (selectedPrice == 100) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < filteredProducts.length; i++) {
				if (filteredProducts[i].price < 100) {
					productsBox.appendChild(filteredProducts[i].element);
				}
			}
		} else if (selectedPrice == 150) {
			productsBox = document.getElementsByClassName("products-box")[0];
			while (productsBox.firstChild) {
				productsBox.removeChild(productsBox.firstChild);
			}
			for (var i = 0; i < filteredProducts.length; i++) {
				if (filteredProducts[i].price < 150) {
					productsBox.appendChild(filteredProducts[i].element);
				}
			}
		}
	}

	// Checkout
	document.getElementsByClassName("btn-check")[0].addEventListener("click", function() {
		document.getElementsByClassName("checkout-window")[0].classList.remove("checkout-hidden");
	});

	document.getElementsByClassName("fade")[0].addEventListener("click", function() {
		document.getElementsByClassName("checkout-window")[0].classList.add("checkout-hidden");
	});

	document.getElementById("checkout-btn").addEventListener("click", function() {
		var name = document.getElementById("checkout-name").value;
		var email = document.getElementById("checkout-email").value;
		if (name == "" || email == "") {
			alert("Заполните имя и email");
		} else {
			alert("Спасибо за покупку");
			numberOfGoodsCount = 0;
			sumOfGoodsCount = 0;
			numberOfGoods.innerHTML = numberOfGoodsCount;
			sumOfGoods.innerHTML = sumOfGoodsCount;
			document.getElementsByClassName("checkout-window")[0].classList.add("checkout-hidden");
			document.getElementById("checkout-name").value = "";
			document.getElementById("checkout-email").value = "";
		}
	});

})();