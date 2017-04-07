module.exports = (api) => {
    
    function rent(req, res, next) {

        ensureInfo()
            .then(ensureUserCanRent)
            .then(getACar)
            .then(checkFreeSpotInLetPickup)
            .then(processRent);

        function checkFreeSpotInLetPickup{
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
                }

                function ensureCarModel(dataPosted){
                    // verifie si le model de la voiture existe
                }

                function ensureDate(dataPosted){
                    // verifie les deux dates
                }

                function ensureNumberPlace(dataPosted){
                    // verifie si nombre place a ete renseigné, si nombre place pas superieur au nombre de place disponible sur le model
                }

        }

        function getACar(dataPosted) {
            // gros algo de verifications physiques de disponibilité de vehicule, de date et d'endroit
            // on se trimballe une collection de voiture dans cette promesse
            // la promesse doit à la fin retourner une voiture à la fin ou rien, si rien pas de location possible
            findCarOfModelCar()
                .then(getCarInPickupAtStartRentDate)
                .then(ensureCarPool)
                .then(filterCarAvailableUntilEndDate)
                .then(chooseRandomlyOne);

            function findCarOfModelCar() {
                // retourne la collection de voiture du modèle demandée
            }
            function getCarInPickupAtStartRentDate(){
                // filtre la collection de voitures dans le depot à la date de debut
            }

            function ensureCarPool() {
                // retourne une voiture de car pool et arrete le traitement de cette promesse 
                // sinon continu le traitement de la promesse avec la même collection passé en paramètres
            }

            function filterCarAvailableUntilEndDate() {
                // filtre la collection de voitures disponibles pendant toutes la session (on vérifie si il n'y a pas une location sur les voitures qui commence avant la fin de la session)
            }

            function chooseRandomlyOne(){
                // s'il reste plusieurs voitures dans la collection bloque le choix à une
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
        rent
    };
};
