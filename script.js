/* fetch product data from open food facts */

fetch("https://world.openfoodfacts.net/api/v2/product/3017624010701")
  .then(res => res.json())
  .then(data => {

    /* check if product exists */
    if (data.status === 1) {

      const product = data.product;

      /* select api box */
      const box = document.getElementById("api-dessert");

      /* insert product info into page */
      box.innerHTML = `
        <h2>featured product</h2>
        <img src="${product.image_url}" class="api-img">
        <p><strong>${product.product_name}</strong></p>
        <p>brand: ${product.brands || "n/a"}</p>
        <p>nutri-score: ${product.nutrition_grades || "n/a"}</p>
      `;

      /* animate with popmotion tween */
      popmotion.tween({
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
        duration: 1200,
        ease: popmotion.easing.easeOut
      }).start(v => {
        box.style.opacity = v.opacity;
        box.style.transform = `translateY(${v.y}px)`;
      });

    } else {
      console.error("product not found");
    }
  })
  .catch(err => console.error(err));
