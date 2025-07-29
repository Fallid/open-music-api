/* eslint-disable camelcase */
const mapDBAlbumsToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year,
});

const mapDBSongsToModel = ({
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

module.exports = { mapDBAlbumsToModel, mapDBSongsToModel };
