// fetch("http://localhost:3000/productos")
//   .then(res => res.json())
//   .then(data => console.log(data));

//Mostrar distintas secciones
function mostrar(classname) {
  document.querySelectorAll(".seccion").forEach((div) => {
    div.style.display = "none";
  });
  document.querySelector(`.${classname}`).style.display = "flex";
}

//Agregar producto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-producto");
  const mensaje = document.getElementById("mensaje");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Tomamos los valores del form
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
