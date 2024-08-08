const { ensureAuth } = require("../middlewares/Auth");

const router = require("express").Router();

router.get("/", ensureAuth, (req,res)=>{
    res.status(200).json(
        [
            {
                name: "shirt1",
                price: 400
            },
            {
                name: "shirt2",
                price: 500
            }
        ]
    )
});


module.exports = router;
