import Unit from './Unit'

export default class Scorpio extends Unit {
    constructor(x, y) {
        super(x, y, 'scorpio', {
            speed: 250,
            hpMax: 400,
            deathColor: 'yellow'
        });
    }
}