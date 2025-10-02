import stateStore from './StateStore.js';

class AudioController {
    constructor() {
        this.audio = document.getElementById('audioPlayer');
        this.audio.volume = 0.7;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.audio.addEventListener('ended', () => this.handleEnded());
        this.audio.addEventListener('timeupdate', () => this.handleTimeUpdate());
        this.audio.addEventListener('loadedmetadata', () => this.handleLoadedMetadata());
        this.audio.addEventListener('play', () => stateStore.setPlaying(true));
        this.audio.addEventListener('pause', () => stateStore.setPlaying(false));
    }

    play(track) {
        if (track) {
            stateStore.setCurrentTrack(track);
            this.audio.src = track.src;
        }
        this.audio.play().catch(err => console.log('Play error:', err));
    }

    pause() {
        this.audio.pause();
    }

    toggle() {
        if (this.audio.paused) {
            this.audio.play().catch(err => console.log('Play error:', err));
        } else {
            this.audio.pause();
        }
    }

    next() {
        const nextTrack = stateStore.nextTrack();
        if (nextTrack) {
            this.play(nextTrack);
        } else {
            this.pause();
        }
    }

    previous() {
        if (this.audio.currentTime > 3) {
            this.audio.currentTime = 0;
        } else {
            const prevTrack = stateStore.previousTrack();
            if (prevTrack) {
                this.play(prevTrack);
            }
        }
    }

    seek(time) {
        this.audio.currentTime = time;
    }

    setVolume(volume) {
        this.audio.volume = volume;
        stateStore.setState({ volume });
    }

    handleEnded() {
        const { repeat } = stateStore.getState();
        if (repeat === 'one') {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.next();
        }
    }

    handleTimeUpdate() {
        const currentTime = this.audio.currentTime;
        const duration = this.audio.duration;
        if (duration) {
            const progress = (currentTime / duration) * 100;
            this.updateProgress(progress, currentTime, duration);
        }
    }

    handleLoadedMetadata() {
        const duration = this.audio.duration;
        document.getElementById('totalTime').textContent = this.formatTime(duration);
    }

    updateProgress(progress, currentTime, duration) {
        const progressFill = document.getElementById('progressFill');
        const currentTimeEl = document.getElementById('currentTime');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (currentTimeEl) {
            currentTimeEl.textContent = this.formatTime(currentTime);
        }
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    getCurrentTime() {
        return this.audio.currentTime;
    }

    getDuration() {
        return this.audio.duration;
    }
}

export default new AudioController();
