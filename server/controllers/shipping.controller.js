const { createOrderServices, getOrderServices, getOrderServicesByEmail, deleteOrderServices, updateOrderServices } = require("../services/shipping.services");

exports.createOrder = async(req, res, next) => {
    try {
        const result = await createOrderServices(req.body);
        res.status(200).send({
            status: 'success',
            message: "Замовлення успішно розміщено",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Замовлення не розміщено",
            error: error.message
        })
    }
}
exports.getOrders = async(req, res, next) => {
    try {
        let filters = { ...req.query };
        const excludeFields = ['sort', 'page', 'limit', 'fields', 'skip'];
        excludeFields.forEach(field => delete filters[field])
        
        // console.log(filters)
        const queries = {};
        
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sort = sortBy; 
        }
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields; 
        }
        if(req.query.page){
            const { page=1 , limit=5 } = req.query;
            const skip = (page - 1) * +limit;
            queries.skip = skip;
            queries.limit = +limit;
        }
        // gt, gte, lt, lte 
        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g , match => `$${match}`)
        // console.log(JSON.parse (filterString));
        filters  = JSON.parse (filterString);

        const result = await getOrderServices(filters, queries);
        res.status(200).send({
            status: 'success',
            message: "Закази отримані успішно",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Не зміг знайти замовлення",
            error: error.message
        })
    }
}


exports.getOrderByEmail = async(req, res, next) => {
    const { email } = req.params;
    try {
        const result = await getOrderServicesByEmail(email);
        if(!result){
            return res.status(400).send({
                status: fail,
                message: "По цьому емейлу не було знайдено замовлень",
                error: error.message
            })
        }
        res.status(200).send({
            status: 'success',
            message: "Замовлення успішно прийняті",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "Замовлення не було знайдено",
            error: error.message
        })
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateOrderServices(id, req.body);

        res.status(200).send({
            status: 'success',
            message: "Замовлення успішно оновлено",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "При оновленні замовлення виникла помилка",
            error: error.message
        })
    }
}
exports.deleteOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await deleteOrderServices(id);

        res.status(200).send({
            status: 'success',
            message: "Замовлення видалено успішно",
            data: result
        })
    } catch (error) {
        res.status(400).send({
            status: 'fail',
            message: "При видаленні замовлення виникла помилка",
            error: error.message
        })
    }
}

