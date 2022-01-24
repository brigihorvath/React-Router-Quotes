import { useEffect } from 'react';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

import QuoteList from '../components/quotes/QuoteList';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

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

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
