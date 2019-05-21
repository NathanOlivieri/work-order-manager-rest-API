const router = require('express').Router()
const Worker = require('../src/Models/workerSchema')
const Order = require('../src/Models/orderSchema')

//WORKER ROUTES

router.get('/workers', (req, res) => {
    Worker.find({})
        .populate("workOrders")
        .then(usr => {
            res.json(usr);
        })
        .catch(err => {
            console.log(err)
        })
});

router.get('/workers/:id/orders', (req, res) => {
    let uid = req.params.id
    Worker.findById(uid)
        .populate('workOrders')
        .then((usr) => {
            let sortedList = usr.workOrders.sort((a,b) => ( a.deadline > b.deadline ) ? -1: (( b.deadline > a.deadline) ? 1: 0))
            res.json(sortedList)
        })
        .catch(err => {
            console.log(err)
        })
});

//create new worker. HTTP Request must contain object with keys: name, company, email 
//HTTP post request must have headers set to content-type: application/json
router.post('/workers', (req, res) => {
    console.log(req.body)
    Worker.create(req.body)
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/workers/:id',(req, res) => {
    let uid = req.params.id
    Worker.deleteOne({_id: uid})
    .then((success) => {
        console.log(success)
        res.send(success)
    })
    .catch((err) => {
        console.log(err)
    })
})

//ORDERS ROUTES
//create new order. HTTP Request must contain object with keys: title, description, deadline or mongo with send back a failed validation error 
//HTTP post request must have headers set to content-type: application/json

router.post('/orders', (req, res) => {
    Order.create(req.body)
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/orders', (req, res) => {
    Order.find({})
        .populate("assignedWorkers")
        .then( order => {
            res.json( order );
        })
        .catch(err => {
            console.log(err)
        })
});

//Assigns a worker by _id to an order by _id
//sends back new order object updated with new assigned Worker
//also updates worker object to contain reference to orders assigned
router.put('/addWorker/:w_id/toOrder/:o_id', (req, res) => {
    let worker_id = req.params.w_id
    let order_id = req.params.o_id
    let currentOrder = {} 
    //get order requested for update and check if array either already contains the worker id OR already has 5 workers assigned
    Order.findById(order_id).then((order) => {
        currentOrder = order
        if(currentOrder.assignedWorkers.length < 4 && currentOrder.assignedWorkers.includes(worker_id) === false){
        Order.findByIdAndUpdate({ _id: order_id }, { $push: { assignedWorkers: worker_id } }, { new: true })
        .then((s) => {
            console.log(s)
            res.send(s)
            Worker.findByIdAndUpdate({ _id: worker_id }, { $push: { workOrders: order_id } }, { new: true })
            .then((s) => {
                console.log(s)
                res.send(s)
            })
            .catch((r) => {
                console.log(r)
            })
        })
        .catch((err) => {
            console.log(err)
    })}else {
        res.status(405).send('ERROR(405): Work Order already contain max of 5 assigned workers or the worker has already been assigned to this order, try assigning this worker a different order.')
    }
    })  
})

module.exports = router