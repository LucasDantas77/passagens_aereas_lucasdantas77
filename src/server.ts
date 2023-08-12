import app from "./app";
import { AppDataSource } from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Database conected!");
    app.listen(3000, () => {
      console.log("server is running!");
    });
  })
  .catch((error: any) => {
    console.log(error);
  });
