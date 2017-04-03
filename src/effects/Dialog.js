// Represents text message rendered over unit's head.
export default class Dialog {
    constructor (unit, phrase) {
        this.unit = unit
        this.sprite = createSpriteByName(unit.sprite.x, unit.sprite.y - 50, phrase)
    }

}
