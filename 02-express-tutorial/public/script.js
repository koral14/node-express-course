document.addEventListener('DOMContentLoaded', function() {
    var fetchButton = document.getElementById('fetchButton');

    fetchButton.addEventListener('click', function() {
        fetch('/api/v1/products')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error: ' + response.status);
                }
            })
            .then(function(data) {
                console.log(data);
                // Process the received data and add it to the productData div
                const productDataDiv = document.getElementById('productData');
                productDataDiv.innerHTML = ''; // Clear any existing data

                // Create HTML elements to display the data
                const productList = document.createElement('ul');
                data.forEach(product => {
                    const listItem = document.createElement('li');
                    listItem.textContent = product.name;
                    productList.appendChild(listItem);
                });

                // Append the productList to the productData div
                productDataDiv.appendChild(productList);
            })
            .catch(function(error) {
                console.error('Fetch Error:', error);
            });
    });
});
