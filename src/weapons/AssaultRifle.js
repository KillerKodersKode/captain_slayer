import Weapon from './Weapon'
import RedBullet from '../projectiles/Projectile'

export default class AssaultRifle extends Weapon {
    constructor(unit) {
        super(unit, 'Assault Rifle', {
            projectile: RedBullet,
            delayBeforeAttack: 0,
            delayAfterAttack: 4,
            addDamage: 15,
            addProjectileSpeed: 5,
            maxAmmo: 30,
            delayReload: 90,
            sprite: 'rifle',
            icon: 'assault_rifle_icon',
            twoHanded: true
        });
    }
}