import Phaser from 'phaser'
import WebFont from 'webfontloader'


import BattleEngine from '../engine'


export default class extends Phaser.State {
    init () {
        this.engine = new BattleEngine(this.game)
    }

    preload () {
        this.game.loadResources()
        this.game.time.advancedTiming = true
    }

    create () {
        this.engine.create()
        this.engine.startLevel(this.game.getCurrentLevel())

        // engine.length = 0
        this.createMuteButton()
        this.createToolBar()
    }

    update () {
        this.engine.update()
        // this.game.engine.length++
    }

    render () {
        const game = this.game
        const engine = this.engine
        game.engine = engine

        engine.debugger.renderGameInfo()

        engine.enemies.forEach((enemy) => {
            if (enemy.hp < enemy.hpMax) {
                engine.infoBars.renderHpBarOverUnit(enemy)
            }
        })

        engine.infoBars.renderHpBarOnScreen(engine.hero)

        // this.engine.infoBars.renderGameState()

        if (engine.displayScore) {
            game.debug.text('Level cleared', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) - 50, '#00ff00', '50px Courier')
            game.debug.text('Total score:' + game.score, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2), '#00ff00', '35px Courier')
            game.debug.text('Shots done:' + engine.shots, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 35, '#00ff00', '35px Courier')
            game.debug.text('Hits done:' + engine.hits, (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 70, '#00ff00', '35px Courier')
            game.debug.text('Accuracy:' + (engine.hits / engine.shots * 100).toFixed(2) + '%', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 105, '#00ff00', '35px Courier')
            game.debug.text('Click to face new enemies!', (game.canvasWidth - 380) / 2, (game.canvasHeight / 2) + 140, '#00ff00', '35px Courier')
        }

        this.renderMuteButton()
        this.renderWeaponsInfo(this.engine.hero)
        this.scoreText.text = this.engine.score ? parseFloat(this.engine.score) : 0
    }

    createMuteButton () {
        this.muteButton = this.game.add.button(50, 50, 'mute_icon', this.game.soundsManager.toggleMuteSounds, this)
        this.muteButton.fixedToCamera = true
    }

    renderMuteButton () {
        this.muteButton.tint = this.game.sound.mute ? 0xdcdcdc : 0xffffff
    }




    createToolBar () {
        const game = this.game
        const toolBarBg = game.texturesManager.createSpriteByName(0, 0, 'toolbar_bg')
        toolBarBg.width = game.width
        toolBarBg.height = game.height
        toolBarBg.fixedToCamera = true

        const style = { font: '34px caveStory', fill: '#ffffff', align: 'center' }
        // engine.length = 0
        // if ((game.hits>0)&& (game.shots > 0)){
        //     engine.scores = (100000000/engine.length * (game.hits/game.shots).toFixed(4)).toFixed(0);
        // } else {
        //     engine.scores = 0;
        // }

        this.leftWeaponText = game.add.text(40, game.height - 70, '', style)
        this.rightWeaponText = game.add.text(game.width - 220, game.height - 70, '', style)
        this.scoreText = game.add.text(game.width / 2 - 60, game.height - 70, '', style)

        this.leftWeaponText.fixedToCamera = true
        this.rightWeaponText.fixedToCamera = true

        this.scoreText.fixedToCamera = true

        const firstWeaponIcon = game.texturesManager.createSpriteByName(40, game.height - 130, game.chosenWeapon1.icon)
        firstWeaponIcon.fixedToCamera = true

        if (game.chosenWeapon2) {
            const secondWeaponIcon = game.texturesManager.createSpriteByName(game.width - 230, game.height - 130, game.chosenWeapon2.icon)
            secondWeaponIcon.fixedToCamera = true
        }
    }

    renderWeaponsInfo (unit) {
        if (unit.weapon1 !== undefined) {
            if (!unit.weapon1.twoHanded) {
                this.leftWeaponText.text = this.getWeaponsInfo(unit.weapon1)
            } else {
                this.leftWeaponText.text = this.getWeaponsInfo(unit.weapon1)
            }
        }
        if (unit.weapon2 !== undefined) {
            this.rightWeaponText.text = this.getWeaponsInfo(unit.weapon2)
        }
    }

    getWeaponsInfo (weapon) {
        // var weaponInfo = weapon.name;
        let weaponInfo = 'Ammo: '
        if (weapon.state === 'RELOAD') {
            weaponInfo = 'RELOADING: '
            weaponInfo += Math.round((1 - weapon.frame / weapon.delayReload) * 100) + '%'
        } else {
            weaponInfo += weapon.requiresAmmo ? ' ' + weapon.ammo + ' / ' + weapon.maxAmmo : ''
        }
        return weaponInfo
    }

}
