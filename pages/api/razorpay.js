import connectDB from "@/db";
import Hotel from "@/models/hotel-model";
import Razorpay from "razorpay";
import shortid from "shortid";

export default async function handler(req, res) {
    if(req.method === "POST"){
        connectDB()
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY,
            key_secret: process.env.RAZORPAY_SECRET,
        })

        const hotel = await Hotel.findOne({_id: req.body.id})

        const amount = hotel.price

        const options = {
            amount: (amount * 100).toString(),
            currency: "INR",
            receipt: shortid.generate(),
            payment_capture: 1
        }

        try {
            const result = await razorpay.orders.create(options)
            res.status(201).json({
                id: result.id,
                currency: result.currency,
                amount: result.amount
            })
        } catch (error) {
            console.log(error)
        }
    }

}