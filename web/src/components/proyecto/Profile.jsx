import PropTypes from 'prop-types';
import defaultAvatar from '../../images/user.jpeg';
import '../../styles/layout/Profile.scss';
function Profile(props) {
  const avatar = props.avatar === '' ? defaultAvatar : props.avatar;
  return (
    <div className="profile">
      <div
        className="profile__avatar"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
    </div>
  );
}
Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
};
export default Profile;
