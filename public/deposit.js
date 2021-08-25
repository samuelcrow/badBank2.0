function Deposit(){
    const [show, setShow] = React.useState(true);
    const [wrong, setWrong] = React.useState(false);
    const [status, setStatus] = React.useState('');

    return(
        <Card
            bgcolor="primary"
            header="Deposit"
            status={status}
            body={wrong ? 
                <HandleWrong setShow={setShow} setWrong={setWrong} message={"Email or Amount Unknown"} return={"Return to Deposit"}/>:(show ?
                <DepositForm setShow={setShow} setWrong={setWrong}/> :
                <HandleMsg setShow={setShow} message={"Success!"} return={"Return to Deposit"}/>)}
        />
    )
}


function DepositForm(props){
    const [email, setEmail] = React.useState('');
    const [balance, setBalance] = React.useState(0);
    const ctx = React.useContext(UserContext);  
  
    function handle(){
        console.log(email,balance);
        ctx.users.forEach((user) => {
            if (user.email === email && balance >= 0){
                // the + infront of balance makes sure to add and not just concatinate
                user.balance += +balance;
                props.setShow(false);
            }
            else {
                props.setWrong(true);
            }
        })
    }    
  
    return (<>
      Email address<br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Amount<br/>
      <input type="number" 
        className="form-control" 
        placeholder="Enter Amount" 
        value={balance} 
        onChange={e => setBalance(e.currentTarget.value)}/><br/>
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Deposit</button>
  
    </>);
}