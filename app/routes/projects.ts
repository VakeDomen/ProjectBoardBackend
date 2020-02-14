const express = require("express");
const router = express.Router();

router.get("/projects", (req: any, resp: any) => {
    resp.send({
        message: "hello"
    });
})


module.exports = router;