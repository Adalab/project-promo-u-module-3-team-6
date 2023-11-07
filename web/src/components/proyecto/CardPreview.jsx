/* eslint-disable react/jsx-no-target-blank */

import PropTypes from 'prop-types';
import Card from '../Card';

const CardPreview = ({ data }) => {
  return (
    <section className="preview">
      <img
        className="image_leaves"
        src={data.photo || './src/images/2.jpg'}
        alt=""
      />
      <Card data={data} />
    </section>
  );
};
CardPreview.propTypes = {
  data: PropTypes.object,
};
export default CardPreview;
