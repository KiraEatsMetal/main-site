//1.5 wait
//1.75 regen
//3.25 total

//energy tiers:
//t6: 160
//t5: 150
//unarmoured: 100
//const: energy per tier, recharge time 1.75, recharge block time 1.5
//lets: base dps, energyUsage, fire time

//energy per Shot = eU * fireTime
//damage per Shot = dps * fireTime

//shots per Bar = (energy/energy per shot) round up

//total dps (no energy regen) = (dShot * sBar) / ((fireTime * sBar) + (rechargeTime + rechargeBlockTime))
//total dps (ENERGY REGEN) = (dShot * sBar) / ((fireTime * sBar) + rechargeTime)

//defining reference guns
let referenceStats = {
    ironassaultrifle: {
      energyusage: 31.5,
      dps: 10.5,
      firetime: 0.11,
      auto: 1,
      firestance: 0
    },
    ironrevolver: {
      energyusage: 18.75,
      dps: 6.25,
      firetime: 0.6,
      auto: 1,
      firestance: 0
    }
  };
  
  console.log(referenceStats);
  let referenceKeys = Object.keys(referenceStats);
  console.log(referenceKeys);
  console.log(referenceKeys.length);
  
  //adding reference options to html
  let selector = document.getElementById("reference");
  for (let i = 0; i < referenceKeys.length; i++){
    option = document.createElement('option');
    option.value = referenceKeys[i];
    option.innerHTML = referenceKeys[i];
    console.log(option);
    selector.appendChild(option);
  };
  
  
  update()
  
  function calcGun(maxenergy, blocktime, regentime, energyusage, dps, firetime, auto, firestance){
  
    let eShot = energyusage * firetime;
    let dShot = dps * firetime;
  
    let sBar = Math.ceil(maxenergy/eShot);
    let dBar = sBar * dShot;
  
    let tDps = ((dShot * sBar) / ((((auto * firestance) + firetime) * sBar) + blocktime + regentime));
    let tDpsRegen =  ((dShot * sBar) / ((firetime * sBar) + regentime));
  
    let final = {eShot, dShot, sBar, dBar, tDps, tDpsRegen}
    return final
  }
  
  function update(){
    console.log("started")
    //defining variables to feed into gun calc
    let output = document.getElementById("output");
  
    let maxenergy = Number(document.getElementById("max-energy").value);
    let blocktime = Number(document.getElementById("block-time").value);
    let regentime = Number(document.getElementById("regen-time").value);
    
    let energyusage = Number(document.getElementById("energy-usage").value);
    let dps = Number(document.getElementById("dps").value);
    let firetime = Number(document.getElementById("fire-time").value);
    
    let auto = document.getElementById("auto");
    if (auto.checked == true){
      auto = 1;
    } else {
      auto = 0;
    }
    let firestance = Number(document.getElementById("firestance").value);
    
    //feeding gun calc
    let results = calcGun(maxenergy, blocktime, regentime, energyusage, dps, firetime, auto, firestance);
  
    //updating output with gun calc results
    let final = "energy per shot: "+results.eShot+"<br>damage per shot: "+results.dShot+"<br>shots per bar: "+results.sBar+"<br>damage per bar: "+results.dBar+"<br>total dps: "+results.tDps+"<br>total dps with energy regen: "+results.tDpsRegen;
    output.innerHTML = final;
  
    //getting the selected reference and its stats
    let chosenGun = document.getElementById("reference").value;
    let gunDict = referenceStats[chosenGun];
    console.log(chosenGun);
    results = calcGun(maxenergy, blocktime, regentime, gunDict.energyusage, gunDict.dps, gunDict.firetime, gunDict.auto, gunDict.firestance);
  
    //displaying the reference's stats
    let refout = document.getElementById("refout");
    refout.innerHTML = chosenGun+"<br>energy per shot: "+results.eShot+"<br>damage per shot: "+results.dShot+"<br>shots per bar: "+results.sBar+"<br>damage per bar: "+results.dBar+"<br>total dps: "+results.tDps+"<br>total dps with energy regen: "+results.tDpsRegen;;
  
    //update periodically
    setTimeout(update, 500);
    //console.log("repeating");
  }