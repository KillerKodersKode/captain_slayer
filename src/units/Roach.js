import Unit from '.'

export default class Roach extends Unit {
    constructor (x, y) {
        super(x, y, 'roach', {
            speed: 200
        })
    }
}
