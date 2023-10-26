import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='header'>
      <i className='header__icon fa-solid fa-computer'></i>
      <h1 className='header__h1'>Proyectos Molones</h1>
      <p className='header__text'>
        Escaparate en línea para recoger ideas a través de la tecnología.
      </p>
      {/* <button className='header__btn'>Ver proyectos</button> */}
      {/* <Link className='header__btn' to='/form'
        >
      Ver proyectos
      </Link> */}
    </header>
  );
};
export default Header;
