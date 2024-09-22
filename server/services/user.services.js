const User = require("../models/User")
const Product = require("../models/Product")
const Orders = require("../models/ShippingDetails");

exports.signupService = async (userInfo) => {
    const user = await User.create(userInfo);
    return user;
}
exports.findUserByEmail = async (email) => {
    const user = await User.findOne({ email })
    // .populate('cart.product');
    return user;
}
exports.getUserServices = async () => {
    const result = await User.find({});
    const count = await User.count();
    return { count, result };
}

exports.updateUserServices = async (email, data) => {
    const result = await User.updateOne({ email: email }, { $set: data }, {
        runValidators: true
    });
    return result;
}
exports.updateUserServicesbyId = async (id, data) => {
    const result = await User.updateOne({ _id: id }, { $set: data }, {
        runValidators: true
    });
    return result;
}
exports.updateProductById = async (productId, data) => {
    // console.log(data.qty);
    let result
    if (data.qty === 0) {
        result = await User.findOneAndUpdate(
            { 'cart.product._id': productId },
            {
                $pull: {
                    'cart.product': { _id: productId }
                }
            },
            {
                new: true
            });
    }
    else {
        result = await User.findOneAndUpdate(
            { 'cart.product._id': productId },
            {
                $set: {
                    'cart.product.$': data
                }
            },
            {
                new: true
            });
    }
    return result;
}

const getRecomendationsByUser = async (email) => {
    const userOrders = await Orders.find({ email }).populate("products");
    if (userOrders.length != 0) {
        const purchasedCategories = Array.from(
            new Set(
                userOrders.map(order =>
                    order.products.map(
                        product => {
                            return product.category;
                        }
                    )
                ).reduce((prev, curr) => {
                    return [...prev, ...curr]
                })
            )
        );

        const recommendatedProducts = await Product.find({
            category: purchasedCategories
        });
        return recommendatedProducts;
    } else {
        const recommendatedProducts = [];
        return recommendatedProducts;
    }

    return recommendatedProducts;
}
// (async () => {
//     try {
//         await getRecomendationsByUser("test12@gmail.com")
//     } catch (ex) {
//         console.log({ ex })
//     }
// })()
exports.getRecomendationsByUser = getRecomendationsByUser