//1.5 wait
//1.75 regen
//3.25 total

//energy tiers:
//t6: 160
//t5: 150
//unarmoured: 100
//const: energy per tier, recharge time 1.75, recharge block time 1.5
//vars: base dps, energyUsage, fire time

//energy per Shot = eU * fireTime
//damage per Shot = dps * fireTime

//shots per Bar = (energy/energy per shot) round up

//total dps (no energy regen) = (dShot * sBar) / ((fireTime * sBar) + (rechargeTime + rechargeBlockTime))
//total dps (ENERGY REGEN) = (dShot * sBar) / ((fireTime * sBar) + rechargeTime)

update()

function update(){
  //stuff here

  //update periodically
  setTimeout(update, 1500);
}