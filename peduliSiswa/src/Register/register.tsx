import { useState } from 'react';
import '../Login/login.css';
import axios from 'axios';

function Login() {
  const [nik, setNik] = useState('');
  const [nama, setNama] = useState('');

  const handleRegist = async (event: React.FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    
    if (!nik || !nama) {
      alert('Tidak boleh ada field yang kosong');
      return;
    }
    
    if (nik.length !== 5) {
      alert('NIK harus terdiri dari 5 angka');
      return;
    }
    
    try{
      const response = await axios.post('http://localhost:8080/register', {
      nik: parseInt(nik),
      nama: nama
    });
    if (response.status === 200) {
      alert('Register Berhasil');
    } 
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        alert('NIK sudah terdaftar');
      } else {
        alert('Gagal Register');
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
                    <h1>Register</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={handleRegist}>
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
                                onChange={(e) => setNama(e.target.value)}
                            />
                        </div>
                        <div className="button">
                            <a href="/" className="btn-register">Sudah Punya Akun?</a>
                            <button type="submit" className="btn-login">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
