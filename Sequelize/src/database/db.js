import { Sequelize } from "sequelize";

// Creamos la conexión
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/database.sqlite", // archivo donde se guarda la DB
});

// Verificamos conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con SQLite ✅");
  } catch (error) {
    console.error("Error al conectar con SQLite ❌:", error);
  }
}

testConnection();

export default sequelize;
