class resultsController {
    constructor($rootScope, $interval) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;
        ctrl.title = "MarkMail";

        
        ctrl.results = 
            [
        {
            name: "Web Development",
            price: 30,
            selected: false
        },
        {
            name: "Design",
            price: 40,
            selected: false   
        },
        {
            name: "Integration",
            price: 35,
            selected: false
        },
        {
            name: "Training",
            price: 20,
            selected: false
        },
        {
            name: "Oreos",
            price: 1000,
            selected: false
        }


            ];

  
    };


    

}







export default resultsController;