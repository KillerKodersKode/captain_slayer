/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

import Marine from '../units/Marine'
import Spider from '../units/Spider'
import Zombie from '../units/Zombie'
import Roach from '../units/Roach'
import Scorpio from '../units/Scorpio'
import Troll from '../units/Troll'
import PixelSpider from '../units/PixelSpider'
import SpiderBoss from '../units/SpiderBoss'

export default class extends Phaser.State {
    init () {}
    preload () {}

    create () {
        const bannerText = 'Phaser + ES6 + Webpack'
        let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
        banner.font = 'Bangers'
        banner.padding.set(10, 16)
        banner.fontSize = 40
        banner.fill = '#77BFA3'
        banner.smoothed = false
        banner.anchor.setTo(0.5)

        this.mushroom = new Mushroom({
            game: this,
            x: this.world.centerX,
            y: this.world.centerY,
            asset: 'mushroom'
        })

        this.game.add.existing(this.mushroom)

        let units = [
            new Marine(),
            new Spider(),
            new Zombie(),
            new Roach(),
            new Scorpio(),
            new PixelSpider(),
            new SpiderBoss(),
            new Troll()
        ]
        console.log('new units:', units)
    }

    render () {
        if (__DEV__) {
            this.game.debug.spriteInfo(this.mushroom, 32, 32)
        }
    }
}
