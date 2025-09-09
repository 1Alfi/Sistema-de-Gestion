package com.sistema_contable.sistema.contable.dto;

import org.modelmapper.ModelMapper;

public class Mapper extends ModelMapper {\

    //constructor
    public Mapper() {
        configSongResponse();
        configPlaylistResponse();
    }

    //custom mapping
    private void configSongResponse(){
        this.createTypeMap(Song.class, SongResponseDTO.class)
                .addMapping(src -> src.getAuthor().getArtisticName(),(dto, v) -> dto.getArtist().setName((String) v))
                .addMapping(src -> src.getAuthor().getId(),(dto, v) -> dto.getArtist().setId((Long)v));
    }

    private void configPlaylistResponse(){
        this.createTypeMap(Playlist.class, PlaylistResponseDTO.class)
                .addMapping(src -> src.numberOfSongs(),(dto,v)->dto.setNumberOfSongs((String) v));
    }

}
