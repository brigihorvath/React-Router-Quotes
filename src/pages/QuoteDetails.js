import { useParams, Route, Link, useRouteMatch } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { getSingleQuote } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';

// const DUMMY_QUOTES = [
//   {
//     id: 'q1',
//     author: 'Marie Curie',
//     text: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
//   },
//   {
//     id: 'q2',
//     author: 'Arnold Schwarzenegger',
//     text: 'If you don’t find the time, if you don’t do the work, you don’t get the results.',
//   },
//   {
//     id: 'q3',
//     author: 'Angela Duckworth',
//     text: 'Enthusiasm is common. Endurance is rare.',
//   },
// ];

function QuoteDetails() {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);
  const match = useRouteMatch();
  const { quoteId } = useParams();
  // const quote = DUMMY_QUOTES.find((el) => el.id === quoteId);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered focused">{error}</div>;
  }

  if (!loadedQuote) {
    return <p>No quote found</p>;
  }
  console.log(match);
  return (
    <Fragment>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link to={`${match.url}/comments`} className="btn--flat">
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
}

export default QuoteDetails;
