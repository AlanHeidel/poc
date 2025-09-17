// fetch("http://localhost:3000/productos")
//   .then(res => res.json())
//   .then(data => console.log(data));

//Mostrar distintas secciones
function mostrar(classname) {
  document.querySelectorAll(".seccion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector(`.${classname}`).style.display = "flex";
  if (classname === "realizar-pedido") {
    listarProductos(); // refresca los productos cada vez que se abre la sección
  }
}

//Agregar producto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-producto");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Tomar los valores del form
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    try {
      const res = await fetch("http://localhost:3001/api/productos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }),
      });

      if (!res.ok) throw new Error("Error al crear el producto");

      const data = await res.json();
      mensaje.textContent = `Producto "${data.nombre}" agregado correctamente!`;
      mensaje.style.color = "green";

      // Limpiar form
      form.reset();
    } catch (err) {
      mensaje.textContent = err.message;
      mensaje.style.color = "red";
    }
  });
});

let carrito = [];
// Traer productos del backend
// Función para listar productos
async function listarProductos() {
  try {
    const res = await fetch("http://localhost:3001/api/productos");
    const productos = await res.json();

    const contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = ""; // Limpiar la lista antes de renderizar

    productos.forEach((p) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <span>${p.nombre} - $${p.precio}</span>
        <input type="number" min="1" value="1" id="cantidad-${p.id}">
        <button onclick="agregarAlCarrito(${p.id}, '${p.nombre}')">Agregar</button>
      `;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error al listar productos:", error);
  }
}

function agregarAlCarrito(id, nombre) {
  const cantidad = parseInt(document.getElementById(`cantidad-${id}`).value);
  let item = carrito.find((p) => p.productoId === id);
  if (item) {
    item.cantidad += cantidad;
  } else {
    carrito.push({ productoId: id, nombre, cantidad });
  }

  renderCarrito();
}

function renderCarrito() {
  const ul = document.getElementById("carrito");
  ul.innerHTML = "";
  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad}`;
    ul.appendChild(li);
  });
}

function confirmarPedido() {
  const productos = carrito.map((p) => ({
    id: p.productoId,
    cantidad: p.cantidad,
  }));

  fetch("http://localhost:3001/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productos }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Pedido confirmado!");
      carrito = [];
      renderCarrito();
    })
    .catch((err) => console.error(err));
}

//Listado de pedidos
async function listarPedidos() {
  try {
    const res = await fetch("http://localhost:3001/api/pedidos");
    const pedidos = await res.json();

    const contenedor = document.getElementById("listado-pedidos");
    contenedor.innerHTML = "";

    pedidos.forEach((pedido) => {
      const div = document.createElement("div");
      div.classList.add("pedido");

      let html = `<h3>Pedido #${pedido.id} - Fecha: ${new Date(
        pedido.fecha
      ).toLocaleString()}</h3>`;
      html += "<ul>";

      let total = 0;
      pedido.Productos.forEach((prod) => {
        const subtotal = prod.precio * prod.PedidoProducto.cantidad;
        total += subtotal;
        html += `<li>${prod.nombre} x${prod.PedidoProducto.cantidad} ($${prod.precio} c/u) = $${subtotal}</li>`;
      });

      html += `</ul><strong>Total: $${total}</strong>`;
      div.innerHTML = html;
      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error("Error al listar pedidos:", error);
  }
}
