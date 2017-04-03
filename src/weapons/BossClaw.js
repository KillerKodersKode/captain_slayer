import Weapon from '.'

export default class BossClaw extends Weapon {
    constructor (unit) {
        super(unit, "Boss's claw", {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 5,
            range: 175
            // showMeleeEffect: true
        })
    }
}
