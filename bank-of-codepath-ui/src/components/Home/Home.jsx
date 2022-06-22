import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios"

export default function Home( { transactions,
                                setTransactions,
                                transfers,
                                setTransfers,
                                error,
                                setError,
                                isLoading,
                                setIsLoading,
                                filterInputValue,
                                newTransactionForm,
                                setNewTransactionForm,
                                isCreating,
                                setIsCreating } ) {

  React.useEffect(() => {
    const fetchData = async () => {
      setError("");
      setIsLoading(true);
      try {
        const transactionsMetadata = await axios.get("http://localhost:3001/bank/transactions")
        const transfersMetadata = await axios.get("http://localhost:3001/bank/transfers")
        // console.log("1:", transactionsMetadata.data.transactions)
        setTransactions(transactionsMetadata.data.transactions)
        // console.log("2:", transfersMetadata.data.transfers)   
        setTransfers(transfersMetadata.data.transfers)    
      }
      catch (err)
      {
        setError(err.message);
        console.log(error)
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);
  

  let filteredTransactions = []
  
  if (filterInputValue) {
     filteredTransactions = transactions.filter((current) =>{
      return (current.description.toLowerCase().includes(filterInputValue.toLowerCase())) 
    })
  }
  else {
    filteredTransactions = transactions
  }

  // const handleOnSubmitNewTransaction = () => {
  //   // guessing on this one
  //   console.log("Entered some type of handle")
  //   setIsCreating(true)
  //   axios.post("http://localhost:3001/bank/transactions",
  //   {transaction: newTransactionForm})
  //   .then((response) => {
  //     setTransactions([...transactions, response.transaction])
  //     console.log("Succesfully added:", response.transaction)
  //   }, reason => {
  //     setError(reason);
  //     console.error("ERROR:", error);
  //   })
  //   setNewTransactionForm ({"category": "", "description": "","amount": 0})
  //   setIsCreating(false)
  //   console.log("LEaving some type of submit function")
  // }
  // I think the write up has a type and both these funcitons do the same thing
  const handleOnCreateTransaction = async () => {
    console.log("Entered some type of handle")
    setIsCreating(true)
    axios.post("http://localhost:3001/bank/transactions",
    {"transaction": {newTransactionForm}})
    .then((response) => {
      setTransactions([...transactions, response.data.transaction])
      setNewTransactionForm ({"category": "", "description": "","amount": 0})
      setIsCreating(false)
    }, reason => {
      setError(reason.status);
      isCreating(false)
      console.log(error);
    })
  }
  // not sure why not passing tests, I correctly call it and it does do the post request

  return (
    <div className="home">
      <AddTransaction isCreating={isCreating}
                      setIsCreating={setIsCreating}
                      form={newTransactionForm}
                      setForm={setNewTransactionForm}
                      handleOnSubmit={handleOnCreateTransaction} />
      {error !== "" ? <h2 className="error">{error}</h2> : null}
      {isLoading ? <h1>Loading...</h1> : <BankActivity transactions={filteredTransactions} />}
    </div>
  )
}
