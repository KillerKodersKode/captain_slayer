import MonsterClaw from '../weapons/MonsterClaw'

export default class Unit {
    constructor (x, y, assetName, stats = {}) {
        stats = Object.assign({}, Unit.defaultStats, stats)
        Object.assign(this, stats)

        // Set weapons.
        if (stats.weapon1 !== undefined) this.weapon1 = new stats.weapon1(this)
        if (stats.weapon2 !== undefined) this.weapon2 = new stats.weapon2(this)

        // // Set dynamic sprite.
        // if (!spriteIsDynamic(assetName)) {
        //     this.sprite = createSpriteByName(x, y, assetName);

        // } else {
        //     this.weaponSprites = {
        //         left: this.weapon1 ? createSpriteByName(0, 0, getDynamicWeaponAssetByKey(assetName, this.weapon1.sprite, false)) : undefined,
        //         right: this.weapon2 ? createSpriteByName(0, 0, getDynamicWeaponAssetByKey(assetName, this.weapon2.sprite, true)) : undefined
        //     };

        // // Create sprite.
        // this.sprite = createSpriteByName(x, y, getDynamicBodyAsset(assetName));

        //     if (this.weaponSprites.left !== undefined) {
        //         this.weaponSprites.left.parent = this.sprite;
        //     }
        //     if (this.weaponSprites.right !== undefined) {
        //         this.weaponSprites.right.parent = this.sprite;
        //     }
        // }

        // // Set attack points.
        // var attackPoints = getAttackPointsByAssetName(assetName);
        // if (stats.weapon1 !== undefined) {
        //     if (attackPoints !== undefined) {
        //         this.weapon1.attackPoint = this.weapon1.twoHanded ? attackPoints.middle : this.weapon1.attackPoint = attackPoints.left;
        //     }
        // };
        // if (stats.weapon2 !== undefined) {
        //     if (attackPoints !== undefined) this.weapon2.attackPoint = attackPoints.right;
        // }

        // General properties.
        // this.sprite.unit = this;
        this.hp = this.hpMax * stats.hp

        this.direction = 0 // Direction of unit's face.
        this.movementDirection = 0 // Direction of unit's movement.
        this.moving = false
        this.attacking1 = false
        this.attacking2 = false
    }

    updateSprite () {
        this.sprite.angle = this.direction
        if (this.moving) {
            this.sprite.animations.play('move', this.animationSpeed || 10, true)
        } else {
            this.sprite.animations.play('idle')
        }
    }

    modifyStats () {
        if (this.hp < this.hpMax) {
            this.hp += this.hpMax * this.hpRegen / 100
            if (this.hp > this.hpMax) this.hp = this.hpMax
        };
    };

}

Unit.defaultStats = {
    hpMax: 100,
    hp: 1, // 1 means that unit is created with 100% of its max HP. If you want create damaged unit, use value from 0 to 1.
    hpRegen: 1 / 60, // HP regen (in %) per frame
    speed: 100,
    weapon1: MonsterClaw,
    deathColor: 'red'
}
