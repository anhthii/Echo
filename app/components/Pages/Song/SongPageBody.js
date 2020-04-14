import PropTypes from "prop-types";
import React from "react";
import "./index.sass";
import SuggestedSection from "./SuggestedSection";

const propTypes = {
  suggestedSongs: PropTypes.array.isRequired,
};

class SongPageBody extends React.Component {
  render() {
    return (
      <div className="song-body">
        {/* <div className="comment-section">
          <div className="comment-section-heading">
            <div>
              <h3>Bình luận <span>(23)</span></h3>
            </div>
            <div>
              <img src={''} />
              <span>Thêm bình luận</span>
            </div>
          </div>
          <div className="comment-body">
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content have-sub">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
              <div className="sub-cm-wrapper">
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
                <div className="comment sub-comment">
                  <div className="comment-image">
                    <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                  </div>
                  <div className="comment-content">
                    <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <div className="comment-date">13 March</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="comment">
              <div className="comment-wrapper">
                <div className="comment-image">
                  <img src="https://pickaface.net/gallery/avatar/16565588_170608_2145_2q8awr0.png" alt=""/>
                </div>
                <div className="comment-content">
                  <h3 className="comment-owner">Wane Craig <span>Trả lời</span></h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                  <div className="comment-date">13 March</div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <SuggestedSection songs={this.props.suggestedSongs} />
      </div>
    );
  }
}

SongPageBody.propTypes = propTypes;

export default SongPageBody;
