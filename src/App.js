import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [file, setFile] = useState(null);
  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');

  const notificaSucesso = (message) => {
    toast.success(message, {
    position:"top-center",
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "colored"

    })
  }

  const notificaErro = (message) => {
    toast.error(message, {
      position:"top-center",
      pauseOnFocusLoss: true,
      draggable: true,
      pauseOnHover: true,
      theme: "colored"
      })
  }


  const submitFile = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('rhphost.ddns.net/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
      notificaSucesso('Arquivo carregado com sucesso!');
    } catch (err) {
      console.error(err);
      notificaErro('Arquivo não foi carregado :(')
    }
  };

  const submitValores = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('rhphost.ddns.net/copiaTabela', {
        valor1: valor1,
        valor2: valor2
      });
      console.log(res.data);
      notificaSucesso('Tabela Copiada com sucesso!');
    } catch (err) {
      console.error(err);
      notificaErro('Tabela não foi copiada!')
    }
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <div className="page-container">
       <ToastContainer />
      <h1 className="title">Inserção de dados na tabela </h1>
      <div className="form-container">
        <div className="form-wrapper">
          <form onSubmit={submitFile} className='form'>
            <h3>Inserção por upload de arquivos:</h3>
            <input type="file" name="file" onChange={handleFileUpload} />
            <p className="file-format">Formatos aceitos: .CSV, .XLSX</p>
            <button type="submit" className="button">Upload</button>
          </form>
        </div>
        <div className="form-wrapper">
          <form onSubmit={submitValores} className='form'>
            <h3>Inserção por clonagemmmm de tabela:</h3>
            <input type="text" name="valor1" value={valor1} onChange={e => setValor1(e.target.value)} placeholder="cd_tab_fat - receberá os dados " />
            <input type="text" name="valor2" value={valor2} onChange={e => setValor2(e.target.value)} placeholder="cd_tab_fat - será clonada" />
            <button type="submit" className="button">Enviar Dados</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;