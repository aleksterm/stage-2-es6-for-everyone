import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over

    combo(
      () => getDamage(firstFighter),
      controls.PlayerOneAttack
    );

    combo(
      () => getDamage(firstFighter, secondFighter),
      controls.PlayerOneAttack,
      controls.PlayerTwoBlock
    );

    combo(
      () => getDamage(secondFighter),
      controls.PlayerTwoAttack
    );

    combo(
      () => getDamage(secondFighter, firstFighter),
      controls.PlayerTwoAttack,
      controls.PlayerOneBlock
    );

    combo(
      () => getDamage(firstFighter, secondFighter, true),
      ...controls.PlayerOneCriticalHitCombination
    );

    combo(
      () => getDamage(secondFighter, firstFighter, true),
      ...controls.PlayerTwoCriticalHitCombination
    );

    //resolve('test');

    // if (firstFighter.health <= 0) {
    //   resolve(firstFighter.name);
    // } else if (secondFighter.health <= 0) {
    //   resolve(secondFighter.name);
    // }
  });
}

export function getDamage(attacker, defender, crit = false) {
  // return damage
  if (!defender) {
    return getHitPower(attacker);
  }

  if (crit) {
    return getHitPower(attacker, true);
  }

  const damage = getHitPower(attacker) - getBlockPower(defender);
  console.log(`DAMAGE: ${damage}`);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter, crit = false) {
  // return hit power
  const criticalHitChance = getRandomBetween(1, 2);
  const power = crit ? fighter.attack * 2 : fighter.attack * criticalHitChance;
  console.log(`${fighter.name} hit: ${power}`);
  return power;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = getRandomBetween(1, 2);
  const power = fighter.defense * dodgeChance;
  console.log(`${fighter.name} block: ${power}`);
  return power;
}

function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function move(event){
  switch(event.code){
    case controls.PlayerOneAttack:
      getDamage(fighter1, fighter2);
      break;
    case controls.PlayerOneBlock:
      getBlockPower(fighter);
      break;
    case controls.PlayerTwoAttack:
      getDamage(fighter2, fighter1);
      break;
    case controls.PlayerTwoBlock:
      getBlockPower(fighter2);
    break;
  }
}

function combo(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', event => {
    pressed.add(event.code);

    for (let code of codes) {
      if (!pressed.has(code)) {
        return;
      }
    }

    pressed.clear();
    func();
  }, false);

  document.addEventListener('keyup', event => {
    pressed.delete(event.code);
  }, false);
}