const app = require("express");
const router = app.Router();

const { createJob } = required("../controllers/job");
const { verifyAuth } = required("../");

router.get("/", (req, res) => {
  res.send("Jobs Reached").status(200);
});

router.post("/create", verifyAuth, createJob);
module.exports = router;
