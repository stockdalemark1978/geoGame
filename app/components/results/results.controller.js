class resultsController {
    constructor($rootScope, $interval) {
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

        ctrl.selectedCls = function(column) {
            return column == ctrl.sort.column;
        };
        
        ctrl.changeSorting = function(column) {
            var sort = ctrl.sort;
            if (sort.column == column) {
                sort.descending = !sort.descending;
                if(sort.descending==true){
                    sort.column = "-"+sort.column;
                    console.log(sort.column);
                }
            } else {
                sort.column = column;
                sort.descending = false;
            }
        };

      
        };
}







export default resultsController;