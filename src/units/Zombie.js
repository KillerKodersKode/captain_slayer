import Unit from './Unit'

export default class Zombie extends Unit {
    constructor(x, y) {
        super(x, y, 'zombie', {
            speed: 100,
            deathColor: 'green'
        });
        this.animationSpeed = 5;
    }
}