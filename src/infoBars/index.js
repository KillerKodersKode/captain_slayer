import Phaser from 'phaser'


export default class InfoBars {
    constructor (engine, game) {
        this.engine = engine
        this.game = game
    }

    init () {
        this.hpBarOverUnitWidth = 25
        this.hpBarOverUnitHeight = 3

        this.hpBarOnScreenWidth = 747
        this.hpBarOnScreenHeight = 9

        this.hpBarOnScreenX = (canvasWidth - this.hpBarOnScreenWidth) / 2
        this.hpBarOnScreenY = this.game.height - 80
    }

    // Compute parameters for rendering HP bar.
    computeHpBar (unit, hpBarWidth) {
        const hpPercent = unit.hp > 0 ? unit.hp / unit.hpMax : 0

        // Get width (in px) of coloured and black parts of HP bar.
        const hpLeftWidth = Math.round(hpPercent * hpBarWidth)
        const blackBarWidth = hpBarWidth - hpLeftWidth

        // Color dynamically changes from green to red.
        const green = Math.round(255 * (hpPercent > 0.5 ? 1 : hpPercent))
        const red = Math.round(255 * (hpPercent > 0.5 ? (1 - hpPercent / 2) : 1))
        const color = 'rgb(' + red + ',' + green + ',0)'

        return {
            color: color,
            coloredPixels: hpLeftWidth,
            blackPixels: blackBarWidth
        }
    }

    renderHpBar (x, y, width, height, bar) {
        this.game.debug.geom(new Phaser.Rectangle(x, y, bar.coloredPixels, height), bar.color, true)
        this.game.debug.geom(new Phaser.Rectangle(x + bar.coloredPixels, y, bar.blackPixels, height), 'black', true)
    }

    renderHpBarOverUnit (unit) {
        const barProps = this.computeHpBar(unit, this.hpBarOverUnitWidth)
        this.renderHpBar(unit.sprite.x - this.hpBarOverUnitWidth / 2, unit.sprite.y, this.hpBarOverUnitWidth, this.hpBarOverUnitHeight, barProps)
    }

    renderHpBarOnScreen (unit) {
        const barProps = this.computeHpBar(unit, this.hpBarOnScreenWidth)
        this.renderHpBar(this.hpBarOnScreenX + this.game.camera.view.x, this.hpBarOnScreenY + this.game.camera.view.y, this.hpBarOverUnitWidth, this.hpBarOnScreenHeight, barProps)
    }

}



var rightWeaponText, leftWeaponText, scoreText;

function createToolBar(){
	var toolBarBg = createSpriteByName(0, 0, 'toolbar_bg');
	toolBarBg.width = game.width;
	toolBarBg.height = game.height;
	toolBarBg.fixedToCamera = true;

	var style = { font: "34px caveStory", fill: "#ffffff", align: "center"};
	engine.length=0;
	if ((game.hits>0)&& (game.shots > 0)){
		engine.scores = (100000000/engine.length * (game.hits/game.shots).toFixed(4)).toFixed(0);
	} else {
		engine.scores = 0;
	}

	leftWeaponText = game.add.text(40, game.height - 70, '', style);
	rightWeaponText = game.add.text(game.width - 220, game.height - 70, '', style);
	scoreText = game.add.text(game.width/2 - 60, game.height - 70, '', style);

	leftWeaponText.fixedToCamera = true;
	rightWeaponText.fixedToCamera = true;

	scoreText.fixedToCamera = true;
	
	var firstWeaponIcon = createSpriteByName(40, game.height - 130, chosenWeapon1.icon);
	firstWeaponIcon.fixedToCamera = true;

	if(chosenWeapon2) {
		var secondWeaponIcon = createSpriteByName(game.width - 230, game.height - 130, chosenWeapon2.icon);
		secondWeaponIcon.fixedToCamera = true;
	}

}





function renderWeaponsInfo(unit) {
	if (unit.weapon1 !== undefined) {
		if (!unit.weapon1.twoHanded) {
			leftWeaponText.text = getWeaponsInfo(unit.weapon1);
		} else {
			leftWeaponText.text = getWeaponsInfo(unit.weapon1);
		}
	}
	if (unit.weapon2 !== undefined) {
		rightWeaponText.text = getWeaponsInfo(unit.weapon2);
	}
}

function getWeaponsInfo(weapon) {
	//var weaponInfo = weapon.name;
	var weaponInfo = 'Ammo: ';
	if (weapon.state == "RELOAD") {
		weaponInfo = "RELOADING: ";
		weaponInfo += Math.round((1 - weapon.frame / weapon.delayReload)*100) + "%";
	} else {
		weaponInfo += weapon.requiresAmmo ? " " + weapon.ammo + " / " + weapon.maxAmmo : "";
	}
	return weaponInfo;
}
