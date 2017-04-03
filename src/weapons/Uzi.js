import Weapon from '.'
import BlueBullet from '../projectiles'

export default class Uzi extends Weapon {
    constructor (unit) {
        super(unit, 'Uzi', {
            projectile: BlueBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 5,
            addProjectileSpeed: 5,
            maxAmmo: 25,
            delayReload: 90,
            icon: 'uzi_icon',
            sprite: 'uzi'
        })
    }
}
