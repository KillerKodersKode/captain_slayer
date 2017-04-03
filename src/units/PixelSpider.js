import Unit from '.'

export default class PixelSpider extends Unit {
    constructor (x, y) {
        super(x, y, 'spider_pixel', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        })
    }
}
