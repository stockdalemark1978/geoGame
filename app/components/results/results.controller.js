class resultsController {
    constructor($rootScope, $interval, $timeout) {
        let ctrl = this;
        ctrl.$rootScope = $rootScope;

        ctrl.$rootScope.headers = {
            a:"Geocache Name",
            b:"Distance",
            c:"Favorites",
            d:"Size",
            e:"Difficulty",
            f:"Terrain"
        };

        ctrl.sort = {
        column: 'b',
        descending: false
        };
        

    };

    changeSorting(column) {
        const ctrl = this;
        var sort = ctrl.sort;
        if(column == "d" || column == "-d"){
            if (sort.column == "g") {
                
                sort.descending = !sort.descending;
                if(sort.descending==true){
                    sort.column = "-"+"g";
                }
            }
            else{
                sort.column = "g";
                sort.descending = false;
            }

        } else {

            if (sort.column == column) {
                sort.descending = !sort.descending;
                if(sort.descending==true){
                    sort.column = "-"+sort.column;
            }
            } else {
                sort.column = column;
                sort.descending = false;
            }
        };
    };


}


export default resultsController;