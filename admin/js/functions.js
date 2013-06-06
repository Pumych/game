/**********************************************************************************************************************
 * @desc Create user
 *
 * @param element {string}
 */
function userCreate( element ){
//    var updateCellData = {
//        sky_cell: element.find('input.sky_cell').val(),
//        middle_cell: element.find('input.middle_cell').val(),
//        ground_cell: element.find('input.ground_cell').val()
//    };
//
//    $.ajax({
//        data:{
//            action: "updateCellData",
//            tableName: 'ct_cells_',
//            cellID: element.attr('data-row_id'),
//            dataArr: updateCellData
//        },
//        success: function(){
//            // TOD: Check that returned data is success!
//            element.css('background', 'green');
//            element.stop().animate({ backgroundColor: "#fff" }, 'fast');
//        }
//    });
}




/**********************************************************************************************************************
 * @desc Returns formatted time <HH:MM:SS>
 *
 * @param {Int} millisSinceEpoch - milliseconds to convert
 * @returns {string}
 */
function formatTimeOfDay(millisSinceEpoch) {
    var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
    var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
    var seconds = secondsInDay % 60;
    var minutes = ((secondsInDay / 60) | 0) % 60;
    var hours = (secondsInDay / 3600) | 0;
    return hours + (minutes < 10 ? ":0" : ":")
        + minutes + (seconds < 10 ? ":0" : ":")
        + seconds;
}




/**********************************************************************************************************************
 * @desc Returns state of business after delta time calculation
 *
 * @param {Array} comesArr - array of 1s or 0s, 1 - customer visited the building, 0 - not visited
 * @param {json} lastData - data from last visit (page reload) loaded from server
 * @returns {json} - data of current visit (page reload) to be upload to server
 */
function countDayInput(comesArr, lastData){
    var data = {
        busy: lastData.busy,   // Hairdresser is busy
        sum: lastData.sum,    // Sum of input
        queue: lastData.queue,  // Queue of customers
        cost: lastData.cost,  // Cost for one haircut
        timeForCut: lastData.timeForCut
    }
    //debugger;
    var customersPay = 0;
    var customersIn = 0;
    var maxQueue = 0;

    for(var i in comesArr){  // Pass all day minutes

        if(comesArr[i]) {
            //debugger;
            data.queue++;
            maxQueue = Math.max(data.queue, maxQueue);
            customersIn++
        } // If customer came, put him to queue

        if(data.queue){      // If there is queue
            if(data.busy){   // If hairdresser is busy
                data.busy--;     // decrease work time
            } else {    // If no busy
                data.queue--;    // Take one from queue
                data.busy = data.timeForCut;  // Set hairdresser as busy for X time (depends of exp)
                data.sum+=data.cost;      // Take a payment
                customersPay++;
            }
        } else {
            if(data.busy){ data.busy--; }
        }
    }
    return $.extend(data, {
        customersPay: customersPay,
        customersIn: customersIn,
        maxQueue: maxQueue
    });
}

/**********************************************************************************************************************
 * @desc Returns array of TRUE/FALSE values with X% chance, chances 1%-100%
 *
 * @param {number} chance -
 * @param {WTF} length
 * @returns {Array}
 */
function comeInChances(chance, length){
    var arr = new Array();
    for(i=0; i<length; i++){
        arr[i] = (randomInterval(1, 100)< chance)?1:0;
    }
    return arr;
}

/**********************************************************************************************************************
 * @desc Returns random number
 *
 * @param {Int} from
 * @param {Int} to
 * @returns {Int}
 */
function randomInterval(from, to){
    return Math.floor(Math.random()*(to-from+1)+from);
}

/**********************************************************************************************************************
 * @desc
 *
 * @returns {}
 */
function showTables(){

    // Shows tables
    $.ajax({
        data: {
            action: "showTables",
            DBname: 'creatrio'
        },
        success: function(data, textStatus, jqXHR){
            $('.selectTable').html( jqXHR.responseText );   // Shows SELECT with tables
            $('select.tables').change(function(){           // On selection table:
                var $_this = $(this);

                var tableName = $_this.val();
                if(tableName == 'selectTable'){             // If not table name - empty HTML
                    ajaxOutput.html('');
                } else {                                    // If table name selected - show the table
                    showFields( tableName );
                }

            }); // $('select.tables').change


        } // success:
    }); // $.ajax
}


/**********************************************************************************************************************
 * @desc Shows fields names from table
 *
 * @param tableName
 *
 * @returns {}
 */
function showFields( tableName ){
    $.ajax({
        data: {
            action: "showFields",
            tableName: tableName
        },
        success: function(data, textStatus, jqXHR){
            $('.ajaxOutput').html(jqXHR.responseText);

            $('input[name=updateCell]').on('click', function(){
                updateCellRow( $(this).parent().parent() );
            });
        }
    });
}

/**********************************************************************************************************************
 * @desc Updates cell record data
 *
 * @param element {string}
 */
function updateCellRow( element ){
    var updateCellData = {
        sky_cell: element.find('input.sky_cell').val(),
        middle_cell: element.find('input.middle_cell').val(),
        ground_cell: element.find('input.ground_cell').val()
    };

    $.ajax({
        data:{
            action: "updateCellData",
            tableName: 'ct_cells_',
            cellID: element.attr('data-row_id'),
            dataArr: updateCellData
        },
        success: function(){
            // TOD: Check that returned data is success!
            element.css('background', 'green');
            element.stop().animate({ backgroundColor: "#fff" }, 'fast');
        }
    });
}