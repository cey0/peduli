// src/Login.tsx
import React, { useState } from 'react';
import './login.css';
import axios from 'axios';

function Login() {
  const [nik, setNik] = useState('');
  const [nama, setName] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/login',{
        nik : parseInt(nik),
        nama: nama
      });

      if (response.status === 200){
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard';
        alert('Berhasil login');
      }

    } catch (error) {
       if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        alert('NIK tidak terdaftar');
      } else {
        alert('Gagal Login');
      }
    } else {
      console.log(error);
      alert('Terjadi kesalahan');
    }
    }
  }

    return (
        <div className="container">
            <div className="login-wrapper">
                <div className="login-title">
                    <h1>LOGIN</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={handleLogin}>
                        <div className='NIK'>
                            <label htmlFor="NIK"><h2>NIK</h2></label>
                            <input
                                type="number"
                                name="NIK"
                                id="NIK"
                                placeholder="Masukkan NIK Anda"
                                value={nik}
                                onChange={(e) => setNik(e.target.value)}
                            />
                        </div>
                        <div className='Nama'>
                            <label htmlFor="Nama"><h2>Nama Lengkap</h2></label>
                            <input
                                type="text"
                                name="Name"
                                id="Name"
                                placeholder="Masukkan Nama lengkap Anda"
                                value={nama}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="button">
                            <a href="/register" className='btn-login'>Belum Punya Akun?</a>
                            <button className="btn-login" type='submit'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
