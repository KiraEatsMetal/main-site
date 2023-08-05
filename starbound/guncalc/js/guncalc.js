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

  let maxenergy = document.getElementById("max-energy").value;
  let blocktime = Number(document.getElementById("block-time").value);
  let regentime = Number(document.getElementById("regen-time").value);
  
  let energyusage = document.getElementById("energy-usage").value;
  let dps = document.getElementById("dps").value;
  let firetime = document.getElementById("fire-time").value;

  let eShot = energyusage * firetime;
  let dShot = dps * firetime;

  let sBar = Math.ceil(maxenergy/eShot);
  let dBar = sBar * dShot;

  let tDps = ((dShot * sBar) / ((firetime * sBar) + blocktime + regentime));
  let tDpsRegen =  ((dShot * sBar) / ((firetime * sBar) + regentime));

  //update periodically
  let final = ": "+String(sBar)+"<br>: "+String(dBar)+"<br>: "+String(tDps)+"<br>: "+String(tDpsRegen);
  console.log(final);
  output.innerHTML = final;
  setTimeout(update, 3000);
  console.log("repeating");
}