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
const mapDBPlaylistToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

module.exports = {
  mapDBAlbumsToModel, mapDBSongToModel, mapDBSongsToModel, mapDBPlaylistToModel,
};
