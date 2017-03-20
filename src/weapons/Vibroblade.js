import Weapon from './Weapon'

export default class Vibroblade extends Weapon {
    constructor(unit) {
        super(unit, 'Vibroblade', {
            isShooting: false,
            delayBeforeAttack: 7,
            delayAfterAttack: 10,
            addDamage: 50,
            meleeEffectColor: '#fff'
        });
    }
}