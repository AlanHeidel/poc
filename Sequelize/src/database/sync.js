import sequelize from "./db.js";
import "./models.js"; //importa modelos y relaciones

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true }); //borra y recrea tablas
    console.log("Base de datos sincronizada");
  } catch (error) {
    console.error("Error al sincronizar:", error);
  } finally {
    await sequelize.close();
  }
};

syncDB();
