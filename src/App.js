import React,{useState, useEffect} from 'react'
import { View } from './Components/View';


// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [books, setbooks]=useState(getDatafromLS());

  // input field states
  const [firstname, setFirstname]=useState('');
  const [lastname, setLastname]=useState('');
  const [isbn, setIsbn]=useState('');
  const [email, setEmail]=useState('');
  const [option, setOption]=useState('');
  const [phonenumber, setPhonenumber]=useState('');
  const [password, setPassword]=useState('');
  const [conformpassword, setConformpassword]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      firstname,
      lastname,
	  email,
	  option,
	  phonenumber,
	  password,
	  conformpassword,
      isbn,
	  
    }
    setbooks([...books,book]);
    setFirstname('');
    setLastname('');
	setEmail('');
	setOption('');
	setPhonenumber('');
	setPassword('');
	setConformpassword('');
    setIsbn('');
	
	if(password.value != conformpassword.value){
		alert("password and conform password should be same!")
	}
  }

  // delete book from LS
  const deleteBook=(isbn)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  return (
    <div className='wrapper'>
      <h1>Registration From</h1>
      <p>Add and view user details using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
            <label>First Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setFirstname(e.target.value)} value={firstname}></input>
            <br></br>
			<label>Last Name</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setLastname(e.target.value)} value={lastname}></input>
            <br></br>
            <label>Email</label>
            <input type="email" className='form-control' required
            onChange={(e)=>setEmail(e.target.value)} value={email}></input>
            <br></br>
			<select id="status" className="form-control" required value={option} onChange={(e)=>setOption(e.target.value)}>
				<option value="select">SELECT</option>
				<option value="user" active placeholder="Select">User</option>
				<option value="admin">Admin</option>
			</select>
			<br></br>
			<label>Phone Number</label>
            <input type="number" className='form-control' required
            onChange={(e)=>setPhonenumber(e.target.value)} value={phonenumber}></input>
            <br></br>
			<label>Password</label>
            <input type="password" className='form-control' required
            onChange={(e)=>setPassword(e.target.value)} value={password}></input>
            <br></br>
            <label>Conform Password</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setConformpassword(e.target.value)} value={conformpassword}></input>
            <br></br>
            <label>ISBN#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

		<div className='view-container'>
          {books.length>0&&<>
            <div className='table-responsive'>
				<h1 className="tableHeading">User Details</h1>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>First name</th>
					<th>Last name</th>
                    <th>Email</th>
					<th>Phone Number</th>
					<th>Password</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setbooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div className="mesg">No Users are added yet</div>}
        </div>

      </div>
	  
    </div>
  )
}

export default App
