export const artists = new Map([
    ['1', { id: '1', name: 'The Midnight Collective' }],
    ['2', { id: '2', name: 'Luna Rivers' }],
    ['3', { id: '3', name: 'Echo & The Waves' }],
    ['4', { id: '4', name: 'Stellar Dreams' }],
    ['5', { id: '5', name: 'Violet Skies' }]
]);

export const albums = new Map([
    ['1', { id: '1', title: 'Neon Nights', artistId: '1', image: 'assets/images/music_album_cover_vi_d386f061.jpg' }],
    ['2', { id: '2', title: 'Ocean Waves', artistId: '2', image: 'assets/images/music_album_cover_vi_dd6d07fa.jpg' }],
    ['3', { id: '3', title: 'Electric Dreams', artistId: '3', image: 'assets/images/music_album_cover_vi_d3d1a69b.jpg' }],
    ['4', { id: '4', title: 'Starlight Symphony', artistId: '4', image: 'assets/images/music_album_cover_vi_d2af3c5c.jpg' }],
    ['5', { id: '5', title: 'Midnight Hour', artistId: '1', image: 'assets/images/music_album_cover_vi_1ec5080b.jpg' }],
    ['6', { id: '6', title: 'Crystal Waves', artistId: '5', image: 'assets/images/music_album_cover_vi_c5e4af8c.jpg' }],
    ['7', { id: '7', title: 'Summer Breeze', artistId: '2', image: 'assets/images/music_album_cover_vi_71812d4d.jpg' }],
    ['8', { id: '8', title: 'Urban Lights', artistId: '3', image: 'assets/images/music_album_cover_vi_15ca547e.jpg' }],
    ['9', { id: '9', title: 'Cosmic Journey', artistId: '4', image: 'assets/images/music_album_cover_vi_907a0e1f.jpg' }],
    ['10', { id: '10', title: 'Purple Rain', artistId: '5', image: 'assets/images/music_album_cover_vi_6bb0c9a1.jpg' }]
]);

export const songs = [
    { id: '1', title: 'Neon Lights', artistId: '1', albumId: '1', duration: '3:45', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: '2', title: 'City Dreams', artistId: '1', albumId: '1', duration: '4:12', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '3', title: 'Ocean Breeze', artistId: '2', albumId: '2', duration: '3:58', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '4', title: 'Waves of Time', artistId: '2', albumId: '2', duration: '4:30', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '5', title: 'Electric Pulse', artistId: '3', albumId: '3', duration: '3:22', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '6', title: 'Echo Chamber', artistId: '3', albumId: '3', duration: '4:05', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: '7', title: 'Starlight', artistId: '4', albumId: '4', duration: '3:50', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: '8', title: 'Cosmic Dance', artistId: '4', albumId: '4', duration: '4:18', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: '9', title: 'Midnight Drive', artistId: '1', albumId: '5', duration: '3:35', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: '10', title: 'Dark Hour', artistId: '1', albumId: '5', duration: '4:00', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' },
    { id: '11', title: 'Crystal Clear', artistId: '5', albumId: '6', duration: '3:42', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: '12', title: 'Wave Rider', artistId: '5', albumId: '6', duration: '4:15', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: '13', title: 'Summer Nights', artistId: '2', albumId: '7', duration: '3:28', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    { id: '14', title: 'Gentle Breeze', artistId: '2', albumId: '7', duration: '4:08', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
    { id: '15', title: 'City Pulse', artistId: '3', albumId: '8', duration: '3:55', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
    { id: '16', title: 'Urban Soul', artistId: '3', albumId: '8', duration: '4:20', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' },
    { id: '17', title: 'Cosmic Waves', artistId: '4', albumId: '9', duration: '3:38', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3' },
    { id: '18', title: 'Journey Home', artistId: '4', albumId: '9', duration: '4:25', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
    { id: '19', title: 'Purple Dreams', artistId: '5', albumId: '10', duration: '3:48', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' },
    { id: '20', title: 'Rainbow Sky', artistId: '5', albumId: '10', duration: '4:10', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' }
];
