require([
 '$api/models',
 '$api/library',
 'scripts/html-elements'
], function(models, library, htmlElements) {
  'use strict';

  
  var albums = {};
  var index = 0;
  var length = null;
  
  var init = function(){

	  var lib = library.Library.forCurrentUser();
	  var playlists = lib.playlists;

	  playlists.snapshot().done(function(playlists){
		  handlePlaylists(playlists);
	  });
  };

  var handlePlaylists = function(playlists){
	  length = playlists.length;
	  for (var i = 0; i < length; i++) {
		  var playlist = playlists.get(i);
		  if(playlist){
			  playlist.load('tracks').done(function(playlist){
				 playlist.tracks.snapshot().done(function(tracks){
					 var firstTrack = tracks.get(0);
					 if(firstTrack){
						 convertTrackToAlbum(firstTrack);
					 }
				 });
			  });
		  } else {
			  index++;
		  }
		  
	  }	  
  };
  
  var convertTrackToAlbum = function(track) {
	 var album = models.Album.fromURI(track.album.uri);
	 album.load('artists', 'name', 'image', 'uri').done(function(album){
		 album.artists[0].load('name').done(function(artist){
			 
			 if(!albums[artist.name]){
				 albums[artist.name] = [];
			 }
			 albums[artist.name].push(album);
			 index++;

			 if(index == length) {
				 renderAlbums();
			 }
		 });
	 });	  
  };
  
  var renderAlbums = function() {

	  var artists = Object.keys(albums);
	  artists.sort();
	  
	  var list = document.getElementById('albumCoverViewList');
	  for (var artistIndex in artists) {
		  var artist = artists[artistIndex];
		  
		  for (var albumIndex in albums[artist]) {
			  var album = albums[artist][albumIndex];

			  var coverHtml = htmlElements.cover(album);
			  var titleHtml = htmlElements.title(artist, album);
			  var albumHtml = htmlElements.album(coverHtml, titleHtml);
			  
			  list.appendChild(albumHtml);
		  }
	  }
  };
  
  exports.init = init;
});
