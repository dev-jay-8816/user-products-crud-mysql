class Vehicle {
    private make: string;
    private model: string;
    private year: number;
    public miles: number;

    constructor(make: string, model: string, year: number, miles: number) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.miles = miles;
    }


    public drive(miles: number) {
        this.miles = this.miles + miles;
    }

    public checkService(): { service: boolean, message: string } {
        if (this.miles > 10000) {
            return { service: true, message: 'Please do service of your vechicle' }
        }
        return { service: false, message: 'Your vehicle is in good condition' }
    }

}

class ElectricVehicle extends Vehicle {
    constructor(make: string, model: string, year: number, miles: number, batteryLevel: number = 100) {
        super(make, model, year, miles);
        this.batteryLevel = batteryLevel;
    }

    /**
     * 1 percentage battery consume for 40 miles.
     */
    public batteryLevel: number;

    /**
     * Get the current batter level.
     * @returns {number}
     */
    public getBatteryLevel() {
        return this.batteryLevel;
    }

    /**
     * This drive function adds the miles into the total miles and consume the battery respectively.
     * @param {number} miles 
     */
    public drive(miles: number) {

        //Check the temporary battery level.
        const temporaryBatteryLevel = this.batteryLevel - (miles/40);

        if (temporaryBatteryLevel <= 0) {
            console.log('You can not drive your vehicle, because low battery level, please charge it asap.');
            return;
        }

        // Adds the miles into the total miles.
        super.drive(miles);

        //Consume the battery percentages.
        this.batteryLevel = this.batteryLevel - (miles/40);
    }

    /**
     * Charge the vehicle's battery
     */

    public chargeBattery(chargeUnit: number){
        if ((this.batteryLevel + chargeUnit) <= 100) {
            this.batteryLevel += chargeUnit;
        }
        else {
            this.batteryLevel = 100;
        }
    }

}




const electricVehicle = new ElectricVehicle('Hyndai', 'i10 nios', 2020, 0);

//Check the battery level.
console.log("Battery Level at 0 miles: ", electricVehicle.getBatteryLevel());

//Run the vehicle for 400 miles;
electricVehicle.drive(400);
console.log("total drive: ", electricVehicle.miles);

//Check the battery level.
console.log("Battery Level after 400 miles drive: ", electricVehicle.getBatteryLevel());

//Run the vehicle for 400 + 3600 miles;
electricVehicle.drive(3400);
console.log("total drive: ", electricVehicle.miles)

//Check the battery level.
console.log("Battery Level after 400 + 3600 miles drive: ", electricVehicle.getBatteryLevel());

//Run the vehicle for 400 + 3600 + 500 miles;
electricVehicle.drive(500);
console.log("total drive: ", electricVehicle.miles)

//Check the battery level.
console.log("Battery Level after 400 + 3600 + 500 miles drive: ", electricVehicle.getBatteryLevel());

// Charge the battery level.
electricVehicle.chargeBattery(35);

console.log("Battery Level after 35 percentage of charge:  ", electricVehicle.getBatteryLevel());

//Run the vehicle for 400 + 3600 + 500 miles;
electricVehicle.drive(1000);
console.log("total drive: ", electricVehicle.miles)

//Check the battery level.
console.log("Battery Level after 400 + 3600 + 500 + 1000 miles drive: ", electricVehicle.getBatteryLevel());