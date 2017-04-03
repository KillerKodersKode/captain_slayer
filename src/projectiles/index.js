export default class Projectile {
    // additional - contains additional speed or damage that will be added to base value (according to gun or special ability).
    constructor (x, y, direction, assetName, stats = {}, additional) {
        stats = Object.assign({}, Projectile.defaultStats, stats)
        Object.assign(this, stats)

        if (additional === undefined) additional = { damage: 0, speed: 0 }
        this.damage += additional.damage
        this.speed += additional.speed

        this.direction = direction
        // this.sprite = createSpriteByName(x, y, assetName);
        this.sprite.angle = this.direction
        this.sprite.projectile = this
    }

}

Projectile.defaultStats = {
    speed: 1000,
    damage: 20,
    lifeTime: 60,
    icon: 'bullet'
}
