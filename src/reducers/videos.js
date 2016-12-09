import {
    INVALIDATE_VIDEO,
    RECEIVE_VIDEO,
    REQUEST_VIDEO,
} from '../actions/videos';
import _ from 'lodash';

function videos(state = {
    isFetching: false,
    didInvalidate: false,
    items: [],
}, action) {
    switch (action.type) {
        case INVALIDATE_VIDEO:
            return Object.assign({}, state, {
                didInvalidate: true,
            });
        case REQUEST_VIDEO:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_VIDEO:
            return Object.assign({}, state, {
                query: action.query,
                isFetching: false,
                didInvalidate: false,
                items: action.videos,
                lastUpdated: action.receivedAt
            });
        default:
            return state
    }
}

export function suggestedVideos(state = { }, action) {
    switch (action.type) {
        case INVALIDATE_VIDEO:
        case RECEIVE_VIDEO:
        case REQUEST_VIDEO:
            return Object.assign({}, state, {
                //TODO: deal with spaces...
                [action.query]: videos(state[action.query], action)
            });
        default:
            return state
    }
}