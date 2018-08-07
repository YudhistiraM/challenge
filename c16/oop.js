class Car{
  constructor(door,seat,year,warranty,color,fuel,meachine,Brandtyre){
    this.door = door;
    this.seat = seat;
    this.year = year;
    this.warranty = warranty;
    this.color = color;
    this.fuel = fuel;
    this.meachine = meachine;
    this.Brandtyre = new Tyre(Brandtyre);
  }
  ComeForward(){}
  Brake(){}
  BackOff(){}
}


class Tyre{
  constructor(Brandtyre){
    this.Tyre = Brandtyre;
  }
}


class Toyota extends Car {
  constructor() {
    super(5,8, 2018,3,"Black","Peremium/Pertamax","1329 CC","BridgeStone");
    this.type = "Toyota Avanza 1.3 G MT";
  }
}


class Honda extends Car {
  constructor() {
    super(4,5, 2017,5,"Silver","Pertalite","1497 CC","Dunlop");
    this.type = "Honda Jazz RS CVT";
  }
}


class Daihatsu extends Car{
  constructor(){
    super(5,8, 2015,2,"white","Pertamax","1495 CC","BridgeStone");
    this.type = "Daihatsu Terios R AT Adventure";
  }
}


class Chevrolet extends Car{
  constructor(){
    super(5,8, 2010,3,"Grey","Pertamax","1500 CC","Dunlop")
    this.type = "Chevrolet Orlando";
  }
}


class CarFactory {
  constructor(){
    this.allcars = [];
  }

  production(m){
    let cars = [];
    let type = ["Toyota", "Honda", "Daihatsu", "Chevrolet"];
    for (var i = 0; i < type.length; i++) {
      cars["Month"] = m;
      let total = 10 * Math.random();
      let car = [];
      switch (type[i]){
        case "Toyota":
        for (var j = 0; j < total; j++) {
          car[j]= new Toyota();
        }
        break;
        case "Honda":
        for (var j = 0; j < total; j++) {
          car[j]= new Honda();
        }
        break;
        case "Daihatsu":
        for (var j = 0; j < total; j++) {
          car[j] = new Daihatsu();
        }
        break;
        default:
        for (var j = 0; j < total; j++) {
          car[j] = new Chevrolet();
        }
        break;
      }
      cars.push(car);
    }
    this.allcars.push(cars);
  }


  showProduction(Year){
    for (let i = 0; i < this.allcars.length; i++) {
      console.log();
      console.log(`Hasil PRODUKSI Pada Bulan ${this.allcars[i]["Month"]} Yaitu :`);
      console.log();
      for (let j = 0; j < this.allcars[i].length; j++) {
        console.log(`${this.allcars[i][j].length} Unit : ${this.allcars[i][j][0].type}`);
        console.log("===== DETAIL SPECIFICATION =====");
        console.log("Door       :"+ this.allcars[i][j][0].door);
        console.log("Seat       :"+ this.allcars[i][j][0].seat);
        console.log("Year       :"+ this.allcars[i][j][0].year);
        console.log("Warranty   :"+ this.allcars[i][j][0].warranty +" Tahun");
        console.log("Color      :"+ this.allcars[i][j][0].color);
        console.log("Fuel       :"+ this.allcars[i][j][0].fuel);
        console.log("Meachine   :"+ this.allcars[i][j][0].meachine);
        console.log("Brand tyre :"+ this.allcars[i][j][0].Brandtyre.Tyre);
        //this.WarrantyCalculation(2021);
      console.log();
      }
      console.log("________________________________________");
    }
  }

  WarrantyCalculation(Year){
    for (let i = 0; i < this.allcars.length; i++) {
      for (let j = 0; j < this.allcars[i].length; j++) {
        let warrantycal = Year - this.allcars[i][j][0].year;
        console.log();
        console.log(`Hasil PRODUKSI Pada Bulan ${this.allcars[i]["Month"]} Yaitu :`);
        console.log(`${this.allcars[i][j].length} Unit : ${this.allcars[i][j][0].type}`);
        this.allcars[i][j][0].warranty > warrantycal ? console.log("Warranty : Expired") : console.log("Warranty : Actived");
      }
    }
  }


}

let car = new CarFactory();
car.production("Januari");
//car.production("Februari");
//car.production("Maret");
car.showProduction();
car.WarrantyCalculation(2021);
