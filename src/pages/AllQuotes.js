import React, { useEffect } from 'react'
import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { getAllQuotes } from '../lib/api'
import NoQuotesFound from '../components/quotes/NoQuotesFound'

const DUMMY_DATA = [
  {id:'q1', author: 'max', text: 'Learning react is fun'},
  {id:'q2', author: 'anurag', text: 'Learing react in good'}
]

const AllQuotes = () => {
  const {sendRequest, status, data:loadedQuotes, error} = useHttp(getAllQuotes, true)

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className='centered focused'>{error}</p>
  }

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />
  }

  return (
    <QuoteList quotes={loadedQuotes}/>
  )
}

export default AllQuotes