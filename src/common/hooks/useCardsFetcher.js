import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../store/actions';

const firstPage = 1;

export function useCardsFetcher(target) {
  const [page, setPage] = useState(firstPage);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [afterFirstRender, setFirsRender] = useState(false);
  const dispatch = useDispatch();
  const cardsData = useSelector(state => state.cards[target]);
  const isDataEmpty = cardsData.length === 0; 
  const isDataOver = isDataEmpty && isLastPage;

  async function fetchCards() {
    if (isLastPage) return;
    if (isLoading && page !== firstPage) return;
    setIsLoading(true);

    const lastPageStatus = await dispatch(
      Actions.cardsFetchRequest(target, page)
    );

    setIsLastPage(lastPageStatus);
    setPage(page => page + 1);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!afterFirstRender) {
      setFirsRender(true);
      fetchCards();
    } else if (
      afterFirstRender &&
      isDataEmpty &&
      page > firstPage
    ) {
      fetchCards();
    }
  }, [page, isDataEmpty]);

  return {
    data: cardsData,
    page,
    isLoading,
    fetchCards,
    isLastPage,
    isDataEmpty,
    isDataOver
  }
}