import React, {Component, PropTypes} from "react";
import _ from "lodash";
import YouTube from "react-youtube";
import IconButton from "material-ui/IconButton";

class Player extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isOpen: false,
        }
    }

    handleTryNext(forward = true) {
        const player = _.get(this.refs, ['youtube', 'internalPlayer']);
        if (player) {
            const {videos} = this.props;
            const {currentVideoInstance, playingId, isPlaying} = this.props;
            const items = videos[playingId].items;
            const diff = currentVideoInstance + (forward ? 1 : -1);
            if (items.length !== 0 && diff < items.length && diff >= 0) {
                player.cueVideoById(items[diff]).then(() => {
                    if (isPlaying) {
                        player.playVideo();
                    }
                });
                this.props.onTryNext(diff);
            }
        }
    }

    renderTryPopup() {
        if (this.state.isOpen) {
            return (
                <div className="player-try-container">
                    <IconButton
                        className="player-try-button"
                        iconClassName="fa fa-chevron-circle-left"
                        onClick={() => this.handleTryNext(false)}
                    />
                    <IconButton
                        className="control-button"
                        iconClassName="fa fa-chevron-circle-right"
                        onClick={() => this.handleTryNext()}
                    />
                </div>
            )
        }
        return null;
    }

    render() {
        const {videos} = this.props;

        const opts = {
            height: '240',
            width: '360',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 0
            }
        };

        if (videos.length === 0) {
            return null;
        }
        return (
            <div
                className="player-container"
                onMouseEnter={() => this.setState({isOpen: true,})}
                onMouseLeave={() => this.setState({isOpen: false,})}
            >
                {this.renderTryPopup()}
                <YouTube
                    onEnd={this.props.onNext}
                    onPlay={() => this.props.onPlayerPlayClick(true)}
                    onPause={() => this.props.onPlayerPlayClick(false)}
                    ref={this.props.fakeRef}
                    opts={opts}
                    videoId={_.get(videos[this.props.playingId], "items[0]")}
                />
            </div>
        )
    }
}

Player.propTypes = {
    fakeRef: PropTypes.string.isRequired,
    videos: PropTypes.array.isRequired,
    currentVideoInstance: PropTypes.number.isRequired,
    playingId: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayerPlayClick: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onTryNext: PropTypes.func.isRequired,
};

Player.defaultProps = {};

export default Player;
