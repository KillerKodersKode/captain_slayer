import Weapon from '.'
import RedBullet from '../projectiles'

export default class BlasterPistol extends Weapon {
    constructor (unit) {
        super(unit, 'Blaster Pistol', {
            projectile: RedBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 15,
            maxAmmo: 12,
            addDamage: 20,
            delayReload: 15,
            icon: 'pistol_icon',
            sprite: 'pistol'
        })
    }
}
