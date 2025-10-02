class StateStore {
    constructor() {
        this.state = {
            currentTrack: null,
            isPlaying: false,
            queue: [],
            queueIndex: 0,
            volume: 0.7,
            shuffle: false,
            repeat: 'off',
            playlists: this.loadPlaylists(),
            likedSongs: this.loadLikedSongs(),
            currentView: 'home',
            searchQuery: ''
        };
        this.listeners = [];
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }

    setState(updates) {
        this.state = { ...this.state, ...updates };
        this.notify();
    }

    getState() {
        return this.state;
    }

    setCurrentTrack(track) {
        this.setState({ currentTrack: track });
    }

    setPlaying(isPlaying) {
        this.setState({ isPlaying });
    }

    setQueue(queue, startIndex = 0) {
        this.setState({ queue, queueIndex: startIndex });
    }

    nextTrack() {
        const { queue, queueIndex, repeat, shuffle } = this.state;
        if (queue.length === 0) return null;

        let nextIndex;
        if (repeat === 'one') {
            nextIndex = queueIndex;
        } else if (shuffle) {
            nextIndex = Math.floor(Math.random() * queue.length);
        } else {
            nextIndex = queueIndex + 1;
            if (nextIndex >= queue.length) {
                if (repeat === 'all') {
                    nextIndex = 0;
                } else {
                    return null;
                }
            }
        }

        this.setState({ queueIndex: nextIndex });
        return queue[nextIndex];
    }

    previousTrack() {
        const { queue, queueIndex } = this.state;
        if (queue.length === 0) return null;

        const prevIndex = queueIndex > 0 ? queueIndex - 1 : queue.length - 1;
        this.setState({ queueIndex: prevIndex });
        return queue[prevIndex];
    }

    toggleShuffle() {
        this.setState({ shuffle: !this.state.shuffle });
    }

    cycleRepeat() {
        const modes = ['off', 'all', 'one'];
        const currentIndex = modes.indexOf(this.state.repeat);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        this.setState({ repeat: nextMode });
    }

    addPlaylist(name) {
        const newPlaylist = {
            id: Date.now().toString(),
            name,
            tracks: [],
            createdAt: new Date().toISOString()
        };
        const playlists = [...this.state.playlists, newPlaylist];
        this.setState({ playlists });
        this.savePlaylists(playlists);
        return newPlaylist;
    }

    addToPlaylist(playlistId, trackId) {
        const playlists = this.state.playlists.map(p => {
            if (p.id === playlistId && !p.tracks.includes(trackId)) {
                return { ...p, tracks: [...p.tracks, trackId] };
            }
            return p;
        });
        this.setState({ playlists });
        this.savePlaylists(playlists);
    }

    toggleLike(trackId) {
        const likedSongs = this.state.likedSongs.includes(trackId)
            ? this.state.likedSongs.filter(id => id !== trackId)
            : [...this.state.likedSongs, trackId];
        this.setState({ likedSongs });
        this.saveLikedSongs(likedSongs);
    }

    isLiked(trackId) {
        return this.state.likedSongs.includes(trackId);
    }

    savePlaylists(playlists) {
        localStorage.setItem('spotify_playlists', JSON.stringify(playlists));
    }

    loadPlaylists() {
        try {
            const saved = localStorage.getItem('spotify_playlists');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveLikedSongs(likedSongs) {
        localStorage.setItem('spotify_liked', JSON.stringify(likedSongs));
    }

    loadLikedSongs() {
        try {
            const saved = localStorage.getItem('spotify_liked');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    setView(view) {
        this.setState({ currentView: view });
    }

    setSearchQuery(query) {
        this.setState({ searchQuery: query });
    }
}

export default new StateStore();
