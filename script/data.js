// JavaScript Document

//temp data
var s = new Array();
s.push("Serviced / recommended service performed.");//0
s.push("Maintenance inspection performed.");//1
s.push("Safety inspection performed.");//2
s.push("Wiper replaced.");//3
s.push("Engine oil and filter replaced.");//4
s.push("Transmission fluid replaced.");//5
s.push("Brake fluid replaced.");//6
s.push("Cabin air filter replaced.");//7
s.push("Engine air filter replaced.");//8
s.push("suspension checked.");//9
s.push("Rear suspension checked.");//10
s.push("Rear suspension checked.");//11
s.push("Brakepad replaced.");//12
s.push("Front brakepad replaced.");//13
s.push("Rear brakepad replaced.");//14
s.push("Differential fluid changed.");//15
s.push("Wheel alignment performed.");//16
s.push("Rotate tires.");//17
s.push("Flip tires inside out.");//18
s.push("Ceramic coating performed.");//19
s.push("Rust proofing performed.");//20
s.push("Install battery hold down.");//21
s.push("Wheel bearings / hubs replaced.");//22
s.push("Front wheel bearings / hubs replaced.");//23
s.push("Rear wheel bearings / hubs replaced.");//24
s.push("Rim refinish / fix");//25
s.push("Replace tires");//26
s.push("Serviced / recommended service performed.");//28
s.push("Spark plugs service performed.");//29


d3.csv("https://drmotor.ca/data/JTHCF1D28E5008692.csv", function(data) {
	
	//true false alternative
	const YES = "&#x2713";//tick
	const NO = "&#x2717";//cross
	
	//service intervals
	const OIL_CHANGE_DURATION = 8000;
	const ENGINE_AIR_FILTER_DURATION = 24000;
	const CABIN_AIR_FILTER_DURATION = 24000;
	const SPARK_PLUG_DURATION = 24000;
	const TIMING_BELT_DURATION = 100000;
	const SERPENTINE_BELT_DURATION = 100000;
	const TRANSMISSION_FLUID_DURATION = 70000;
	const DIFF_FLUID_DURATION = 65000;
	const BRAKE_FLUID_DURATION = 65000;
	const TIRE_ROTATION_DURATION = 10000;
	
	//vehicle data
	const VIN_NUMBER = data[0].vin;
	const LAST_REPORTED_KM = parseInt(data[data.length-1].odometer);
	const licensePlate = data[0].plate;
	var location = data[0].location;
	var wheelSize = data[0].wsize;
	var wheelMaterial = data[0].wmaterial;
	var wheelSetup = data[0].wsetup;
	var tire = data[0].tire;
	var ownerName = data[0].owner;
	var ownerEmail = data[0].email;


	//gobal variables initialization
	var winter = NO;
	var fall = NO;
	var summer = NO;
	var engineOilValid = YES;
	var engineAirFilterValid = YES;
	var cabinAirFilterValid = YES;
		var transmissionFluidValid = YES;
		var sparkPlugValid = YES;
	var diffFluidValid = YES;
	var brakeFluidValid = YES;

	var tireRotationAdvice = "Unavailable.";
	
	
    var myd="<tr><th>Date</th><th>Odometer</th><th>Source</th><th>Details</th></tr>";

	var lastOilChange = 0;
	var lastEngineAirFilterChange = 0; //last mil for engine air filter
	var lastCabinAirFilterChange = 0; //last mil for cabin air filter
	var lastTransmissionFluidChange = 0; //last mil for cabin air filter
	var lastSparkPlugChange = 0; //last mil for cabin air filter
	var lastDiffFluidChange = 0; //last mil for cabin air filter
	var lastBrakeFluidChange = 0; //last mil for cabin air filter
	
       for (var i = 0; i < data.length; i++) {
		   var serviceDetails="";
		   //temp prog for service code
		   var serviceCode = data[i].details.split(",");
		   
		   //last oil change and service record
		   for(var x=0; x<serviceCode.length; x++){
			   if(serviceCode[x]=="4"){
				   lastOilChange= parseInt(data[i].odometer);
			   }
			   //last engine air filter record
			   if(serviceCode[x]=="8"){
				   lastEngineAirFilterChange = parseInt(data[i].odometer);
			   }
			   //last cabin air filter record
			   if(serviceCode[x]=="7"){
				   lastCabinAirFilterChange = parseInt(data[i].odometer);
			   }
			   //last transmission fluid  record
			   if(serviceCode[x]=="5"){
				   lastTranChange = parseInt(data[i].odometer);
			   }
			   //last spark plug record
			   if(serviceCode[x]=="29"){
				   lastSparkPlugChange = parseInt(data[i].odometer);
			   }
			   if(serviceCode[x]=="15"){
				   lastDiffFluidChange = parseInt(data[i].odometer);
			   }
			   if(serviceCode[x]=="6"){
				   lastBrakeFluidChange = parseInt(data[i].odometer);
			   }
			   


			   serviceDetails+=s[parseInt(serviceCode[x])]+"<br>";
		   }
		   
		   
		   
        myd+="<tr><td>"+data[i].date+"</td><td>"+data[i].odometer+"</td><td>"+data[i].source+"</td><td>"+serviceDetails+"</td></tr>";

    }
	

	
	//oil change
	//Every 8000km
	var nextOilDue = lastOilChange+OIL_CHANGE_DURATION;
	if(nextOilDue<= LAST_REPORTED_KM){
		engineOilValid=NO;//oil is due
	}
	
	//engine air filter
	//every 24000km
	var nextEngineAirFilterDue = lastEngineAirFilterChange+ENGINE_AIR_FILTER_DURATION;
	if(nextEngineAirFilterDue<= LAST_REPORTED_KM){
		engineAirfilterValid=NO;
	}
	
	//cabin air filter
	//every 24000km

	var nextCabinAirFilterDue = lastCabinAirFilterChange+CABIN_AIR_FILTER_DURATION;
	if(nextCabinAirFilterDue<= LAST_REPORTED_KM){
		cabinAirFilterValid=NO;
	}
	
	//transmission fluid
	//every 70000km
	var nextTransmissionFluidDue = lastTransmissionFluidChange+TRANSMISSION_FLUID_DURATION;
	if(nextTransmissionFluidDue<= LAST_REPORTED_KM){
		transmissionFluidValid = NO;
	}
	
	//spark plug
	//every 70000km
	var nextSparkPlugDue = lastSparkPlugChange+SPARK_PLUG_DURATION;
	if(nextSparkPlugDue<= LAST_REPORTED_KM){
		sparkPlugValid = NO;
	}
	
	//diff fluid
	//every 65000km
	var nextDiffFluidDue = lastDiffFluidChange+DIFF_FLUID_DURATION;
	if(nextDiffFluidDue<= LAST_REPORTED_KM){
		diffFluidValid =NO;
	}
	
	//diff fluid due
	var brakeFluidValid = YES;
	var nextBrakeFluidDue = lastBrakeFluidChange+BRAKE_FLUID_DURATION;
	if(nextBrakeFluidDue<= LAST_REPORTED_KM){
		brakeFluidValid = NO;
	}
	
	
	//tire recommendation
	//all weather tire: summer, fall and winter
	//winter tire: fall and winter
	//summer tire: summer
	//all season tire: summer and fall
	if(tire=="All weather"){
		winter = YES;
		fall = YES;
		summer = YES;
	}
	else if(tire =="Winter"){
		winter = YES;
		
	}
	else if(tire == "Summer"){
		summer = YES;
		
	}
	else if(tire == "All season"){
		summer = YES;
		fall = YES;
	}
	

	//wheel setup recommendation
	//square: rotate
	//staggered: flip tire inside out or swap left to right
	if(wheelSetup == "Staggered"){
		tireRotationAdvice = "Flip tires inside out or swap them left to right in every 6 months or every "+tireRotationDuration+" KM.";
	}
	if(wheelSetup == "Square"){
		tireRotationAdvice = "Rotate your tires in every 6 months or every "+tireRotationDuration+" KM.";
	}
	
	//summary for dues
	var summaryTotoal ="<ul>";
	
	summaryTotoal+="</ul>";
	
	
	

d3.select("#history").html(myd);
d3.select("#vin").html(VIN_NUMBER);
d3.select("#plate").html(licensePlate+" ("+location+")");
d3.select("#lastKm").html(LAST_REPORTED_KM+" KM");
d3.select("#wheel").html(wheelSize+" inch / "+wheelMaterial+" / "+wheelSetup);
d3.select("#tire").html(tire);
d3.select("#wintertire").html(winter);
d3.select("#falltire").html(fall);
d3.select("#summertire").html(summer);
d3.select("#rotaterec").html(tireRotationAdvice);
d3.select("#ownername").html(ownerName);
d3.select("#owneremail").html(ownerEmail);
d3.select("#lastoil").html(lastOilChange);
d3.select("#oildu").html(engineOilValid);
d3.select("#eairdu").html(engineAirfilterValid);
d3.select("#cairdu").html(cabinAirFilterValid);
d3.select("#trandu").html(transmissionFluidValid);
d3.select("#plug").html(sparkPlugValid);
d3.select("#diffdu").html(diffFluidValid);
d3.select("#bfluiddu").html(brakeFluidValid);

});