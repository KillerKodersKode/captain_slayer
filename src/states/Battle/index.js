import Phaser from 'phaser'
import BattleEngine from '../../engine'
import MuteButton from './MuteButton'
import Toolbar from './Toolbar'
import HpBars from './HpBars'
import ScoreInfo from './ScoreInfo'
import DebugInfo from './DebugInfo'

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
        this.mute = new MuteButton(this.game, this)
        this.toolbar = new Toolbar(this.game)
        this.hpBars = new HpBars(this.game)
        this.scoreInfo = new ScoreInfo(this.game)
        this.debugInfo = new DebugInfo(this.game)
    }

    update () {
        this.engine.update()
        // this.game.engine.length++
    }

    render () {
        const game = this.game
        const engine = this.engine
        game.engine = engine

        // this.engine.infoBars.renderGameState()

        this.mute.render()
        this.toolbar.render()
        this.hpBars.render()
        this.scoreInfo.render()
        this.debugInfo.render()
    }

}
