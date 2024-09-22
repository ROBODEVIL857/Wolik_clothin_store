const { signupService, findUserByEmail, getUserServices, updateUserServices, updateUserServicesbyId, updateProductById, deleteProductById, getRecomendationsByUser } = require("../services/user.services");
const { generateToken } = require("../utils/token");

exports.signup = async (req, res, next) => {
    try {
        const result = await signupService(req.body);
        res.status(200).send({
            status: "success",
            message: "Successfully Signed Up",
            data: result
        })
    } catch (error) {
        let err;
        if (error.code == 11000) {
            err = 'This Email is already registered'
        }
        console.log({ err })
        res.status(400).send({
            status: "fail",
            message: " Signed Up failed",
            error: err ? err : error.message
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        console.log("login")
        const { email, password } = req.body;

        if (!email || !password) {
            console.log('no email')
            return res.status(400).send({
                status: "fail",
                error: "Email or password field is empty",
            })
        }
        const user = await findUserByEmail(email);

        if (!user) {
            console.log("no user")
            return res.status(400).send({
                status: "fail",
                error: "This email doesn't exist. Please create an account first",
            })
        }
        // const isPasswordvalid = user.comparePassword(password, user.password);

        if (password !== user.password) {
            return res.status(400).send({
                status: "fail",
                error: "Password is wrong",
            })
        }
        if (user.status !== "active") {
            return res.status(400).send({
                status: "fail",
                error: "Your account is not active",
            })
        }
        console.log(user);
        const token = generateToken(user);
        const { password: pwd, ...others } = user.toObject();

        res.status(200).send({
            status: "success",
            message: "Successfully Signed In",
            data: {
                others,
                token
            }
        })
    } catch (error) {
        res.status(400).send({
            status: "fail",
            message: " Signed Up failed",
            error: error.message
        })
    }
}

exports.getMe = async (req, res) => {
    try {
        const user = await findUserByEmail(req.user?.email);
        res.status(200).send({
            status: "success",
            message: "Successfully Signed In",
            data: user
        })
    } catch (error) {
        res.status(400).send({
            status: "fail",
            error: error.message
        })
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const result = await getUserServices();
        res.status(200).send({
            status: 'success',
            message: "Users get successfully",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Could not find any Users",
            error: error.message
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const result = await updateUserServices(req.user?.email, req.body);
        res.status(200).send({
            status: 'success',
            message: "user Updated Successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "user Update Failed.",
            error: error.message
        })
    }
}
exports.updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateUserServicesbyId(id, req.body);
        res.status(200).send({
            status: 'success',
            message: "user Updated Successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "user Update Failed.",
            error: error.message
        })
    }
}
exports.updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        // console.log(req.params, req.body)
        const result = await updateProductById(productId, req.body);
        res.status(200).send({
            status: 'success',
            message: "user Updated Successfully.",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "user Update Failed.",
            error: error.message
        })
    }
}

exports.getRecomendations = async (req, res, next) => {
    try {
        const result = await getRecomendationsByUser(req.user.email);
        res.status(200).send({
            data: result,
            status: "success"
        });
    } catch (error) {
        
        res.status(400).send({
            status: 'fail',
            message: "failed to get user recomendations",
            error: error.message
        })
    }
}