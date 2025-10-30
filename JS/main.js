// Cargar los productos desde el JSON
async function loadProducts() {
  const res = await fetch("products.json");
  const data = await res.json();
  renderProducts(data);
}

// Renderizar los productos agrupados por categoría
function renderProducts(products) {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  // Agrupar por categoría
  const categories = {};
  products.forEach(p => {
    const cat = p.category || "Otros";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push(p);
  });

  // Crear una sección por categoría
  Object.entries(categories).forEach(([category, items]) => {
    const section = document.createElement("section");
    section.innerHTML = `<h2 class="text-2xl font-semibold mt-10 mb-4 border-b border-green-500">${category}</h2>`;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

    // Crear las tarjetas de productos
    items.forEach(p => {
      const card = document.createElement("article");
      card.className = "bg-gray-800 p-4 rounded-lg hover:scale-105 transition-transform duration-300";
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" class="w-full h-62 object-cover rounded-lg mb-4">
        <h3 class="text-lg font-semibold">${p.name}</h3>
        <p class="text-gray-400 text-sm">Código: ${p.sku}</p>
        <div class="text-green-400 font-bold text-lg mt-1">S/ ${p.price.toFixed(2)}</div>
        <a href="detalle.html?id=${p.id}" 
          class="mt-3 block w-full text-center bg-green-500 text-black rounded py-2 font-semibold hover:bg-green-400">
          Ver detalles
        </a>
      `;
      sectionGrid.appendChild(card);
    });

    section.appendChild(sectionGrid);
    grid.appendChild(section);
  });
}

// Ejecutar al cargar la página
loadProducts();
