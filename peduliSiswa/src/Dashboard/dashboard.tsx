import { JwtPayload, jwtDecode } from 'jwt-decode';
import './dashboard.css'
import Title from '../tittle';
import Sidebar from '../sidebar';
import { useEffect, useState } from 'react';

interface MyTokenPayload extends JwtPayload {
  Nama: string;
  Nik: BigInteger;
}

function Dashboard(){
const [token,setToken] = useState<MyTokenPayload | null>(null);
const bocor = localStorage.getItem('token');
useEffect(()=> {
  if (bocor){
    const dataToken: MyTokenPayload = jwtDecode(bocor);
    setToken(dataToken);
  }
}, []);


if(!bocor){
  window.location.href = '/';
}

return(
  <div className="container">
  <div className="Dashboard-wrapper">
    <Sidebar />
    <div className="Dashboard-home">
    <Title />
      <div className="dashboard-text">
        <h3>Selamat datang, {token?.Nama} di peduli. Silakan mengisi data perjalanan atau melihat catatan perjalanan kamu!</h3>
      </div>
    </div>
  </div>
</div>

);
}

export default Dashboard