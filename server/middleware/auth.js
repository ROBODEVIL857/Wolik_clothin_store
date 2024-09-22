module.exports = (...role) => {
    return async (req, res, next) => {
        const userRole = await req.user.role;
        // console.log(req.user)
        console.log({user: req.user})
        console.log({role, userRole})
        if(!role.includes(userRole)){
            return res.status(400).send({
                status: "fail",
                error: "You are not authorized to access this"
            })
        }
        next();
    }
}