import * as React from "react"
import "./AddTransaction.css"

export default function AddTransaction( {isCreating,
                                        setIsCreating,
                                        form,
                                        setForm,
                                        handleOnSubmit} ) {

  const handleOnFormFieldChange = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
    console.log(form)
  }                                       
  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange={handleOnFormFieldChange}
                          form={form}
                          handleOnSubmit={handleOnSubmit}
                          isCreating={isCreating} />
    </div>
  )
}

export function AddTransactionForm( {handleOnFormFieldChange,
                                    form,
                                    handleOnSubmit,
                                    isCreating} ) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input 
            name="description"
            type="text"
            placeholder="transaction description"
            value={form?.description}
            onChange={handleOnFormFieldChange} />
            {/* <input /> */}
        </div>
        <div className="field">
          <label>Category</label>
          <input name="category"
                type="text"
                placeholder="transaction category"
                value={form?.category}
                onChange={handleOnFormFieldChange} />
            {/* <input /> */}
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input name="amount"
            type="number"
            placeholder="transaction amount"
            value={form?.amount}
            onChange={handleOnFormFieldChange} />
            {/* <input /> */}
        </div>

        <button className="btn add-transaction" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
