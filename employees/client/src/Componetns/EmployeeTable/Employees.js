import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Employees.css'

function Employeelist(){

    const[employees,setEmployees]  = useState([])
    const[formdata,setFormdata] = useState({
        'name':'',
        'email':'',
        'age':'',
        'salary':''
    })
    const[updateemployee, setUpdateEmployee]= useState(null)

    const handleupdate = (employee)=>{
        setUpdateEmployee(employee);
        setFormdata({
            name:employee.name,
            email:employee.email,
            age:employee.age,
            salary:employee.salary
        })
        
    }

    const handledelete = (id)=>{
        axios.delete(`http://localhost:5000/api/employees/${id}`)
        .then(()=>{
               setEmployees(employees.filter(emp => emp._id!== id))
        })
        .catch(err=>console.log(err))

    }
  const handlechange=(e)=>{
       const {name,value} = e.target;
       setFormdata(prevstate=>({
        ...prevstate,
        [name]:value || ''
       }))
  }

  const handlesubmit = (e)=>{
    e.preventDefault();
    if(updateemployee){
        axios.put(`http://localhost:5000/api/employees/${updateemployee._id}`,formdata)
        .then(res=>{
            setEmployees(employees.map(emp=> emp._id === res.data._id ? res.data : emp))
            setUpdateEmployee(null)
            setFormdata({
                name:'',
                email:'',
                age:'',
                saalry: ''
            })
        })
        .catch(err=>console.log(err))
    }
    else{
    axios.post('http://localhost:5000/api/employees',formdata)
    .then(res=>{
        setEmployees([...employees,res.data]);
        setFormdata({
            'name':'',
            'email':'',
            'age':'',
            'salary':''

        })
    })
    .catch(err => console.log(err))
    }
  }

    useEffect(()=>{
        axios.get('http://localhost:5000/api/employees')
        .then(res=>setEmployees(res.data))
        .catch(err=>console.log(err))
    },[])
return(
    <div>
        <h1>List of Employees</h1>

        <table>
            <thead>
                <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th> 
                <th>Salary</th>
                </tr>
            </thead>

            <tbody>
                {
                    employees.map((employee,index)=>{
                         return <tr key={index}> 
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.age}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <button type='submit'onClick={()=>handleupdate(employee)}>Update</button>
                                <button type ='submit'onClick={()=> handledelete(employee._id)}>Delete</button>  
                            </td>
                         </tr>
                    })
                }

            </tbody>
        </table>
        <form onSubmit={handlesubmit}>
    <label>Name</label>
    <input name='name'value={formdata.name} onChange={handlechange} placeholder='enter name' />

    <label>Email</label>
   <input name ='email'value={formdata.email} onChange={handlechange}placeholder='enter email' />

    <label>Age</label>
    <input name='age' value={formdata.age} onChange={handlechange}placeholder='enter Age' />

    <label>Salary</label>
    <input name='salary'value ={formdata.salary} onChange={handlechange}placeholder='enter Salary' />

    <button type='submit'>ADD</button>
    

</form>
    </div>
)
}

export default Employeelist;