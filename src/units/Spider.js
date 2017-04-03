import Unit from '.'

export default class Spider extends Unit {
    constructor (x, y) {
        super(x, y, 'spider', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        })
    }
}
