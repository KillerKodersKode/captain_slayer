import Projectile from './Projectile'

export default class RedBullet extends Projectile {
    constructor(x, y, direction, additional) {
        super(x, y, direction, 'red_plasma', {}, additional);
    }
}