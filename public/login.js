function Login(){
    const [show, setShow] = React.useState(true);
    const [wrong, setWrong] = React.useState(false);
    const [status, setStatus] = React.useState('');

    return(
        <Card
            bgcolor="primary"
            header="Login"
            status={status}
            body={wrong ? 
                <LoginWrong setShow={setShow} setWrong={setWrong}/>:(show ?
                <LoginForm setShow={setShow} setWrong={setWrong}/> :
                <LoginMsg setShow={setShow} setWrong={setWrong}/>)}
        />
    )
}

function LoginMsg(props){
    return(
    <>
        <h5>Success</h5>
        <button type="submit"
            className="btn btn-light"
            onClick={() => {props.setShow(true);}}>Log into a different account
        </button>
    </>)
}

function LoginWrong(props){
    return(
        <>
            <h5>Password or Email unknown</h5>
            <button type="submit"
                className="btn btn-light"
                onClick={() => {
                    props.setShow(true)
                    props.setWrong(false)
                    }}>Return to Login
            </button>
        </>)
}

function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
    function handle(){
        console.log(email,password);
        const url = `/account/all/${email}/${password}`;
      (async () => {
          var res  = await fetch(url);
          console.log(res);
          var data = await res.json();    
          console.log(data); 
          if (data) {
              props.setShow(false);
          }
          else {
              props.setWrong(true);
          }       
      })();
    } 
  
    return (<>
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
  
    </>);
}