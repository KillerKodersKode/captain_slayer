import Phaser from 'phaser'
import WebFont from 'webfontloader'


export default class extends Phaser.State {
    init () {
        this.game.engine.init()
        this.game.engine.levelID = 1
    }

    create () {
        const engine = this.game.engine
        engine.physics.init()
        // designLevel(levelID, {'y': 960, 'x': 50});
        engine.controls.init()
        engine.soundsManager.renderSounds()
        // renderMuteButton();

        engine.length = 0
        // renderMuteButton();
        // setInterval(renderFPSToConsole, 1000);
    }

    update () {
        this.game.engine.performActivityForObjects()
        this.game.engine.length++
    }

    render () {
        this.game.engine.enemies.forEach((enemy) => {
            if (enemy.hp < enemy.hpMax) {
                renderHpBarOverUnit(enemy)
            }
        })

        renderHpBarOnScreen(this.game.engine.hero)
        renderGameInfo()
        renderGameState()
    }
}
