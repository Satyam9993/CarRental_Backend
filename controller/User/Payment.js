const stripe = require('stripe')(process.env.STRIPE_KEY);
const Booking = require('../../models/Bookings');
const Cars = require('../../models/Cars');

exports.payment = async (req, res) => {
    try {
        
        const { amount } = req.body;
        Booking.create({
            userId: req.user.id,
            carId: req.body.cart,
            location: req.body.location,
            auto_pickup: req.body.auto_pickup,
            duration: req.body.duration,
            durationdate: {
                from : new Date,
                to : req.body.durationdate.to
            },
            amount: amount,
            pickup_loc: req.body.pickup_loc
        }).then(async (book) => {
            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            unit_amount: amount * 100,
                            product_data: {
                                name: 'Payment Amount',
                            },
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:5000/api/pay/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${book._id}`, // modify the URL to point to your server
                cancel_url: 'https://car-rental-frontend-rust.vercel.app/cancel',
                billing_address_collection: 'auto',
            });

            // Return checkout session ID to client
            res.status(200).send({ url : session.url });
        }).catch(err => {
            res.status(400).json({ error: 'Something went wrong' });
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};


exports.Success = async (req, res, next) => {
    try {
        console.log(req.body);
        // Get session ID from query parameters
        const { session_id, booking_id } = req.query;

        // Retrieve session data from Stripe API
        const session = await stripe.checkout.sessions.retrieve(session_id);

        // Get payment intent data
        const payment_intent = await stripe.paymentIntents.retrieve(session.payment_intent);
        // console.log(payment_intent);
        // Call response API with payment information
        // const response = await axios.post('https://example.com/response-api', {
        //     amount: payment_intent.amount,
        //     payment_method: payment_intent.payment_method_types[0],
        //     status: payment_intent.status,
        //     // Add any other payment information you need to send to the response API
        // });

        Booking.findByIdAndUpdate({_id: booking_id}, {
            $set: {
                status : "active",
                "session" :{
                    session_id:session_id,
                    amount: payment_intent.amount,
                    payment_method: payment_intent.payment_method_types[0],
                    status: payment_intent.status,
                }
            }
        }).then(async book => {
            await book.carId.map(async id => {
                await Cars.findByIdAndUpdate({_id:id}, {
                    $set:{
                        "isbooked" : true
                    },
                    $push : {
                        "booked_by": book.userId
                    }
                }).then(car => {
                    res.redirect('https://car-rental-frontend-rust.vercel.app/');
                }).catch(err => {
                    res.status(500).json({ error: 'Something went wrong' });
                })
            })
        }).catch(err => {
            res.status(500).json({ error: 'Something went wrong' });
        });
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
};