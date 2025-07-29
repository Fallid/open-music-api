/* eslint-disable camelcase */
const mapDBAlbumsToModel = ({
  id, name, year, songs,
}) => ({
  id,
  name,
  year,
  songs,
});

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

module.exports = { mapDBAlbumsToModel, mapDBSongToModel, mapDBSongsToModel };
