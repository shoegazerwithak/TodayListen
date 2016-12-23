import {
    INVALIDATE_ARTIST,
    SELECT_ARTIST,
    RECEIVE_SIMILAR_ARTISTS,
    REQUEST_SIMILAR_ARTISTS,
    NEXT_ARTIST,
    FETCH_FINISH_ARTIST
} from "../actions/artist";

export function selectedArtist(state = 'Mono', action) {
    switch (action.type) {
        case NEXT_ARTIST:
        case SELECT_ARTIST:
            return action.artist;
        default:
            return state;
    }
}

export function fetchFinishArtist(state = {}, action) {
    switch (action.type) {
        case FETCH_FINISH_ARTIST:
            return action.artist;
        default:
            return state;
    }
}

function artists(state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) {
    switch (action.type) {
        case INVALIDATE_ARTIST:
            return {
                ...state,
                didInvalidate: true,
            };
        case REQUEST_SIMILAR_ARTISTS:
            return {
                ...state,
                isFetching: true,
                didInvalidate: false,
            };
        case RECEIVE_SIMILAR_ARTISTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.items,
                lastUpdated: action.receivedAt,
            };
        default:
            return state;
    }
}

export function suggestedArtists(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_ARTIST:
        case RECEIVE_SIMILAR_ARTISTS:
        case REQUEST_SIMILAR_ARTISTS:
            return {
                ...state,
                [action.artist]: artists(state[action.artist], action),
            };
        default:
            return state;
    }
}