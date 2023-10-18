/* eslint-disable react/jsx-no-target-blank */
import PropTypes from 'prop-types';
import Button from '../Button';

const Form = ({
  handleChangeInput,
  handleAuthorInput,
  handleCreateCard,
  data,
  nameErrorMsg,
  sloganErrorMsg,
  urlOneErrorMsg,
  urlTwoErrorMsg,
  technologiesErrorMsg,
  descErrorMsg,
  authorErrorMsg,
  jobErrorMsg,
  cardMsg,
  cardURL,
}) => {
  return (
    <section className="form">
      <h2 className="title">Información</h2>

      <section className="ask-info">
        <p className="subtitle">Cuéntanos sobre el proyecto</p>
        <hr className="line" />
      </section>

      <fieldset className="project">
        <input
          className="input"
          type="text"
          placeholder="Nombre del proyecto"
          name="name"
          id="name"
          value={data.name}
          onChange={(event) => handleChangeInput('name', event.target.value)}
        />
        {nameErrorMsg ? <p className="error-msg">{nameErrorMsg}</p> : ''}
        <input
          className="input"
          type="text"
          name="slogan"
          id="slogan"
          value={data.slogan}
          placeholder="Slogan"
          onChange={(event) => handleChangeInput('slogan', event.target.value)}
        />
        {sloganErrorMsg ? <p className="error-msg">{sloganErrorMsg}</p> : ''}
        <input
          className="input"
          type="text"
          name="repo"
          id="repo"
          placeholder="Repo"
          value={data.repo}
          onChange={(event) => handleChangeInput('repo', event.target.value)}
        />
        {urlOneErrorMsg ? <p className="error-msg">{urlOneErrorMsg}</p> : ''}
        <input
          className="input"
          type="text"
          placeholder="Demo"
          name="demo"
          id="demo"
          value={data.demo}
          onChange={(event) => handleChangeInput('demo', event.target.value)}
        />
        {urlTwoErrorMsg ? <p className="error-msg">{urlTwoErrorMsg}</p> : ''}
        <input
          className="input"
          type="text"
          placeholder="Tecnologías"
          name="technologies"
          id="technologies"
          value={data.technologies}
          onChange={(event) =>
            handleChangeInput('technologies', event.target.value)
          }
        />
        {technologiesErrorMsg ? (
          <p className="error-msg">{technologiesErrorMsg}</p>
        ) : (
          ''
        )}
        <textarea
          className="textarea"
          type="text"
          placeholder="Descripción"
          name="desc"
          id="desc"
          value={data.desc}
          onChange={(event) => handleChangeInput('desc', event.target.value)}
        ></textarea>
        {descErrorMsg ? <p className="error-msg">{descErrorMsg}</p> : ''}
      </fieldset>

      <section className="ask-info">
        <p className="subtitle">Cuéntanos sobre la autora</p>
        <hr className="line" />
      </section>

      <fieldset className="autor">
        <input
          className="input"
          type="text"
          placeholder="Nombre"
          name="autor"
          id="autor"
          value={data.autor}
          onChange={handleAuthorInput}
        />
        {authorErrorMsg ? <p className="error-msg">{authorErrorMsg}</p> : ''}
        <input
          className="input"
          type="text"
          placeholder="Trabajo"
          name="job"
          id="job"
          value={data.job}
          onChange={handleAuthorInput}
        />
        {jobErrorMsg ? <p className="error-msg">{jobErrorMsg}</p> : ''}
      </fieldset>

      <section className="buttons-img">
        <Button text="Subir foto de proyecto" className="btn" />
        <Button text="Subir foto de autora" className="btn" />
        {/* <button className="btn">Subir foto de proyecto</button>
        <button className="btn">Subir foto de autora</button> */}
      </section>
      <section className="buttons-img">
        <button className="btn-large" onClick={handleCreateCard}>
          Crear Tarjeta
        </button>
      </section>

      <section className="card">
        <span className="">
          <a target="_blank" href={cardURL}>
            {cardMsg} {cardURL}
          </a>
        </span>
      </section>
    </section>
  );
};
Form.propTypes = {
  handleChangeInput: PropTypes.func,
  handleAuthorInput: PropTypes.func,
  handleCreateCard: PropTypes.func,
  data: PropTypes.object,
  nameErrorMsg: PropTypes.string,
  sloganErrorMsg: PropTypes.string,
  urlOneErrorMsg: PropTypes.string,
  urlTwoErrorMsg: PropTypes.string,
  technologiesErrorMsg: PropTypes.string,
  descErrorMsg: PropTypes.string,
  authorErrorMsg: PropTypes.string,
  jobErrorMsg: PropTypes.string,
  cardMsg: PropTypes.string,
  cardURL: PropTypes.string,
};
export default Form;