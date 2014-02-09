require([
  '$views/image#Image'
], function(Image) {
  'use strict';

  var album = function(cover, title) {
	  var album = document.createElement('li');
	  var albumContainer = document.createElement('div');
	  album.className = 'album';
	  albumContainer.className = 'albumContainer';
	  
	  albumContainer.appendChild(cover);
	  albumContainer.appendChild(title);
	  album.appendChild(albumContainer);
	  
	  return album;
  };
  
  var cover = function(album) {
	  var cover = document.createElement('div');
	  cover.className = 'cover';

	  var image = Image.forAlbum(album, {width: 138, height: 138, player: true});
	  cover.appendChild(image.node);
	  
	  return cover;
  };
  
  var title = function(artist, album) {
	  var title = document.createElement('div');
	  var artistTitle = document.createElement('div');
	  var albumTitle = document.createElement('div');
	  title.className = 'title';
	  artistTitle.className = 'artistTitle';
	  albumTitle.className = 'albumTitle';
	  
	  artistTitle.appendChild(document.createTextNode(artist));
	  albumTitle.appendChild(document.createTextNode(album.name));
	  
	  title.appendChild(artistTitle);
	  title.appendChild(albumTitle);
	  
	  return title;
  };
  
  exports.album = album;
  exports.cover = cover;
  exports.title = title;
});
