# 🧩 POC – Sistema de Pedidos con Sequelize

Este proyecto es una **Prueba de Concepto (POC)** desarrollada para la **Universidad Tecnológica Nacional – Facultad Regional Rosario (UTN FRRo)**, en la provincia de Santa Fe, Argentina.  
El objetivo principal es **demostrar el uso de Sequelize** como ORM en un entorno **Node.js + Express**, simulando un flujo básico de comercio electrónico: **gestión de productos, creación de pedidos y relación Pedido–Producto**.

---

## 🚀 Descripción del Proyecto

La aplicación simula un pequeño sistema de pedidos que permite:

- 🛒 **Agregar productos** a una base de datos.
- 📦 **Crear pedidos** seleccionando uno o varios productos, junto con su cantidad.
- 🔗 **Relacionar productos y pedidos** a través de la tabla intermedia `PedidoProducto`.
- 👀 **Visualizar todos los pedidos** y sus productos asociados.
- 💾 **Persistir los datos** utilizando una base de datos **SQLite** mediante **Sequelize ORM**.

El frontend está desarrollado con **HTML, CSS y JavaScript puro**, comunicándose con la API backend a través de **fetch y endpoints REST**.

---

## 🧠 Objetivo Académico

El propósito de esta POC es **demostrar la integración práctica entre Sequelize y Express**, aplicando conceptos de:
- Relaciones entre entidades.
- Uso de `async/await` en operaciones asincrónicas.
- Manejo de rutas y controladores REST.
- Sincronización de modelos con la base de datos.
- Configuración de CORS y comunicación entre frontend y backend.

---

## ⚙️ Tecnologías Utilizadas

**Backend**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/)
- [CORS](https://www.npmjs.com/package/cors)

**Frontend**
- HTML5
- CSS3
- JavaScript (Fetch API)

---

## 🔌 Endpoints Principales

| Método | Ruta | Descripción |
|--------|------|--------------|
| **GET** | `/api/productos` | Obtener todos los productos |
| **POST** | `/api/productos` | Crear un nuevo producto |
| **POST** | `/api/pedidos` | Crear un pedido con sus productos |
| **GET** | `/api/pedidos` | Obtener todos los pedidos con sus productos |
| **GET** | `/api/pedidos/:id/productos` | Ver productos de un pedido específico |

---
## 🖥️ Ejecución del Proyecto

### 🔧 Requisitos previos
- Tener instalado **Node.js** y **pnpm** o **npm**.
- Instalar las dependencias necesarias del proyecto:

  ```bash
  pnpm install
  ```
  o, si usás npm:
  ```bash
  npm install
  ```
  
### ⚙️ Sincronizar la Base de Datos
Antes de iniciar el servidor, asegurate de que la base de datos esté sincronizada con los modelos definidos.
Ejecutá el siguiente comando:
  ```bash
  node src/database/sync.js
  ```
Esto creará (o actualizará) las tablas definidas en models.js.
<br/>

### 🚀 Iniciar el Servidor
Una vez sincronizada la base de datos, levantá el servidor con:
  ```bash
  node src/index.js
  ```
El servidor se ejecutará por defecto en: <br/>
  👉 [http://localhost:3001](http://localhost:3001)
<br/>

### 🌐 Abrir el Frontend
Para acceder a la interfaz visual: 
  - Abrí el archivo index.html ubicado en la carpeta Front/.
  - Podés abrirlo directamente en el navegador o usar una extensión como Live Server de VS Code.
