module.exports = (api) => {
    const Pickup = api.models.Pickup;

    function create(req, res, next) {
        let car = new Car(req.body);
        car.save()
            .then(res.prepare(201))
            .catch(res.prepare(500));
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
        Car.findByIdAndUpdate(req.params.id, req.body)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function remove(req, res, next) {
        Car.findByIdAndRemove(req.params.id)
            .then(res.prepare(204))
            .catch(res.prepare(500));
    }

    function rent(req, res, next) {
        let rentOrder = {};

        ensureInfo()
            .then(ensureUserCanRent)
            .then(getACar)
            .then(checkFreeSpotInLetPickup)
            .then(processRent);

        function checkFreeSpotInLetPickup(){
                // On vérifie si il y'a des places dispos dans le dépot de fin à la date de fin
        }

        function ensureUserCanRent(){
            // verifie si l'utilisateur à deja une location aux dates indiquées
        }

        function ensureInfo() {
            // verifie si les data dans notre post sont bonnes
            ensurePickup()
                .then(ensureCarModel)
                .then(ensureDate)
                .then(ensureNumberPlace);

                function ensurePickup(dataPosted){
                    // verifie si les deux depots existe
                    return dataPosted;
                }

                function ensureCarModel(dataPosted){
                    // verifie si le model de la voiture existe
                    return dataPosted;
                }

                function ensureDate(dataPosted){
                    // verifie les deux dates
                    return dataPosted;
                }

                function ensureNumberPlace(dataPosted){
                    // verifie si nombre place a ete renseigné, si nombre place pas superieur au nombre de place disponible sur le model
                    rentOrder = dataPosted;
                    return dataPosted;
                }

        }

        function getACar(dataPosted) {
            // gros algo de verifications physiques de disponibilité de vehicule, de date et d'endroit
            // on se trimballe une collection de voiture dans cette promesse
            // la promesse doit à la fin retourner une voiture à la fin ou rien, si rien pas de location possible
            findCarOfModelCar()
                .then(ensureOne("no.available.car.for.this.model"))
                .then(getCarInPickupAtStartRentDate)
                .then(ensureOne("no.available.car.in.pickup.place"))
                .then(ensureCarPool)
                .then(filterCarAvailableUntilEndDate)
                .then(ensureOne("no.available.car.for.these.dates"))
                .then(chooseRandomlyOne)
                .catch(res.prepare(404));

            function ensureOne(carCollection, errorMsg){
                return (carCollection) ? carCollection : Promise.reject(errorMsg);
            }

            function findCarOfModelCar() {
                // retourne la collection de voiture du modèle demandée
                return Car.find({"modelOfCar":rentOrder.carModel._id});
            }
            function getCarInPickupAtStartRentDate(carCollection){
                // filtre la collection de voitures dans le depot à la date de debut

                let rentFinishingInPickup = Rent.find()
                    .populate('Car')
                    .sort(rentOrder.beginDate, -1)
                    .where('endDate').lt(rentOrder.beginDate);
                /*
                rentFinishingInPickup.reduce(function(accumulateur, valeurCourante, index, array){
                    return accumulateur + valeurCourante;
                });
                */
                let rentCollection = [];
                for (let rent of rentFinishingInPickup) {
                    // si pickuplet == rentorder.pickupplace
                        // alors on ajoute a carCollection
                }
                return rentCollection;
            }

            function ensureCarPool(rentCollection) {
                // retourne une voiture de car pool et arrete le traitement de cette promesse 
                // sinon continu le traitement de la promesse avec la même collection passé en paramètres
                for (let rent of rentCollection) {
                    // On garde les rent qui ont le plus petit availableSeat étant plus grand que le rentOrder.numberPlace
                    // ainsi que les 2 dates correspondent (beginDate)(endDate)
                }

            }

            function filterCarAvailableUntilEndDate() {
                for (let rent of rentCollection) {
                    // On supprime les rent qui où l'on trouve une rent avec une beginDate > ) 
                    // la rentOrder.endDate sur le même véhicule
                }
                // filtre la collection de voitures disponibles pendant toutes la session (on vérifie si il n'y a pas une location sur les voitures qui commence avant la fin de la session)
            }

            function chooseRandomlyOne(carCollection){
                // s'il reste plusieurs voitures dans la collection bloque le choix à une
                return carCollection[Math.floor(Math.random()*carCollection.length)];
            }
            
        }
        
        // On ajoute une location pour un user
        function processRent() {
            createOrUpdateRent()
                .then(addRentForUser)
                .then(addRentForCar);

            function createOrUpdateRent(){
                // creéé la location ou ajoute à la location existante si covoiturage
            }

            function addRentForUser(){

            }

            function addRentForCar(){

            }
        }
    }

    return {
        create,
        list,
        show,
        update,
        remove,
        rent
    };
};
