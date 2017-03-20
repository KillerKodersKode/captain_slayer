import Projectile from './Projectile'

export default class BossBullet extends Projectile {
    constructor(x, y, direction, additional) {
        super(x, y, direction, 'roach', {
            speed: 300,
            damage: 20,
            lifeTime: 120,
            icon: 'bullet'
        }, additional);
        this.sprite.play('death');
    }
}