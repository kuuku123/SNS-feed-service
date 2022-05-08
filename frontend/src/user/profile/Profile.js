import React, { Component } from "react";
import { feedCall } from '../../util/APIUtils';
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
  }
  handleOnClick(event) {
      event.preventDefault();
      feedCall()
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }
  render() {
    return (
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {this.props.currentUser.imageUrl ? (
                <img
                  src={this.props.currentUser.imageUrl}
                  alt={this.props.currentUser.name}
                />
              ) : (
                <div className="text-avatar">
                  <span>
                    {this.props.currentUser.name &&
                      this.props.currentUser.name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{this.props.currentUser.name}</h2>
              <p className="profile-email">{this.props.currentUser.email}</p>
              <button onClick={this.handleOnClick}>feed request</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
