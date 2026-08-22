import { User } from './entities/user.entity';
import { Artist } from './entities/artist.entity';
import { Album } from './entities/albums.entity';
import { Track } from './entities/track.entity';
import { Playlist } from './entities/playlist.entity';
import { Like } from './entities/like.entity';
import { PlaybackHistory } from './entities/playback-history.entity';
import { DownloadHistory } from './entities/download-history.entity';
import { ArtistFollower } from './entities/artist-follower.entity';
import { Activity } from './entities/activity.entity';
import { Genre } from './entities/genre.entity';

export const ENTITIES = [
  User,
  Artist,
  Album,
  Track,
  Playlist,
  Like,
  PlaybackHistory,
  DownloadHistory,
  ArtistFollower,
  Activity,
  Genre,
];