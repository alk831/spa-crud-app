import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

const firstPage = 1;

export function useCardsFetcher(target) {
  const [page, setPage] = useState(firstPage);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cardsData = useSelector(state => state.cards[target]);
  const isDataEmpty = cardsData.length === 0; 

  async function fetchCards() {
    if (isLastPage) return;
    if (isLoading && page !== firstPage) return;
    setIsLoading(true);

    const lastPageStatus = await dispatch(
      Actions.cardsFetchRequest('popular', page)
    );

    setIsLastPage(lastPageStatus);
    setPage(page => page + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    if (page === firstPage) {
      fetchCards();
    } else if (isDataEmpty && page > firstPage) {
      fetchCards();
    }
  }, [page, isDataEmpty]);

  return {
    data: cardsData,
    page,
    isLoading,
    fetchCards,
    isLastPage,
    isDataEmpty
  }
}