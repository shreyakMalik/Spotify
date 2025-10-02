import stateStore from './StateStore.js';
import { songs, albums, artists } from '../data/songs.js';
import audioController from './AudioController.js';

class UIRenderer {
    renderHome() {
        const contentArea = document.getElementById('contentArea');
        
        const featuredAlbums = [...albums.values()].slice(0, 6);
        const popularSongs = songs.slice(0, 6);
        
        contentArea.innerHTML = `
            <section class="home-section">
                <div class="section-header">
                    <h2 class="section-title">Featured Albums</h2>
                </div>
                <div class="cards-grid">
                    ${featuredAlbums.map(album => this.renderAlbumCard(album)).join('')}
                </div>
            </section>
            
            <section class="home-section">
                <div class="section-header">
                    <h2 class="section-title">Popular Songs</h2>
                </div>
                <div class="cards-grid">
                    ${popularSongs.map(song => this.renderSongCard(song)).join('')}
                </div>
            </section>
        `;
        
        this.attachCardListeners();
    }

    renderSearch(query) {
        const contentArea = document.getElementById('contentArea');
        
        if (!query) {
            contentArea.innerHTML = `
                <div style="text-align: center; padding: 48px; color: var(--text-subdued);">
                    <h2 style="font-size: 2rem; margin-bottom: 16px;">Search for music</h2>
                    <p>Find your favorite songs, albums, and artists</p>
                </div>
            `;
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matchedSongs = songs.filter(song => 
            song.title.toLowerCase().includes(lowerQuery) ||
            artists.get(song.artistId)?.name.toLowerCase().includes(lowerQuery)
        );

        if (matchedSongs.length === 0) {
            contentArea.innerHTML = `
                <div style="text-align: center; padding: 48px; color: var(--text-subdued);">
                    <h2 style="font-size: 1.5rem;">No results found</h2>
                    <p>Try searching for something else</p>
                </div>
            `;
            return;
        }

        contentArea.innerHTML = `
            <section class="search-section">
                <h2 class="section-title">Songs</h2>
                <div class="track-list">
                    ${matchedSongs.map((song, index) => this.renderTrackItem(song, index + 1)).join('')}
                </div>
            </section>
        `;
        
        this.attachTrackListeners();
    }

    renderLibrary() {
        const contentArea = document.getElementById('contentArea');
        const { likedSongs } = stateStore.getState();
        
        const likedTracks = songs.filter(song => likedSongs.includes(song.id));
        
        contentArea.innerHTML = `
            <section class="library-section">
                <h2 class="section-title">Liked Songs</h2>
                ${likedTracks.length === 0 ? 
                    '<p style="color: var(--text-subdued); padding: 24px;">No liked songs yet</p>' :
                    `<div class="track-list">
                        ${likedTracks.map((song, index) => this.renderTrackItem(song, index + 1)).join('')}
                    </div>`
                }
            </section>
            
            <section class="library-section" style="margin-top: 48px;">
                <h2 class="section-title">All Songs</h2>
                <div class="track-list">
                    ${songs.map((song, index) => this.renderTrackItem(song, index + 1)).join('')}
                </div>
            </section>
        `;
        
        this.attachTrackListeners();
    }

    renderAlbumCard(album) {
        return `
            <div class="card" data-album-id="${album.id}">
                <div class="card-image">
                    <img src="${album.image}" alt="${album.title}">
                    <button class="play-overlay" data-album-id="${album.id}">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
                <h3 class="card-title">${album.title}</h3>
                <p class="card-subtitle">${artists.get(album.artistId)?.name || 'Unknown Artist'}</p>
            </div>
        `;
    }

    renderSongCard(song) {
        const artist = artists.get(song.artistId);
        const album = albums.get(song.albumId);
        
        return `
            <div class="card" data-song-id="${song.id}">
                <div class="card-image">
                    <img src="${album?.image || 'assets/images/default.jpg'}" alt="${song.title}">
                    <button class="play-overlay" data-song-id="${song.id}">
                        <svg viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
                <h3 class="card-title">${song.title}</h3>
                <p class="card-subtitle">${artist?.name || 'Unknown Artist'}</p>
            </div>
        `;
    }

    renderTrackItem(song, number) {
        const artist = artists.get(song.artistId);
        const album = albums.get(song.albumId);
        const { currentTrack, isPlaying } = stateStore.getState();
        const isCurrentTrack = currentTrack?.id === song.id;
        
        return `
            <div class="track-item ${isCurrentTrack ? 'playing' : ''}" data-song-id="${song.id}">
                <div class="track-number">
                    <span>${number}</span>
                    <button class="track-play-btn">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path fill="currentColor" d="${isCurrentTrack && isPlaying ? 'M6 4h4v16H6V4zm8 0h4v16h-4V4z' : 'M8 5v14l11-7z'}"/>
                        </svg>
                    </button>
                </div>
                <div class="track-info">
                    <img src="${album?.image || 'assets/images/default.jpg'}" alt="${song.title}">
                    <div class="track-text">
                        <div class="track-text-title">${song.title}</div>
                        <div class="track-text-artist">${artist?.name || 'Unknown'}</div>
                    </div>
                </div>
                <div class="track-duration">${song.duration}</div>
            </div>
        `;
    }

    attachCardListeners() {
        document.querySelectorAll('[data-song-id]').forEach(el => {
            const playBtn = el.querySelector('.play-overlay');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const songId = playBtn.getAttribute('data-song-id');
                    this.playSong(songId);
                });
            }
        });

        document.querySelectorAll('[data-album-id]').forEach(el => {
            const playBtn = el.querySelector('.play-overlay');
            if (playBtn) {
                playBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const albumId = playBtn.getAttribute('data-album-id');
                    this.playAlbum(albumId);
                });
            }
        });
    }

    attachTrackListeners() {
        document.querySelectorAll('.track-item').forEach(el => {
            el.addEventListener('click', () => {
                const songId = el.getAttribute('data-song-id');
                this.playSong(songId);
            });
        });
    }

    playSong(songId) {
        const song = songs.find(s => s.id === songId);
        if (song) {
            stateStore.setQueue(songs, songs.indexOf(song));
            audioController.play(song);
        }
    }

    playAlbum(albumId) {
        const albumSongs = songs.filter(s => s.albumId === albumId);
        if (albumSongs.length > 0) {
            stateStore.setQueue(albumSongs, 0);
            audioController.play(albumSongs[0]);
        }
    }

    updatePlayerUI() {
        const { currentTrack, isPlaying } = stateStore.getState();
        
        const playBtn = document.getElementById('playBtn');
        const trackName = document.getElementById('playerTrackName');
        const trackArtist = document.getElementById('playerTrackArtist');
        const trackImage = document.getElementById('playerTrackImage');
        
        if (currentTrack) {
            const artist = artists.get(currentTrack.artistId);
            const album = albums.get(currentTrack.albumId);
            
            trackName.textContent = currentTrack.title;
            trackArtist.textContent = artist?.name || 'Unknown Artist';
            trackImage.src = album?.image || '';
            trackImage.style.display = album?.image ? 'block' : 'none';
            
            playBtn.innerHTML = isPlaying ?
                '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>' :
                '<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>';
        } else {
            trackName.textContent = 'Select a song';
            trackArtist.textContent = '';
            trackImage.style.display = 'none';
        }
    }

    updateLikeButton() {
        const { currentTrack } = stateStore.getState();
        const likeBtn = document.getElementById('likeBtn');
        
        if (currentTrack && stateStore.isLiked(currentTrack.id)) {
            likeBtn.classList.add('liked');
        } else {
            likeBtn.classList.remove('liked');
        }
    }

    renderPlaylists() {
        const { playlists } = stateStore.getState();
        const playlistsList = document.getElementById('playlistsList');
        
        playlistsList.innerHTML = playlists.map(playlist => `
            <div class="playlist-item" data-playlist-id="${playlist.id}">
                ${playlist.name}
            </div>
        `).join('');
    }
}

export default new UIRenderer();
