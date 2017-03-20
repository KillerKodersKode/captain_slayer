import Unit from './Unit'

import BlasterPistol from '../weapons/BlasterPistol'
import Uzi from '../weapons/Uzi'


export default class Marine extends Unit {
    constructor(x, y) {
        super(x, y, 'marine_new', {
            speed: 300,
            hpRegen: 0.5 / 60,
            // weapon1: chosenWeapon1.type, weapon2: chosenWeapon2 ? chosenWeapon2.type : undefined
            weapon1: BlasterPistol,
            weapon2: Uzi
        });
        // this.sprite.animations.play('idle', 10, true);
    }
}