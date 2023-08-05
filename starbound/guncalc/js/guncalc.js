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

update()

function update(){
  console.log("started")
  //stuff here
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

  console.log(auto);
  console.log(firestance);

  let eShot = energyusage * firetime;
  let dShot = dps * firetime;

  let sBar = Math.ceil(maxenergy/eShot);
  let dBar = sBar * dShot;

  let tDps = ((dShot * sBar) / ((((auto * firestance) + firetime) * sBar) + blocktime + regentime));
  let tDpsRegen =  ((dShot * sBar) / ((firetime * sBar) + regentime));

  //update periodically
  let final = "energy per shot: "+String(eShot)+"<br>damage per shot: "+String(dShot)+"<br>shots per bar: "+String(sBar)+"<br>damage per bar: "+String(dBar)+"<br>total dps: "+String(tDps)+"<br>total dps with energy regen: "+String(tDpsRegen);
  console.log(final);
  output.innerHTML = final;
  setTimeout(update, 500);
  console.log("repeating");
}