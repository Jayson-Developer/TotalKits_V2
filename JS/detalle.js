// ✅ Configura aquí tu número de WhatsApp (sin + ni espacios)
const WHATSAPP_NUMBER = "51987496977"; // Ejemplo Perú

// Obtener el ID del producto desde la URL (detalle.html?id=1)
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProduct() {
  const res = await fetch("products.json");
  const products = await res.json();
  const p = products.find(item => item.id == id);

  if (!p) {
    document.getElementById("detalle").innerHTML = "<p>Producto no encontrado.</p>";
    return;
  }

  // Texto del mensaje para WhatsApp
  const mensaje = `Hola 👋, quiero reservar esta camiseta #TotalKits:
${p.name} (${p.sku})
Precio: S/ ${p.price}
Talla: [indicar talla disponible]`;

  const linkWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;

  // Renderizar la información del producto
  const div = document.getElementById("detalle");
  div.innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <!-- Galería -->
      <div>
        <img id="mainImg" src="${p.images[0]}" class="rounded-lg mb-4 w-full h-81 object-cover">
        <div class="flex gap-2">
          ${p.images.map(img => `
            <img src="${img}" class="w-20 h-20 rounded-lg cursor-pointer hover:opacity-80 border border-gray-700" onclick="changeImage('${img}')">
          `).join("")}
        </div>
      </div>

      <!-- Info del producto -->
      <div>
        <h1 class="text-3xl font-bold mb-2">${p.name}</h1>
        <p class="text-gray-400 mb-2">Código: ${p.sku}</p>
        <p class="text-green-400 text-xl font-bold mb-4">S/ ${p.price.toFixed(2)}</p>
        <p class="text-gray-300 mb-4">Tallas disponibles: ${p.sizes.join(", ")}</p>
        <a target="_blank" href="${linkWhatsApp}"
          class="bg-green-500 text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-400 transition">
          🛒 Reservar por WhatsApp
        </a>
      </div>
    </div>
  `;
}

// Cambiar imagen principal al hacer clic
function changeImage(src) {
  document.getElementById("mainImg").src = src;
}

// Ejecutar al cargar la página
loadProduct();
