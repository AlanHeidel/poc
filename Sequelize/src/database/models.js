import sequelize from "./db.js";
import { DataTypes, Sequelize } from "sequelize";

//Producto
export const Producto = sequelize.define(
  "Producto",
  {
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    timestamps: false,
  }
);

//Pedido
export const Pedido = sequelize.define(
  "Pedido",
  {
    fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    timestamps: false,
  }
);

//PedidoProducto
export const PedidoProducto = sequelize.define(
  "PedidoProducto",
  {
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    timestamps: false,
  }
);

//Relaciones
Pedido.belongsToMany(Producto, { through: PedidoProducto });
Producto.belongsToMany(Pedido, { through: PedidoProducto });
