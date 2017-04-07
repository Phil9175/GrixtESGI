module.exports = (api) => {
    const Car = api.models.Car;
    const CarModels = api.models.CarModels;
    const User = api.models.User;
    const Pickup = api.models.Pickup;
	const Rent = api.models.Rent;

    function create(req, res, next) {
        let car = new Car(req.body);
        
        return ensureCarModelDoesNotExist()
        	.then(ensurePickupPlaceExist)
            .then(save)
            .then(respond)
            .catch(spread);


		function ensurePickupPlaceExist(){
			 return Pickup.findOne({
                id: req.body.pickupId
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
		}
		
        function ensureCarModelDoesNotExist() {
            return CarModels.findOne({
                id: req.body.modelOfCar
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
        }
        
        function save() {
            car.save()
            .then(addRent);
            
            function addRent(car) {
	            let date = new Date;	            
	            let rent = new Rent();
	            rent.car = car._id;
	            rent.beginDate = date.toString();
	            rent.endDate = date.toString();
	            rent.pickupPlace = car.pickupId;
	            rent.pickupLet = car.pickupId;
	            rent.save();
		        return true;
            }
        }

        function respond() {
            res.status(201).send();
        }

        function spread() {
            res.status(500).send("car.model.or.pickup.place.not.found");
        }
    }

    function list(req, res, next) {
        Car.find()
            .then(res.prepare(200))
            .then(res.prepare(500));
    }

    function show(req, res, next) {
        Car.findById(req.params.id)
            .then(res.prepare(200))
            .catch(res.prepare(500));
    }

    function update(req, res, next) {
	            
        return ensureCarModelDoesNotExist()
        	.then(ensurePickupPlaceExist)
            .then(findByIdAndUpdate)
            .then(respond)
            .catch(spread);

		function ensurePickupPlaceExist(){
			 return Pickup.findOne({
                id: req.body.pickupId
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
		}
		
        function ensureCarModelDoesNotExist() {
            return CarModels.findOne({
                id: req.body.modelOfCar
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
        }

        function findByIdAndUpdate() {
            return Car.findByIdAndUpdate(req.params.id, req.body)
				            .then(res.prepare(204))
				            .catch(res.prepare(500));
        }

        function respond() {
            res.status(201).send();
        }

        function spread() {
            res.status(500).send("car.model.or.pickup.place.not.found");
        }
       
    }

    function remove(req, res, next) {
	    
	    Car.removeRent()
	    		.then(findByIdAndRemove(red.params.id))
	    		 .then(res.prepare(204))
				 .catch(res.prepare(500));
			
			
		function removeRent() {
            return Rent.findOne({
                id: req.params.id
            })
                .then(ensureNone);

            function ensureNone(data) {
                return (data) ? Promise.reject() : data;
            }
        }
        
        	 
        /*Car.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
            */
    }

   
    return {
        create,
        list,
        show,
        update,
        remove
    };
};
