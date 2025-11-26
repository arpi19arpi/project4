/* list of dessert or sweet product barcodes */
const dessertBarcodes = [
  "3017624010701",  // Nutella
  "737628064502",  // Hershey’s
  "8000500310427", // Kinder Bueno
  "7622210449283", // Oreo Cookies
  "5000159450122"  // Cadbury Chocolate
];

/* get a random barcode */
function getRandomBarcode() {
  return dessertBarcodes[Math.floor(Math.random() * dessertBarcodes.length)];
}

/* load product from API */
function loadProduct() {
  const barcode = getRandomBarcode();
  const box = document.getElementById("api-dessert");

  box.innerHTML = `<p>loading...</p>`;
  box.style.opacity = 0;
  box.style.transform = "translateY(40px)";

  fetch(`https://world.openfoodfacts.net/api/v2/product/${barcode}`)
    .then(res => res.json())
    .then(data => {

      if (data.status === 1) {
        const p = data.product;

        box.innerHTML = `
          <h2>featured product</h2>
          <img src="${p.image_url}" class="api-img">
          <p><strong>${p.product_name || "No name"}</strong></p>
          <p>brand: ${p.brands || "N/A"}</p>
          <p>nutri-score: ${p.nutrition_grades || "N/A"}</p>
        `;

        /* fancy spring animation */
        popmotion.spring({
          from: { opacity: 0, y: 40 },
          to: { opacity: 1, y: 0 },
          stiffness: 120,
          damping: 12
        }).start(v => {
          box.style.opacity = v.opacity;
          box.style.transform = `translateY(${v.y}px)`;
        });

      } else {
        box.innerHTML = "<p>Product not found.</p>";
      }
    });
}

/* button: load random dessert */
document.getElementById("random-btn").addEventListener("click", loadProduct);

/* load first product on page load */
loadProduct();
