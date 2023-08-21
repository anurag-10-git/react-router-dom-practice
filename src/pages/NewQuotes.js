import React, { useEffect } from 'react'
import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import useHttp from '../hooks/use-http'
import { addQuote } from '../lib/api'


const NewQuotes = () => {
  const history = useHistory()
  const {sendRequest, status} = useHttp(addQuote)

  useEffect(() => {
   if (status === 'completed') {
    history.push('/quotes')
   }
  }, [history, status])

  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData)
  }

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler}/>
  )
}

export default NewQuotes