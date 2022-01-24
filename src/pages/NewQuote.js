import QuoteForm from '../components/quotes/QuoteForm';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  // useHttp is a custom hook

  const { sendRequest, status } = useHttp(addQuote);
  //to programatically redirect the page after a successful quote submission
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed') {
      history.push('/quotes');
    }
  }, [status, history]);
  const addQuoteHandler = (quote) => {
    sendRequest(quote);
  };
  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
