import Marine from '../units/Marine'
import Spider from '../units/Spider'
import Zombie from '../units/Zombie'
import Roach from '../units/Roach'
import SpiderBoss from '../units/SpiderBoss'
import Dialog from '../effects/Dialog'


export default class LevelDesigner {
    constructor (engine, game) {
        this.engine = engine
        this.game = game
    }

    getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    startGame (hero, lvl, firstpart) {
        const catchphrase = this.levels[lvl].name
        if ((hero.sprite.y === this.game.world.centerY) && (hero.sprite.x === this.game.world.centerX)) {
            hero.textBubble = new Dialog(hero, 'intro-' + catchphrase)
            setTimeout(() => {
                loopSound('Soundtrack')
                hero.textBubble.unit.textBubble.sprite.destroy()
                this.engine.cinematicMode = false
                SpawnCreeps(lvl)
            }, 2000)
        }
    }

    finishGame (hero, lvl) {
        const catchphrase = this.levels[lvl].name
        const toCenter = setInterval(function () {
            if (hero.sprite.x < this.game.world.centerX) {
                hero.sprite.x++
            }
            if (hero.sprite.y > this.game.world.centerY) {
                hero.sprite.y--
            }
            if (hero.sprite.x > this.game.world.centerX) {
                hero.sprite.x--
            }
            if (hero.sprite.y < this.game.world.centerY) {
                hero.sprite.y++
            }
            if ((hero.sprite.y === this.game.world.centerY) && (hero.sprite.x === this.game.world.centerX)) {
                clearInterval(toCenter)
                hero.textBubble = new Dialog(hero, 'outro-' + catchphrase)
                setTimeout(() => {
                    console.log(hero.textBubble.unit.textBubble)
                    hero.textBubble.unit.textBubble.sprite.destroy()
                    this.engine.cinematicMode = false
                    SpawnCreeps(lvl)
                }, 5000)
            }
        }, 4)
    }

    spawnCreeps (lvl) {
        if (lvl < 4) {
            let counter = 0
            const killOrBeKilled = setInterval(() => {
                let enemyX = getRandomInt(1, 1920)
                let enemyY = getRandomInt(1, 1920)
                const x = this.engine.hero.sprite.x

                if (x > enemyX) {
                    enemyX = enemyX - x
                }
                this.engine.createUnitAsEnemy(enemyY, enemyX, this.levels[lvl].enemy[counter % this.levels[lvl].enemy.length])
                counter++
                if (counter === 60) {
                    clearInterval(KillOrBeKilled)
                }
            }, 300)
        } else {
            this.engine.createUnitAsBoss(1520, 1520, SpiderBoss)
            bossAppeared(game)
        }
    }

    bossAppeared (game) {
        let x = 1
        // game.world.scale.setTo(1, 1);
        // debugger;

        this.engine.cinematicMode = true
        game.camera.follow(this.engine.boss.sprite)

        // game.world.
        const zoom = setInterval(() => {
            x++
            game.world.scale.setTo(x, x)
            if (x === 5) {
                clearInterval(zoom)
                game.camera.shake(0.05, 500)
                zoomOut(x, game)
            }
        }, 100)

        const zoomOut = function (x, game) {
            var zoom = setInterval(() => {
                x--;
                game.world.scale.setTo(x, x);
                if (x === 1 ) {
                    game.camera.shake(0.05, 500);
                    clearInterval(zoom);
                    game.camera.follow(engine.hero.sprite);
                    engine.cinematicMode = false;
                };
            }, 100);
        }
    }

    
    designLevel (lvl, heroPos) {
        this.engine.setBackgroundTexture('bricks')
        initInfoBars()
        renderMuteButton()
        this.engine.createUnitAsHero(this.game.world.centerX, this.game.world.centerY, Marine)

        createToolBar()

        // engine.createUnitAsEnemy(50, 50, Zombie);
        this.engine.createUnitAsEnemy(50, 600, Spider)
        // engine.createUnitAsEnemy(600, 50, PixelSpider);
        // engine.createUnitAsEnemy(600, 600, Troll);
        this.engine.cinematicMode = true

        this.levels = [
            {},
            {
                'name': 'first',
                'enemy': [Zombie, Spider, Zombie]
            },
            {
                'name': 'second',
                'enemy': [Roach, Spider, Roach]
            },
            {
                'name': 'third',
                'enemy': [Roach, Zombie, Spider]
            },
            {
                'name': 'boss',
                'enemy': [SpiderBoss]
            }
        ]


        StartGame(engine.hero, lvl)

  // 	for (i = 0; i < 10; i++) {
 	// 	for (j = 0; j < 5; j++) {
 	// 		engine.createUnitAsEnemy(i * 50, j * 50, Zombie);
 	// 	}
 	// }

}



}

