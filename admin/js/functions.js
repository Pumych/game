/*
 *
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

/*
 * Returns state for business after delta time calculation
 */
function countDayInput(arr, lastData){
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

    for(i in arr){  // Pass all day minutes

        if(arr[i]) {
//            debugger;
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

/*
 *
 */
// Returns array of TRUE/FALSE values with X% chance
// chance - 1%-100%
function comeInChances(chance, length){
    var arr = new Array();
    for(i=0; i<length; i++){
        arr[i] = (randomInterval(1, 100)< chance)?1:0;
    }
    return arr;
}

// Returns random number
function randomInterval(from, to){
    return Math.floor(Math.random()*(to-from+1)+from);
}


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

// Shows fields names from table
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

// Updates cell record data
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