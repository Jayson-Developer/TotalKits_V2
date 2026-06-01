// Cargar los productos desde el JSON
async function loadProducts() {
  try {
    const res = await fetch("products.json");
    const data = await res.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error cargando productos:", error);
    document.getElementById("grid").innerHTML = `
      <p class="text-red-500 text-center py-10">Error al cargar los productos. Inténtalo más tarde.</p>
    `;
  }
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
    section.className = "mb-12";
    
    section.innerHTML = `
      <h2 class="text-3xl font-bold text-gray-800 mb-6 border-b border-green-600 pb-2">
        ${category}
      </h2>
    `;

    const sectionGrid = document.createElement("div");
    sectionGrid.className = "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

    // Crear las tarjetas de productos
    items.forEach(p => {
      const card = document.createElement("article");
      card.className = `bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`;
      
      card.innerHTML = `
        <div class="relative">
          <img src="${p.img}" alt="${p.name}" 
               class="w-full h-56 object-cover">
          <div class="absolute top-3 right-3 bg-white text-green-600 text-xs font-bold px-3 py-1 rounded-full shadow">
            ${p.sku}
          </div>
        </div>
        
        <div class="p-5">
          <h3 class="text-lg font-semibold text-gray-900 line-clamp-2 min-h-[52px]">${p.name}</h3>
          
          <div class="mt-4 flex items-baseline justify-between">
            <div>
              <span class="text-2xl font-bold text-green-600">S/ ${p.price.toFixed(2)}</span>
            </div>
          </div>

          <a href="detalle.html?id=${p.id}" 
             class="mt-5 block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">
            Ver detalles
          </a>
        </div>
      `;
      sectionGrid.appendChild(card);
    });

    section.appendChild(sectionGrid);
    grid.appendChild(section);
  });
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", loadProducts);
