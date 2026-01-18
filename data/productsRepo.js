// data/productsRepo.js
// One place to fetch products
// Today: in-memory list
// Later: MySQL

function getAllProducts() {
    return [
        {
            id: 1,
            name: "iPhone 15",
            description: "Apple iPhone 15 with improved camera and performance",
            price: 999.00,
            image: "products/iphone15.jpg"
        },
        {
            id: 2,
            name: "Samsung Galaxy S24",
            description: "Samsung flagship with AMOLED display",
            price: 899.00,
            image: "products/galaxyS24.jpg"
        },
        {
            id: 3,
            name: "Google Pixel 8",
            description: "Clean Android experience with excellent photography",
            price: 799.00,
            image: "products/pixel8.jpg"
        },
        {
            id: 4,
            name: "OnePlus 12",
            description: "Fast, smooth, and great value flagship phone",
            price: 749.00,
            image: "products/oneplus12.jpg"
        },
        {
            id: 5,
            name: "Xiaomi 13",
            description: "High-end specs at a competitive price",
            price: 699.00,
            image: "products/xiaomi13.jpg"
        }
    ];
}

function getProductById(id) {
    const products = getAllProducts();
    return products.find(p => String(p.id) === String(id));
}

module.exports = {
    getAllProducts,
    getProductById
};
