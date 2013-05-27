$(document).ready(function(){

//    var client = {
//        inputSel: $('#input'),
//        tickSel: $('#tick'),
//        costSel: $('#cost'),
//        busySel: $('#busy'),
//        queueSel: $('#queue')
//    }
//
//    var server = {
//        lastState: {
//            timeStamp: 0,
//            input: 0,
//            cost: 0,
//            busy: 0,
//            queue: 0,
//            sum: 0,
//            timeForCut: 60
//        },
//        currState: {
//            timeStamp: 0,
//            input: 0,
//            cost: 0,
//            busy: 0,
//            queue: 0,
//            sum: 0,
//            timeForCut: 60
//        },
//        initServer: function(){
//            server.lastState.timeStamp = 0;
//            server.lastState.input = 0;
//            server.lastState.cost = 0;
//            server.lastState.busy = 0;
//            server.lastState.queue = 0;
//            server.lastState.sum = 0;
//            server.lastState.timeForCut = 60;
//        },
//        setCurrState: function(data){       // Set current state
//            server.currState.timeStamp = data.timeStamp;    // Set current timestamp
////            var timesDelta = server.currState.timeStamp - server.lastState.timeStamp; // Get delta timestamp
//            var timesDelta = 600;   // Delta timestemp for testing purposes
//            var dayArr = comeInChances(10, timesDelta); // Get array of customers
//            var newState = countDayInput(dayArr, server.lastState); // Returns state for business after delta time calculation
//            $.extend(server.lastState, newState);
//        },
//        updateGUI: function(){
//            client.inputSel.text(server.lastState.input);
//
//            client.costSel.val(server.lastState.cost);
//            client.busySel.text(server.lastState.busy);
//            client.queueSel.text(server.lastState.queue);
//        }
//    }
//
//    server.initServer();
//
//    console.log('lastState: ', server.lastState);
//
//
//    $('#reload').click(function(e){
//        e.preventDefault();
//        var data = {
//            timeStamp: $.now()
//        }
//
//        server.setCurrState(data);
//        server.updateGUI();
//    });
});



