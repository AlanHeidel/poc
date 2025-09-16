import express from "express";
import { Producto, Pedido } from "./src/database/models.js";

const router = express.Router();

// Obtener todos los productos
router.get("/productos", async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los pedidos
router.get("/pedidos", async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear producto
router.post("/productos", async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear pedido con productos
router.post("/pedidos", async (req, res) => {
  try {
    const { productos } = req.body;
    // productos = [
    //   { idproducto: 1, cantidad: 2 },
    //   { idproducto: 2, cantidad: 1 },
    // ];

    const pedido = await Pedido.create();

    // Asociar productos al pedido con cantidad
    for (const p of productos) {
      await pedido.addProducto(p.idproducto, {
        through: { cantidad: p.cantidad },
      });
    }

    res.json({ pedido });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Consulta tabla intermedia
router.get("/pedidos/:id/productos", async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id, {
      include: {
        model: Producto,
        through: { attributes: ["cantidad"] },
      },
    });
    if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(pedido.Productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
