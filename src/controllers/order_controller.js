const OrderModel = require('../models/order_model');


const OrderController = {
    createOrder: async function (req, res) {
        try {

            const { user, items } = req.body;

            const newOrder = new OrderModel({
                user: user,
                items: items
            });

            await newOrder.save();

            return res.json({ success: true, message: "Order Places", data: newOrder });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchOrdersForUser: async function (req, res) {
        try {

            const userId = req.params.userId;

            const foundOrder = await OrderModel.find({
                "user._id": userId
            });

            if (!foundOrder) {
                return res.json({ success: true, message: "Order Not Found" });
            }

            return res.json({ success: true, message: "Order Found!", data: foundOrder });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    updateOrderStatus: async function (req, res) {
        try {

            const { orderId, status } = req.body;

            const updatedOrder = await OrderModel.findOneAndUpdate(
                { _id: orderId },
                { status: status },
                { new: true }
            );

            return res.json({ success: true, message: "Order Update!", data: updatedOrder });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    }

};

module.exports = OrderController;