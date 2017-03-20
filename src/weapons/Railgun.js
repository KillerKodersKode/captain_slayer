import Weapon from './Weapon'
import RedBullet from '../projectiles/Projectile'

export default class Railgun extends Weapon {
    constructor(unit) {
        super(unit, 'Railgun', {
            projectile: RedBullet,
            delayBeforeAttack: 15,
            delayAfterAttack: 45,
            addDamage: 400,
            addProjectileSpeed: 1000,
            maxAmmo: 20,
            delayReload: 120,
            twoHanded: true,
            icon: 'sniper_rifle_icon',
            sprite: 'sniper'
        });
    }
}