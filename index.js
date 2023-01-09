import sql from "mssql";
import express from "express";

const app = express();

app.use(express.json());
let config = {
  server: "10.2.5.23",
  database: "DBUNETI_Online",
  user: "uneti_online",
  password: "123456",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

sql.connect(config, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }

});

app.get("/", (req, res) => {
  res.send("wellcome back sir!");
});

app.get("/api/test", (req, res) => {
  req = new sql.Request();
  req.query("SELECT top(1) * FROM dbo.HT_USER", (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      res.json(data.recordset);
    }
  });
});

app.listen(process.env.PORT || 8000, () => {
  console.log("backend connected!");
});
