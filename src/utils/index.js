/* eslint-disable camelcase */
// Map Album
const mapDBAlbumsToModel = ({
  id, name, year, songs,
}) => ({
  id,
  name,
  year,
  songs,
});

// Map Song
const mapDBSongToModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const mapDBSongsToModel = ({ song_id, song_title, song_performer }) => ({
  id: song_id,
  title: song_title,
  performer: song_performer,
});

// Map Playlist
const mapDBPlaylistToModel = ({ id, name, username }) => ({
  id,
  name,
  username,
});

// Map Playlist songs by playlist id
const mapDBPlaylistSongsToModel = (rows) => {
  const { id, name, username } = rows[0];
  const songs = rows
    .filter((row) => row.song_id)
    .map((row) => ({
      id: row.song_id,
      title: row.song_title,
      performer: row.song_performer,
    }));

  return {
    id,
    name,
    username,
    songs,
  };
};

// Map Playlist song activities by playlist id
const mapDBPlaylistSongActivitiesToModel = (rows) => {
  const { id: playlistId } = rows[0];
  const activities = rows
    .filter((row) => row.song_id)
    .map((row) => ({
      username: row.username,
      title: row.title,
      action: row.action,
      time: row.time,
    }));

  return {
    playlistId,
    activities,
  };
};

module.exports = {
  mapDBAlbumsToModel,
  mapDBSongToModel,
  mapDBSongsToModel,
  mapDBPlaylistToModel,
  mapDBPlaylistSongsToModel,
  mapDBPlaylistSongActivitiesToModel,
};
