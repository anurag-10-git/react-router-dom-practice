import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link, Route, useLocation, useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const DUMMY_DATA = [
  {id:'q1', author: 'max', text: 'Learning react is fun'},
  {id:'q2', author: 'anurag', text: 'Learing react in good'}
]

const QuoteDetails = () => {
  const params = useParams()
  const match = useRouteMatch()

  const { quoteId } = params;

  const {sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true)

  useEffect(() => {
   sendRequest(quoteId)
  }, [quoteId, sendRequest])

  if (status === 'pending') {
    return  <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>
  }

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
      <Route path={match.path} exact>
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>
    </>
  )
}

export default QuoteDetails