function Balance(){
    const [show, setShow] = React.useState(true);
    const [wrong, setWrong] = React.useState(false);
    const [currentBalance, setCurrentBalance] = React.useState(0);
    const [status, setStatus] = React.useState('');

    return(
        <Card
            bgcolor="primary"
            header="Balance"
            status={status}
            body={wrong ? 
                <HandleWrong setShow={setShow} setWrong={setWrong} message={"Email Unknown"} return={"Return to Balance"}/>:(show ?
                <BalanceForm setShow={setShow} setWrong={setWrong} setCurrentBalance={setCurrentBalance} currentBalance={currentBalance}/> :
                <HandleMsg setShow={setShow} message={`Current Balance is ${currentBalance}`} return={"return to Balance"}/>)}
        />
    )
}

function BalanceWrong(props){
    return(
        <>
            <h5>Email Unknown</h5>
            <button type="submit"
                className="btn btn-light"
                onClick={() => {
                    props.setShow(true)
                    props.setWrong(false)
                    }}>Return to Balance
            </button>
        </>)
}

function BalanceForm(props){
    const [email, setEmail] = React.useState('');
    const ctx = React.useContext(UserContext);  
  
    function handle(){
        console.log(email);
        const url = `/account/all/${email}`;
        (async () => {
            var res  = await fetch(url);
            var data = await res.json();    
            console.log(data);        
        })();
        props.setShow(false);
    }    
  
    return (<>
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Show Balance</button>
  
    </>);
}