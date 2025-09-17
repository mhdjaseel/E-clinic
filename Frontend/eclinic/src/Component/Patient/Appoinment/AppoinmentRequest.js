import React ,{useState}from 'react'

function AppoinmentRequest() {
const [Data, setData] = useState({});
    const HandleChange = (e) => {
    const { name, value } = e.target;
    setData(({
      ...Data,
      [name]: value
    }));

  };

  const HandleSubmit =(e)=>{
    e.preventDefault()
    console.log(Data)
  }
  return (
    <div>
        <div className="container">
            <div className="col-md-6">
                <form action="#" onSubmit={HandleSubmit}>

                    <input type="text" placeholder='patient name ' name='patient' onChange={HandleChange}/>
                    <input type="date" name='date'  onChange={HandleChange}/>
                    <input type="text" placeholder='prefred Location' name='location' onChange={HandleChange}/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default AppoinmentRequest