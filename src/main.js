import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './states/Boot'
import SplashState from './states/Splash'
import GameState from './states/Game'
import MenuState from './states/Menu'
import TangramState from './states/Tangram'
import BrifState from './states/Brif'
import BattleState from './states/Battle'

import config from './config'

import Engine from './engine'

class Game extends Phaser.Game {

    constructor() {
        const docElement = document.documentElement
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight

        super(width, height, Phaser.CANVAS, 'content', null)

        this.state.add('Boot', BootState, false)
        this.state.add('Splash', SplashState, false)
        this.state.add('Game', GameState, false)

        this.state.add('Menu', MenuState, false)
        this.state.add('Tangram', TangramState, false)
        this.state.add('Brif', BrifState, false)
        this.state.add('Battle', BattleState, false)

        // Maybe instance of Engine should be created another way.
        this.engine = new Engine(this, width, height)

        // this.state.start('Game')
        this.state.start('Menu')
    }
}

window.game = new Game()
