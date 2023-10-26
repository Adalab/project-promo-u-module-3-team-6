import React from 'react';
import PropTypes from 'prop-types';
import defaultAvatar from '../../images/hierbas.webp';
import ls from '../../services/localStorage';
import '../../styles/layout/GetAvatar.scss';
function GetAvatar({ avatar = defaultAvatar, updateAvatar, text }) {
  const fr = new FileReader();
  const myFileField = React.createRef();

  const uploadImage = (ev) => {
    if (ev.currentTarget.files.length > 0) {
      const myFile = ev.currentTarget.files[0];
      fr.addEventListener('load', () => {
        updateAvatar(fr.result);
        ls.set('userImage', fr.result);
      });
      fr.readAsDataURL(myFile);
    }
  };

  return (
    <div className="get-avatar">
      <label className="get-avatar__label">
        <input
          className="input-btn"
          type="file"
          ref={myFileField}
          onChange={uploadImage}
        />
        {text}
      </label>
      <div
        className="get-avatar__preview"
        style={{ backgroundImage: `url(${avatar})` }}
      ></div>
    </div>
  );
}

GetAvatar.propTypes = {
  avatar: PropTypes.string,
  updateAvatar: PropTypes.func.isRequired,
  text: PropTypes.string,
};

export default GetAvatar;
