import Unit from './Unit'
import BossClaw from '../weapons/BossClaw'
import BossShootingWeapon from '../weapons/BossShootingWeapon'

export default class SpiderBoss extends Unit {
    constructor(x, y) {
        super(x, y, 'spider_boss', {
            speed: 150,
            hpMax: 10000,
            weapon1: BossClaw,
            weapon2: BossShootingWeapon,
            deathColor: 'yellow'
        });
        this.animationSpeed = 5;
        this.blowInterval = 150;
        this.blowFrame = this.blowInterval;
        this.blows = 16;

    }

    blow() {
        for (i = 0; i < this.blows; i++) {
            var deg = i * (360 / this.blows);
            var point = getOffsetPoint(this.sprite.x, this.sprite.y, deg, 125);
            engine.createProjectile(point.x, point.y, deg, BossBullet);
        }
    }

    update() {
        if (this.blowFrame <= 0) {
            this.blow();
            this.blowFrame = this.blowInterval;
        } else {
            this.blowFrame--
        }
    }

}