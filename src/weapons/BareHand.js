import Weapon from '.'

export default class BareHand extends Weapon {
    constructor (unit) {
        super(unit, 'Bare Hand', {
            isShooting: false,
            delayBeforeAttack: 15,
            delayAfterAttack: 15,
            addDamage: 50
        })
    }
}
