// User's account
function Account(){
    if ( typeof Account.count == 'undefined' ) { Account.count = 0; }
    else { Account.count++; }

    var data = {
        id: Account.count,
        name: 'New Account',
        lastVisit: 0,
        money: 0,
        buildings: {}
    }

    this.getData = function(){ return data; }
    this.getID = function(){ return data.id; }
    this.getName = function(){ return data.name; }
    this.getLastVisit = function(){ return data.lastVisit; }
    this.getMoney = function(){ return data.money; }
    this.getBuildings = function(){ return data.buildings; }

    this.setData = function( newData ){ $.extend( data, newData ); }
    this.setName = function( newName ){ data.name = newName; }
    this.setLastVisit = function( newVisitTime ){ data.lastVisit = newVisitTime; }
    this.setMoney = function( quantity ){ data.money = quantity; }
    this.plusMoney = function( quantity ){ data.money += quantity; }
    this.minusMoney = function( quantity ){ data.money -= quantity; }
    this.addBuilding = function(){ data.buildings = new Barbershop(); }
    this.removeBuilding = function(){}

}

// Barbershop class
function Barbershop(){
    if ( typeof Barbershop.count == 'undefined' ) { Barbershop.count = 0; }
    else { Barbershop.count++; }

    var data = {
        id: Barbershop.count,
        name: 'New barbershop',     // Burbershop's name
        lastState: {
            input: 0,               // Burbershop's overall input
            cost: 0,                // Set cost per one haircut
            busy: 0,                // If hairdresser is busy, it shows for how much time intervals
            queue: 0,               // Queue of customers
            timeForCut: 999999,     // Needed time for one cut
            hairdressers: 0         // Number of hairdressers
        }
    }

    this.getData = function(){ return data; }
    this.getID = function(){ return id; }
    this.getName = function(){ return data.name; }
    this.getLastState = function(){ return data.lastState; }

    this.setData = function( newData ){ $.extend( data, newData ); }
    this.setName = function( newName ){ data.name = newName; }
    this.setLastState = function( newStateData ){ $extend( data.lastState, newStateData); }

    this.toString = function(){ console.log( data ); }
}