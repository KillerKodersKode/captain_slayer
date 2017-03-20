import Weapon from './Weapon'
import BossBullet from '../projectiles/Projectile'

export default class BossShootingWeapon extends Weapon {
    constructor(unit) {
        super(unit, 'PoisonGun', {
            projectile: BossBullet,
            delayBeforeAttack: 5,
            delayAfterAttack: 15,
            // addDamage: 150,
            // addProjectileSpeed: 1000,
            maxAmmo: 5,
            delayReload: 180,
            // icon: 'sniper_rifle_icon',
            // sprite: 'sniper'
        });
    }
}