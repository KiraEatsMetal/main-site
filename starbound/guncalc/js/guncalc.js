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
  let eRegenSecond = maxenergy / regentime;
  let shotTime = ((auto * firestance) + firetime);

  let normal = halfCalc(eShot, dShot, shotTime, blocktime, eRegenSecond, regentime, maxenergy);
  let regen = halfCalc(eShot, dShot, shotTime, 0, eRegenSecond, regentime, maxenergy);
  let normalHalf = halfCalc(eShot, dShot, shotTime / 2, blocktime, eRegenSecond, regentime, maxenergy);
  let regenHalf = halfCalc(eShot, dShot, shotTime / 2, 0, eRegenSecond, regentime, maxenergy);

  //let sBar = Math.ceil(maxenergy / eShot);
  //let dBar = sBar * dShot;
  //let tDps = ((dShot * sBar) / ((shotTime * sBar) + blocktime + regentime));

  //let final = {eShot, dShot, sBar, dBar, tDps, tDpsRegen}
  let final = {eShot, dShot, normal, regen, normalHalf, regenHalf}
  return final
}

function halfCalc (eShot, dShot, shotTime, blocktime, eRegenSecond, regentime, maxenergy){
  //console.log(eShot, dShot, shotTime, blocktime, eRegenSecond, regentime, maxenergy);
  let bShotEnergy = (shotTime - blocktime) * eRegenSecond;
  bShotEnergy = Math.max(bShotEnergy, 0)
  let eShotT = eShot - bShotEnergy;
  //console.log(eShotT)

  let sBar = "infinite";
  let dBar = "infinite";
  if (eShotT > 0) {
    sBar = Math.ceil(maxenergy / eShotT);
    dBar = sBar * dShot;
  }

  let tDps = dShot / shotTime;
  if (eShotT > 0) {
    tDps = (dBar / ((shotTime * sBar) + blocktime + regentime));
  }

  let final = {sBar, dBar, tDps}
  //console.log(final);
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
  let dual = document.getElementById("dual");
  if (dual.checked == true){
    dual = 1;
  } else {
    dual = 0;
  }
  let firestance = Number(document.getElementById("firestance").value);
  
  //feeding gun calc
  let results = calcGun(maxenergy, blocktime, regentime, energyusage, dps, firetime, auto, firestance);

  //updating output with gun calc results
  let final = "<br>energy per shot: " + results.eShot;
  final += "<br>damage per shot: " + results.dShot;

  final += "<br><br>shots per bar: " + results.normal.sBar;
  final += "<br>damage per bar: " + results.normal.dBar;
  final += "<br>total dps: " + results.normal.tDps;

  if (dual == 1) {
    final += "<br><br>dual wield:";
    final += "<br>shots per bar: " + results.normalHalf.sBar;
    final += "<br>damage per bar: " + results.normalHalf.dBar;
    final += "<br>total dps: " + results.normalHalf.tDps;
  }
  
  final += "<br><br>with energy regen:";
  final += "<br>shots per bar: " + results.regen.sBar;
  final += "<br>damage per bar: " + results.regen.dBar;
  final += "<br>total dps: " + results.regen.tDps;
  
  if (dual == 1) {
    final += "<br><br>dual wield energy regen:";
    final += "<br>shots per bar: " + results.regenHalf.sBar;
    final += "<br>damage per bar: " + results.regenHalf.dBar;
    final += "<br>total dps: " + results.regenHalf.tDps;
  }
  
  output.innerHTML = final;

  //getting the selected reference and its stats
  let chosenGun = document.getElementById("reference").value;
  let gunDict = referenceStats[chosenGun];
  //console.log(chosenGun)
  results = calcGun(maxenergy, blocktime, regentime, gunDict.energyusage, gunDict.dps, gunDict.firetime, gunDict.auto, gunDict.firestance);

  //displaying the reference's stats
  let refout = document.getElementById("refout");
  refout.innerHTML = "energy per shot: " + results.eShot;
  refout.innerHTML += "<br>damage per shot: " + results.dShot;

  refout.innerHTML += "<br><br>shots per bar: " + results.normal.sBar;
  refout.innerHTML += "<br>damage per bar: " + results.normal.dBar;
  refout.innerHTML += "<br>total dps: " + results.normal.tDps;

  if (dual == 1) {
    refout.innerHTML += "<br><br>dual wield:";
    refout.innerHTML += "<br>shots per bar: " + results.normalHalf.sBar;
    refout.innerHTML += "<br>damage per bar: " + results.normalHalf.dBar;
    refout.innerHTML += "<br>total dps: " + results.normalHalf.tDps;
  }
  refout.innerHTML += "<br><br>with energy regen:";
  refout.innerHTML += "<br>shots per bar: " + results.regen.sBar;
  refout.innerHTML += "<br>damage per bar: " + results.regen.dBar;
  refout.innerHTML += "<br>total dps: " + results.regen.tDps;
  
  if (dual == 1) {
    refout.innerHTML += "<br><br>dual wield energy regen:";
    refout.innerHTML += "<br>shots per bar: " + results.regenHalf.sBar;
    refout.innerHTML += "<br>damage per bar: " + results.regenHalf.dBar;
    refout.innerHTML += "<br>total dps: " + results.regenHalf.tDps;
  }
  //update periodically
  setTimeout(update, 500);
}