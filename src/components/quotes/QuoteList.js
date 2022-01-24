import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const isSortedAscending =
    new URLSearchParams(location.search).get('sort') === 'asc';

  const onSortHandler = () => {
    // history.push(
    //   `${location.pathname}?sort=${isSortedAscending ? 'desc' : 'asc'}`
    // );
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortedAscending ? 'desc' : 'asc'}`,
    });
  };
  console.log(history);
  const sortedArr = sortQuotes(props.quotes, isSortedAscending);
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={onSortHandler}>
          {`Sort ${isSortedAscending ? 'Descending' : 'Ascending'}`}
        </button>
        <ul className={classes.list}>
          {sortedArr.map((quote) => (
            <QuoteItem
              key={quote.id}
              id={quote.id}
              author={quote.author}
              text={quote.text}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default QuoteList;
