const db = require("../middleware/connect")




exports.register = (req, res) => {
    
}

exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body
            if (!userName || !password) {
                return res.status(400)
            }
            db.query(
                "SELECT * FROM users userName = ?",
            [userName],
            async (error, results) => {
                console.log(results);
                if ( 
                    !results || 
                    !(await bcrypt.compare(password, results[0].password))
                ) { 
                    res.status(400)

                } else {
                    const id = results[0].id;

                    const token = jwt.sign ({ id }, process.env.JTW_SECRET, {
                        expireIn: process.env.JTW_EXPIRE_IN,
                    })
                    console.log("The token is : " + token);
                    const cookieOptions = {
                        expires : new Date(
                            Date.now() + process.env.JTW_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                            httpOnly : true,
                    };
                    res.cookie("jwt", token, cookieOptions);
                    res.status(200)
                }
            } )
    } catch (error) {
        console.log(error);
    }
    
}