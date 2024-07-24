import './insert.css'
import Title from '../tittle'
import Sidebar from '../sidebar'
function Insert(){
  return(
    <div className="container">
      <div className="insert-wrapper">
        <Sidebar/>
        <div className="insert-home">
        <Title />
        <div className="insert-form">
          <form action="">  
          <div className="input-atas">
            <input type="date" />
            <input type="text" />
            <input type="text" />
          </div>

            <input type="text" className='lokasiInput' />
            <div className="button">
              <button className='btn'>submit</button>
            </div>
          </form>
        </div>
        </div>
        
      </div>
    </div>
  )
}

export default Insert