/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-target-blank */
import { useEffect, useState } from 'react';
import '../styles/App.scss';
// import Landing from '../landing/Landing';
import Header from './Header';
import Form from './proyecto/Form';
import CardPreview from './proyecto/CardPreview';
import Footer from './Footer';
import ls from '../services/localStorage';
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import { matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


function App() {
  //States
  const [data, setData] = useState(() => {
    const savedData = ls.get('formData');
    return savedData
      ? JSON.parse(savedData)
      : {
          name: '',
          slogan: '',
          repo: '',
          demo: '',
          technologies: '',
          desc: '',
          autor: '',
          job: '',
          image: 'src/images/hierbas.webp', // foto autora
          photo: 'src/images/playa.jpg', // foto proyecto
        };
  });

  //Img Update states
  const [avatar, setAvatar] = useState('');

  //msg/url states
  const [cardMsg, setCardMsg] = useState('');
  const [cardURL, setCardURL] = useState('');

  //RegExp
  const expRegUrl =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,})(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)*$/;

  const patron = /^[ A-Za-zäÄëËïÏöÖüÜáéíóúÁÉÍÓÚÂÊÎÔÛâêîôûàèìòùÀÈÌÒÙñÑ-]+$/;

  //Msg error:
  const [nameErrorMsg, setNameErrorMsg] = useState('');
  const [sloganErrorMsg, setSloganErrorMsg] = useState('');
  const [urlOneErrorMsg, setUrlOneErrorMsg] = useState('');
  const [urlTwoErrorMsg, setUrlTwoErrorMsg] = useState('');
  const [technologiesErrorMsg, setTechnologiesErrorMsg] = useState('');
  const [descErrorMsg, setDescErrorMsg] = useState('');
  const [authorErrorMsg, setAuthorErrorMsg] = useState('');
  const [jobErrorMsg, setJobErrorMsg] = useState('');

  //Effects
  useEffect(() => {
    // Al montar el componente, intentar cargar los datos desde localStorage
    const savedData = ls.get('formData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }

    // También cargar la imagen del usuario desde localStorage
    const savedUserImage = ls.get('userImage');
    if (savedUserImage) {
      setAvatar(savedUserImage);
    }

    // Establecer el evento de antes de descargar para guardar en localStorage
    const saveData = () => {
      const dataString = JSON.stringify(data);
      ls.set('formData', dataString);
    };
    window.addEventListener('beforeunload', saveData);

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('beforeunload', saveData);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handlers
  const handleChangeInput = (id, value) => {
    let newData = { ...data, [id]: value };

    if (id === 'name') {
      setNameErrorMsg(!value ? 'Este campo es requerido' : '');
    } else if (id === 'slogan') {
      setSloganErrorMsg(!value ? 'Este campo es requerido' : '');
    } else if (id === 'technologies') {
      setTechnologiesErrorMsg(!value ? 'Este campo es requerido' : '');
    } else if (id === 'desc') {
      setDescErrorMsg(!value ? 'Este campo es requerido' : '');
    } else if (id === 'repo') {
      if (!expRegUrl.test(value)) {
        setUrlOneErrorMsg(
          value
            ? 'La URL ingresada no es válida, debes incluir una URL completa con https://'
            : ''
        );
      } else {
        setUrlOneErrorMsg('');
        validateUrl(value);
      }
    } else if (id === 'demo') {
      if (!expRegUrl.test(value)) {
        setUrlTwoErrorMsg(
          value
            ? 'La URL ingresada no es válida, debes incluir una URL completa con https://'
            : ''
        );
      } else {
        setUrlTwoErrorMsg('');
        validateUrl(value);
      }
    }

    setData(newData);

    // Guardar en localStorage
    ls.set('formData', JSON.stringify(newData));
  };

  const handleAuthorInput = (event) => {
    const id = event.target.id;
    const value = event.target.value;

    if (id === 'autor') {
      setAuthorErrorMsg(
        !patron.test(value)
          ? 'El nombre del autor no es válido, no puede contener números ni carácteres especiales'
          : ''
      );
    } else if (id === 'job') {
      setJobErrorMsg(
        !patron.test(value)
          ? 'El trabajo del autor no es válido, no puede contener números ni carácteres especiales'
          : ''
      );
    }

    setData({ ...data, [id]: value });
  };

  const handleCreateCard = () => {
    fetch('https://dev.adalab.es/api/projectCard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((pepino) => {
        if (pepino.success === false) {
          setCardMsg('Algo ha ido mal');
        } else {
          setCardURL(pepino.cardURL);
          setCardMsg(`Tu tarjeta ha sido creada:`);
        }
      });
  };

  //functions
  const validateUrl = (url) => {
    if (expRegUrl.test(url)) {
      if (!url.startsWith('https://')) {
        setUrlOneErrorMsg(
          'Debes ingresar una URL completa, que comience con https://'
        );
        setUrlTwoErrorMsg(
          'Debes ingresar una URL completa, que comience con https://'
        );
      } else {
        setUrlOneErrorMsg('');
        setUrlTwoErrorMsg('');
      }
    } else {
      setUrlTwoErrorMsg('La URL ingresada no es válida');
      setUrlOneErrorMsg('La URL ingresada no es válida');
    }
  };

  const updateAvatar = (avatar) => {
    setAvatar(avatar);
    ls.set('userImage', avatar);
  };

  return (
    <>
      <div className="container">
        <Header />
       
        <Routes>

        
        <Route
        path='/'
        element={
          <>
            <main className="main">
          <CardPreview data={data} avatar={avatar} />
          <Link className='header__btn' to='/form'
        >
      Ver proyectos
      </Link>
        </main>
          
          </>

        }
        
        />
        <Route
        path='/form'
        element={
          <>
          <main className='main'  >
          <Form
            handleChangeInput={handleChangeInput}
            handleAuthorInput={handleAuthorInput}
            handleCreateCard={handleCreateCard}
            data={data}
            nameErrorMsg={nameErrorMsg}
            sloganErrorMsg={sloganErrorMsg}
            urlOneErrorMsg={urlOneErrorMsg}
            urlTwoErrorMsg={urlTwoErrorMsg}
            technologiesErrorMsg={technologiesErrorMsg}
            descErrorMsg={descErrorMsg}
            authorErrorMsg={authorErrorMsg}
            jobErrorMsg={jobErrorMsg}
            cardMsg={cardMsg}
            cardURL={cardURL}
          />
          <Link className='header__btn'  to='/' > Volver al inicio </Link>
          </main>
          
          </>
        }
        
        
        />
        
        </Routes>

      
        <Footer />
      </div>
    </>
  );
}

export default App;
