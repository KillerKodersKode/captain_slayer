import AI from '../AI'
import Controls from '../controls'
import Physics from '../physics'
import SoundsManager from '../sounds/SoundsManager'
import { soundsConfig } from '../sounds/SoundsConfig'
import TexturesManager from '../textures/TexturesManager'
import { texturesPaths, texturesConfig } from '../textures/TexturesConfig'


// Engine contains all information about the world.
export default class Engine {
    constructor (game, width, height) {
        this.game = game
        this.canvasWidth = width
        this.canvasHeight = height

        this.AI = new AI(this, game)
        this.controls = new Controls(this, game)
        this.physics = new Physics(this, game)
        this.soundsManager = new SoundsManager(this, game, soundsConfig)
        this.texturesManager = new TexturesManager(this, game, texturesPaths, texturesConfig)
    }

    init () {
        this.hero = undefined
        this.enemies = []
        this.projectiles = []

        // ?????
        // this.roomWidth = width
        // this.roomHeight = height
        const width = this.canvasWidth
        const height = this.canvasHeight

        this.weapon1 = null
        this.weapon2 = null

        this.game.shots = 0
        this.game.hits = 0

        this.background = this.game.add.tileSprite(0, 0, width, height, 'sky')
        this.game.world.setBounds(0, 0, height, width)

        // Create Phaser groups for units and projectiles sprites (allUnitsSprites contains both heroes and enemies).
        this.deadBodies = this.game.add.group()
        this.allUnitsSprites = this.game.add.group()
        this.enemySprites = this.game.add.group()
        this.allUnitsSprites.addChild(this.enemySprites)
        this.projectileSprites = this.game.add.group()

        this.cinematicMode = false // If true - no unit can take actions.

        this.TINT_RANGE = 80
        this.debugAttack = false
    }

    loadResources () {
        this.texturesManager.loadAssets()
        this.soundsManager.loadSounds()
    }

    // Level building.
    setBackgroundTexture (texture) {
        this.background.loadTexture(texture, 0)
    }

    createUnit (x, y, UnitType) {
        const newUnit = new UnitType(x, y)
        this.physics.initPhysicsForUnit(newUnit)
        return newUnit
    }

    createUnitAsHero (x, y, unitType) {
        this.hero = this.createUnit(x, y, unitType)
        this.hero.role = 'hero'
        this.game.camera.follow(this.hero.sprite)

        //  Add sprite to Phaser group.
        this.allUnitsSprites.addChild(this.hero.sprite)
        this.physics.initSpecialPhysicsForHeroUnit(this.hero)
    }

    createUnitAsEnemy (x, y, unitType) {
        const newEnemy = this.createUnit(x, y, unitType)
        newEnemy.role = 'enemy'
        this.enemies.push(newEnemy)

        //  Add sprite to Phaser group.
        this.enemySprites.add(newEnemy.sprite)
    }

    // Boss is final boss with specific AI.
    createUnitAsBoss (x, y, unitType) {
        this.boss = this.createUnit(x, y, unitType)
        this.boss.role = 'boss'
        this.enemies.push(this.boss)

        //  Add sprite to Phaser group.
        this.enemySprites.add(this.boss.sprite)
        this.physics.initSpecialPhysicsForBossUnit(this.boss)
    }

    dealDamage (unit, damage) {
        unit.hp -= damage
        if (unit.hp <= 0) {
            this.killUnit(unit)
        }
    }

    killUnit (unit) {
        if (unit.role === 'hero') {
            this.allUnitsSprites.remove(unit.sprite)
            if (!unit.deathFrameCount || unit.deathFrameCount < 20) {
                this.createTheGuts(unit)
                unit.deathFrameCount = unit.deathFrameCount && unit.deathFrameCount++ || 0
            }
        } else if (unit.role === 'enemy' || unit.role === 'boss') {
            this.createTheGuts(unit)
            this.enemies.remove(unit)
            this.enemySprites.remove(unit.sprite)
            this.scores += 1000
        }
        if (unit.weapon1 !== undefined) unit.weapon1.destroy()
        if (unit.weapon2 !== undefined) unit.weapon2.destroy()

        // Kill attached sprites with weapons.
        if (unit.weaponSprites !== undefined) {
            if (unit.weapon1 !== undefined) unit.weaponSprites.left.kill()
            if (unit.weapon2 !== undefined) unit.weaponSprites.right.kill()
        }
    }

    createTheGuts (unit) {
        let sprite = unit.sprite

        if (!sprite.animations.getAnimation('death')) {
            sprite = this.texturesManager.createSpriteByName(sprite.x, sprite.y, 'death_' + (unit.deathColor || 'green'))
        }

        const scale = sprite.scale.x + sprite.scale.x * (Math.random() * 0.4 - 0.2)
        sprite.scale.setTo(scale)
        sprite.rotation = Math.random() * Math.PI * 2

        const TINT_RANGE = this.TINT_RANGE

        sprite.tint = 0 +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 16) +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 8) +
            (Math.round((Math.random() * TINT_RANGE) + (255 - TINT_RANGE)) << 0)

        this.deadBodies.add(sprite)
        sprite.sendToBack()
        sprite.animations.play('death', 10, false)
        sprite.body && (sprite.body.moves = false)
    }

    // Activity (Updates every frame).

    // Here must be executed all activity of every object during current frame.
    performActivityForObjects () {
        // At first actions are setted, than actions are executed.
        if (!this.cinematicMode) {
            this.controls.setUnitActionsFromControls(this.hero)
        } else {
            this.hero.moving = false
            this.hero.attacking1 = false
            this.hero.attacking2 = false
        }

        this.performActivityForUnit(this.hero)

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i]
            if (enemy.role === 'enemy') {
                this.AI.setStrategyForUnit(enemy)
            } else if (enemy.role === 'boss') {
                this.AI.setStrategyForBoss(enemy)
            }

            if (!this.cinematicMode) {
                this.controls.setActionsForUnit(enemy)
            } else {
                enemy.moving = false
                enemy.attacking1 = false
                enemy.attacking2 = false
            }

            this.performActivityForUnit(enemy)
        }

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i]
            this.performActivityForProjectile(projectile)
        }

        this.physics.handleProjectilesCollisions()
        this.physics.handleUnitsCollisions()
    }

    performActivityForUnit (unit) {
        if (unit.hp > 0) {
            unit.modifyStats()
            if (unit.role === 'boss') unit.update()
            this.physics.performMovementForUnit(unit) // Implemented in physics.js module
            unit.updateSprite()
            if (unit.weapon1 !== undefined) {
                unit.weapon1.isUsed = unit.attacking1
                unit.weapon1.update()
            }
            if (unit.weapon2 !== undefined) {
                unit.weapon2.isUsed = unit.attacking2
                unit.weapon2.update()
            }
        }
    }


    // // Attacks.
    // // framesBeforeAttack indicates how many frames left to finish current attack.
    // // If it is equal to 0 - current attack must be performed in current frame.
    // // If it is lesser than 0 - weapon doesn't attack currently and can start new attack.
    // //
    // // framesAfterAttack indicates how many frames left to finisn 'cooldown' after attack.
    // // If it is equal to 0 - new attack can be started.
    // tryStartAttack (unit, weapon) {
    //     if (weapon.framesBeforeAttack == -1 && weapon.framesAfterAttack == 0) {
    //         // Attack can be started at this frame.

    //         if (weapon.isShooting) {
    //             this.tryStartShootingAttack(unit, weapon);
    //         } else {
    //             this.tryStartMeleeAttack(unit, weapon);
    //         }

    //     }
    // }

    // tryStartShootingAttack (unit, weapon) {
    //     // Check ammo.
    //     if (weapon.ammo > 0) {
    //         weapon.ammo--;

    //         weapon.framesBeforeAttack = weapon.delayBeforeAttack;
    //         if (debugAttack) console.log("attack started"); // DEBUG
    //     } else {
    //         console.log("need to reload!");
    //     }
    // }

    // tryStartMeleeAttack (unit, weapon) {
    //     // Create melee special effect.
    //     if (!weapon.isShooting) weapon.meleeEffect = new MeleeEffect(weapon);
    //     weapon.framesBeforeAttack = weapon.delayBeforeAttack;
    //     if (debugAttack) console.log("attack started"); // DEBUG
    // }


    // // Execute attack with weapon or decrease attacks 'cooldown'.
    // performActivityForWeapon (weapon) {
    //     // If weapon is attacking
    //     if (weapon.framesBeforeAttack > -1) {
    //         if (!weapon.isShooting) weapon.meleeEffect.update();
    //         if (debugAttack && weapon.framesBeforeAttack > 0) console.log("attack in progress"); // DEBUG

    //         // If attack must be performed now
    //         if (weapon.framesBeforeAttack == 0) {
    //             if (debugAttack) console.log("attack!"); // DEBUG
    //             this.performAttack(weapon);
    //         }
    //         weapon.framesBeforeAttack--;
    //     // If weapon is in 'cooldown' process.
    //     } else if (weapon.framesAfterAttack > 0) {
    //         if (debugAttack) console.log("can't attack"); // DEBUG
    //         weapon.framesAfterAttack--;
    //     } else if (weapon.framesToReload > -1) {
    //         if (weapon.framesToReload == 0) {
    //             console.log("reloaded!");
    //         } else {
    //             weapon.framesToReload--;
    //         }
    //     }

    // };

    // // Execute attack itself.
    // performAttack (weapon) {
    //     if (weapon.isShooting) {
    //         this.shotFromWeapon(weapon, weapon.unit.direction);
    //     } else {
    //         this.hitWithMeleeWeapon(weapon);
    //         weapon.meleeEffect.destroy();
    //     }
    //     // Launch the 'cooldown' process.
    //     weapon.framesAfterAttack = weapon.delayAfterAttack;
    // };

    // // Perform shot from weapon.
    // shotFromWeapon (weapon, direction) {
    //     var shooter = weapon.unit;
    //     var point = getOffsetPoint(shooter.sprite.x, shooter.sprite.y,
    //         weapon.attackPoint.offset + shooter.direction, weapon.attackPoint.distance);
    //     var additional = weapon.additional;
    //     this.createProjectile(point.x, point.y, direction, weapon.projectile, additional);
    // };

    // // Perform melee weapon attack.
    // hitWithMeleeWeapon (weapon) {
    //     var attacker = weapon.unit;
    //     var groupToCheck = attacker.role == 'hero' ? this.enemies : (attacker.role == 'enemy' ? [this.hero] : []);
    //     var unitsHit = getHitUnits(weapon, groupToCheck);
    //     unitsHit.forEach((unit) => {
    //         this.dealDamage(unit, weapon.addDamage);
    //     });
    // };

    // reloadWeapon (weapon) {
    //     weapon.ammo = weapon.maxAmmo;
    // }


    // // Projectiles.
    // createProjectile (x, y, direction, projectileType, additional) {
    //     var newProjectile = new projectileType(x, y, direction, additional);
    //     this.projectiles.push(newProjectile);

    //     //  Add sprite to Phaser group.
    //     this.projectileSprites.add(newProjectile.sprite);
    //     initPhysicsForProjectile(newProjectile);
    // };

    // destroyProjectile (projectile) {
    //     this.projectiles.remove(projectile);
    //     this.projectileSprites.remove(projectile.sprite);
    //     projectile.sprite.kill();
    // };

    // performActivityForProjectile (projectile) {
    //     if (projectile.lifeTime <= 0) {
    //         this.destroyProjectile(projectile);
    //     } else {
    //         projectile.lifeTime--;
    //     };
    //     performMovementForProjectile(projectile); // Implemented in physics.js module
    // };

    // handleProjectileHit (unit, projectile) {
    //     this.dealDamage(unit, projectile.damage);
    //     game.hits++;
    //     if (unit.hp > 0) {
    //         this.destroyProjectile(projectile);
    //     };
    // };


}









