function TesArray (){
  let data = [
    {
      id: 12345678,
      string: 'yudhis',
      integer: 25,
      float : 45.5,
      date : '09/21/2018',
      boolean : false
    },
    {
      string: 'eful',
      id: 12345679,
      integer: 27,
      float : 42.8,
      date : '06/14/2018',
      boolean : true
    }
  ]

  tes = data.map(function(x){
    if(x.id == 12345679){
      x.string = string;
      x.integer = integer;
      x.float = float;
      x.date = date;
      x.boolean = boolean;
    }
return x;
  });

}

console.log(x);
