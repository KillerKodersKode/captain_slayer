export default class SoundManager {
    constructor (engine, game, config) {
        this.engine = engine
        this.game = game
        this.config = config
        this.soundList = []
    }

    loadSounds () {
        this.config.map((sound) => {
            this.game.load.audio(sound.key, sound.path)
        })
    }

    renderSounds () {
        this.config.map(function (sound) {
            const tune = this.game.add.audio(sound.key)
            this.soundList.push(tune)
        })
        return this.soundList
    }

    playSound (sound, volume) {
        const tune
        let i = 0
        while (!tune && (i < this.soundList.length)) {
            if (this.soundList[i].key === sound) tune = soundList[i];
            i++;
        }
        tune.play()
    }

    toggleMuteSounds () {
    if (!game.sound.mute) {
        game.sound.mute = true;
        
    } else {
        game.sound.mute = false;
    }
    }

    stopSound (sound) {
    var tune;
    var i=0; 
    while (!tune && (i < soundList.length)) {
        if (soundList[i].key === sound) tune = soundList[i];
        i++;
    }
    tune.stop();
    }

    loopSound (sound) {
    var tune;
    var i = 0;
    while(!tune && (i < soundList.length)) {
        if (soundList[i].key === sound) tune = soundList[i];
        i++;
    }
    tune.loopFull(0.3);
    }


}


