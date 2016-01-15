'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function replace(tabModif, tabRent)
{
	for(var i =0; i<tabModif.length; i++)
	{
		var idMo = tabModif[i].rentalId;
		
		for(var y =0; y<tabRent.length; y++)
		{
			if(tabRent[y].id == idMo)
			{
				if(tabModif[i].returnDate)
				{
					tabRent[y].returnDate = tabModif[i].returnDate;
				}
				if(tabModif[i].distance)
				{	
					tabRent[y].distance = tabModif[i].distance;
				}
				if(tabModif[i].pickupDate)
				{
					tabRent[y].pickupDate = tabModif[i].pickupDate;
				}
			}
		}
	}
}

function compareDate(date1, date2)
{
	var d1 = new Date(date1);
	var d2 = new Date(date2);
	
	return 1 + (d2-d1)/86400000;

}

function rentalPrice(tabRent, tabCar, tabActors)
{	
	for(var i = 0; i<tabRent.length; i++)
	{
		var idCar = tabRent[i].carId;
		
		var distanc = tabRent[i].distance;
		var time = compareDate(tabRent[i].pickupDate, tabRent[i].returnDate);
		
		for(var y = 0; y<tabCar.length; y++)
		{
			if(idCar == tabCar[y].id)
			{
				var priceDist = tabCar[y].pricePerKm * distanc;
				var priceTime = 0;
				
				for(var t = 0; t<time; t++)
				{
					if(t == 0)
					{
						priceTime += tabCar[y].pricePerDay;
					}
					else if(t > 0 && t < 4)
					{
						priceTime += 0.9*tabCar[y].pricePerDay;
					}
					else if(t > 5 && t < 10)
					{
						priceTime += 0.7*tabCar[y].pricePerDay;
					}
					else if(t > 9)
					{
						priceTime += 0.5*tabCar[y].pricePerDay;
					}
				}
			}
			
					var option = 0;
					if(tabRent[i].options.deductibleReduction == true)
					{
					option = time*4;
					}
							var totalPrice = priceDist + priceTime;
				var commi = 0.3*totalPrice;	
				var insuranc = commi/2;
				var roadsideAssist = 1*time;
				var driv = commi - insuranc - roadsideAssist + option;
				var totalP = totalPrice + option;
		}

		
		tabRent[i].commission.assistance = roadsideAssist;
		tabRent[i].commission.insurance = insuranc;
		tabRent[i].commission.drivy = driv;
		tabRent[i].price = totalPrice;
		
				
		for(var u = 0; u<tabActors.length; u++)
		{
			if(tabActors[u].rentalId == tabRent[i].id)
			{
				for(var f = 0; f < tabActors[u].payment.length; f++)
				{
					if(tabActors[u].payment[f].who == "driver")
					{
						tabActors[u].payment[f].amount = totalP;
					}
					if(tabActors[u].payment[f].who == "owner")
					{
						tabActors[u].payment[f].amount = totalPrice - commi;
					}
					if(tabActors[u].payment[f].who == "insurance")
					{
						tabActors[u].payment[f].amount = insuranc;
					}
					if(tabActors[u].payment[f].who == "assistance")
					{
						tabActors[u].payment[f].amount = roadsideAssist;
					}
					if(tabActors[u].payment[f].who == "drivy")
					{
						tabActors[u].payment[f].amount = driv;
					}
			
				}

			}
		}
	}
}


replace(rentalModifications, rentals);
rentalPrice(rentals, cars, actors);
console.log(rentals);
console.log(actors);






/*console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);*/
