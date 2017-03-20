import Projectile from './Projectile'

export default class BlueBullet extends Projectile {
    constructor(x, y, direction, additional) {
        super(x, y, direction, 'blue_plasma', {}, additional);
    }
}