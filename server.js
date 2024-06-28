//* REQUIRE
const app = require("./src/app");
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.info(`Api backend start with http://localhost:${PORT}`);
});
