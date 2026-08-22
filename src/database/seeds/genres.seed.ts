import { DataSource } from 'typeorm'
import { Genre } from '../entities/genre.entity'

export const genresSeed = [
  // Hip-Hop / Rap
  { name: 'Hip-Hop', slug: 'hip-hop' },
  { name: 'Rap', slug: 'rap' },
  { name: 'Trap', slug: 'trap' },
  { name: 'Drill', slug: 'drill' },
  { name: 'Cloud Rap', slug: 'cloud-rap' },
  { name: 'Emo Rap', slug: 'emo-rap' },
  { name: 'Alternative Rap', slug: 'alternative-rap' },
  { name: 'Underground Rap', slug: 'underground-rap' },
  { name: 'Hardcore Hip-Hop', slug: 'hardcore-hip-hop' },
  { name: 'Boom Bap', slug: 'boom-bap' },
  { name: 'Conscious Hip-Hop', slug: 'conscious-hip-hop' },
  { name: 'Lo-Fi Hip-Hop', slug: 'lo-fi-hip-hop' },
  { name: 'Abstract Hip-Hop', slug: 'abstract-hip-hop' },
  { name: 'Experimental Hip-Hop', slug: 'experimental-hip-hop' },
  { name: 'Jazz Rap', slug: 'jazz-rap' },
  { name: 'Horrorcore', slug: 'horrorcore' },
  { name: 'Gangsta Rap', slug: 'gangsta-rap' },
  { name: 'Crunk', slug: 'crunk' },
  { name: 'Grime', slug: 'grime' },
  { name: 'UK Drill', slug: 'uk-drill' },
  { name: 'Jersey Club', slug: 'jersey-club' },
  { name: 'Phonk', slug: 'phonk' },
  { name: 'Memphis Rap', slug: 'memphis-rap' },
  { name: 'Rage', slug: 'rage' },
  { name: 'PluggnB', slug: 'plugg-rnb' },
  { name: 'Plugg', slug: 'plugg' },
  { name: 'Sigilkore', slug: 'sigilkore' },

  // R&B / Soul
  { name: 'R&B', slug: 'rnb' },
  { name: 'Alternative R&B', slug: 'alternative-rnb' },
  { name: 'Neo Soul', slug: 'neo-soul' },
  { name: 'Soul', slug: 'soul' },
  { name: 'Contemporary R&B', slug: 'contemporary-rnb' },
  { name: 'Soul Jazz', slug: 'soul-jazz' },
  { name: 'Funk', slug: 'funk' },
  { name: 'P-Funk', slug: 'p-funk' },
  { name: 'Quiet Storm', slug: 'quiet-storm' },

  // Afrobeats / African
  { name: 'Afrobeats', slug: 'afrobeats' },
  { name: 'Afro Pop', slug: 'afro-pop' },
  { name: 'Afro Soul', slug: 'afro-soul' },
  { name: 'Afro R&B', slug: 'afro-rnb' },
  { name: 'Amapiano', slug: 'amapiano' },
  { name: 'Afro House', slug: 'afro-house' },
  { name: 'Afro Tech', slug: 'afro-tech' },
  { name: 'Afro Deep', slug: 'afro-deep' },
  { name: 'Gqom', slug: 'gqom' },
  { name: 'Kuduro', slug: 'kuduro' },
  { name: 'Kizomba', slug: 'kizomba' },
  { name: 'Semba', slug: 'semba' },
  { name: 'Zouk', slug: 'zouk' },
  { name: 'Soukous', slug: 'soukous' },
  { name: 'Highlife', slug: 'highlife' },
  { name: 'Makossa', slug: 'makossa' },
  { name: 'Mbalax', slug: 'mbalax' },
  { name: 'Fuji', slug: 'fuji' },
  { name: 'Afrobeat', slug: 'afrobeat' },

  // Pop
  { name: 'Pop', slug: 'pop' },
  { name: 'Indie Pop', slug: 'indie-pop' },
  { name: 'Alternative Pop', slug: 'alternative-pop' },
  { name: 'Dream Pop', slug: 'dream-pop' },
  { name: 'Hyperpop', slug: 'hyperpop' },
  { name: 'Bedroom Pop', slug: 'bedroom-pop' },
  { name: 'Electropop', slug: 'electropop' },
  { name: 'Synthpop', slug: 'synthpop' },
  { name: 'Dark Pop', slug: 'dark-pop' },
  { name: 'Art Pop', slug: 'art-pop' },
  { name: 'Experimental Pop', slug: 'experimental-pop' },

  // Rock
  { name: 'Rock', slug: 'rock' },
  { name: 'Alternative Rock', slug: 'alternative-rock' },
  { name: 'Indie Rock', slug: 'indie-rock' },
  { name: 'Hard Rock', slug: 'hard-rock' },
  { name: 'Garage Rock', slug: 'garage-rock' },
  { name: 'Post-Rock', slug: 'post-rock' },
  { name: 'Punk Rock', slug: 'punk-rock' },
  { name: 'Pop Punk', slug: 'pop-punk' },
  { name: 'Emo', slug: 'emo' },
  { name: 'Post-Punk', slug: 'post-punk' },
  { name: 'Shoegaze', slug: 'shoegaze' },
  { name: 'Noise Rock', slug: 'noise-rock' },
  { name: 'Grunge', slug: 'grunge' },

  // Metal
  { name: 'Metal', slug: 'metal' },
  { name: 'Heavy Metal', slug: 'heavy-metal' },
  { name: 'Death Metal', slug: 'death-metal' },
  { name: 'Black Metal', slug: 'black-metal' },
  { name: 'Doom Metal', slug: 'doom-metal' },
  { name: 'Thrash Metal', slug: 'thrash-metal' },
  { name: 'Metalcore', slug: 'metalcore' },
  { name: 'Deathcore', slug: 'deathcore' },
  { name: 'Nu Metal', slug: 'nu-metal' },
  { name: 'Post-Metal', slug: 'post-metal' },
  { name: 'Industrial Metal', slug: 'industrial-metal' },

  // Electronic
  { name: 'Electronic', slug: 'electronic' },
  { name: 'EDM', slug: 'edm' },
  { name: 'House', slug: 'house' },
  { name: 'Deep House', slug: 'deep-house' },
  { name: 'Tech House', slug: 'tech-house' },
  { name: 'Progressive House', slug: 'progressive-house' },
  { name: 'Future House', slug: 'future-house' },
  { name: 'Techno', slug: 'techno' },
  { name: 'Minimal Techno', slug: 'minimal-techno' },
  { name: 'Trance', slug: 'trance' },
  { name: 'Drum & Bass', slug: 'drum-and-bass' },
  { name: 'Liquid Drum & Bass', slug: 'liquid-drum-and-bass' },
  { name: 'Dubstep', slug: 'dubstep' },
  { name: 'Future Bass', slug: 'future-bass' },
  { name: 'Breakbeat', slug: 'breakbeat' },
  { name: 'UK Garage', slug: 'uk-garage' },
  { name: 'Ambient', slug: 'ambient' },
  { name: 'Dark Ambient', slug: 'dark-ambient' },
  { name: 'Downtempo', slug: 'downtempo' },
  { name: 'IDM', slug: 'idm' },
  { name: 'Vaporwave', slug: 'vaporwave' },
  { name: 'Synthwave', slug: 'synthwave' },
  { name: 'Darkwave', slug: 'darkwave' },

  // Latin
  { name: 'Reggaeton', slug: 'reggaeton' },
  { name: 'Latin Trap', slug: 'latin-trap' },
  { name: 'Latin Pop', slug: 'latin-pop' },
  { name: 'Salsa', slug: 'salsa' },
  { name: 'Bachata', slug: 'bachata' },
  { name: 'Merengue', slug: 'merengue' },
  { name: 'Cumbia', slug: 'cumbia' },
  { name: 'Dancehall', slug: 'dancehall' },
  { name: 'Reggae', slug: 'reggae' },
  { name: 'Dub', slug: 'dub' },

  // Lo-Fi / Experimental
  { name: 'Lo-Fi', slug: 'lo-fi' },
  { name: 'Lo-Fi Rock', slug: 'lo-fi-rock' },
  { name: 'Lo-Fi Soul', slug: 'lo-fi-soul' },
  { name: 'Experimental', slug: 'experimental' },
  { name: 'Noise', slug: 'noise' },
  { name: 'Drone', slug: 'drone' },
  { name: 'Glitch', slug: 'glitch' },
  { name: 'Industrial', slug: 'industrial' },

  // Jazz / Blues
  { name: 'Jazz', slug: 'jazz' },
  { name: 'Smooth Jazz', slug: 'smooth-jazz' },
  { name: 'Jazz Fusion', slug: 'jazz-fusion' },
  { name: 'Free Jazz', slug: 'free-jazz' },
  { name: 'Blues', slug: 'blues' },
  { name: 'Blues Rock', slug: 'blues-rock' },

  // Country / Folk
  { name: 'Country', slug: 'country' },
  { name: 'Indie Folk', slug: 'indie-folk' },
  { name: 'Folk', slug: 'folk' },
  { name: 'Acoustic', slug: 'acoustic' },
  { name: 'Singer-Songwriter', slug: 'singer-songwriter' },

  // Gospel / Spiritual
  { name: 'Gospel', slug: 'gospel' },
  { name: 'Contemporary Gospel', slug: 'contemporary-gospel' },
  { name: 'Christian Hip-Hop', slug: 'christian-hip-hop' },
  { name: 'Christian Rock', slug: 'christian-rock' },

  // Outros
  { name: 'Classical', slug: 'classical' },
  { name: 'Opera', slug: 'opera' },
  { name: 'Soundtrack', slug: 'soundtrack' },
  { name: 'Instrumental', slug: 'instrumental' },
  { name: 'Spoken Word', slug: 'spoken-word' },
  { name: 'Comedy', slug: 'comedy' },
  { name: 'Podcast', slug: 'podcast' },
]

export async function seedGenres(dataSource: DataSource) {
  const repository = dataSource.getRepository(Genre)

  for (const genre of genresSeed) {
    const existing = await repository.findOne({
      where: { slug: genre.slug },
    })

    if (!existing) {
      await repository.save(
        repository.create(genre),
      )
    }
  }

  console.log(
    `${genresSeed.length} gêneros processados`,
  )
}