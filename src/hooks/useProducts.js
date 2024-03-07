import {useEffect, useState } from 'react';
import { fetchDataFromAPI } from '../api/api';
import axios from 'axios';
import { getProductParams, getUniqueProducts, PAGE_SIZE } from '../utils';

export const useProducts = (params = getProductParams()) => {
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState(params.filter);
  const [filteredItems, setFilteredItems] = useState(null);
  const [filteredIds, setFilteredIds] = useState(null);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(params.page);

  useEffect(() => {
    fetchIds();
  }, [filter]);

  useEffect(() => {
    if (filteredIds?.length) {
      getProducts();
    }
  }, [filteredIds, page]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set('page', String(page));
    if (filter) {
      urlSearchParams.set('category', filter.category);
      urlSearchParams.set('value', String(filter.value));
    } else {
      urlSearchParams.delete('category');
      urlSearchParams.delete('value');
    }
    const newUrl = `?${urlSearchParams.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);
  }, [filter, page]);

  const getProducts = async () => {
    try {
      if (filteredIds?.length) {
        setLoading(true);
        const res = await fetchDataFromAPI('get_items', {
          ids: filteredIds.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
        });

        setFilteredItems(getUniqueProducts(res));
        setLoading(false);
      }
    } catch (error) {
      getProducts();
      handleFetchError(error);
    }
  };

  const fetchIds = async () => {
    try {
      setLoading(true);
      setFilteredIds(null);
      setFilteredItems(null);

      let filteredIds;
      if (filter) {
        filteredIds = await fetchDataFromAPI('filter', {
          [filter.category]: typeof filter.value === 'string' ? filter.value.trim() : filter.value,
        });
      } else {
        filteredIds = await fetchDataFromAPI('get_ids', {
          offset: 0,
        });
      }

      const uniqueIds = Array.from(new Set(filteredIds));

      const pages = Math.ceil(uniqueIds.length / PAGE_SIZE);
      setFilteredIds(uniqueIds);
      setPages(pages);
    } catch (error) {
      fetchIds();
      handleFetchError(error);
    }
  };

  const handleFetchError = (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.response?.data) {
        console.log(`Идентификатор ошибки: ${axiosError.response.data}`);
      }
    } else {
      console.error('Неизвестная ошибка:', error);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setFilteredIds(null);
    setPage(1);
  };

  return {
    filteredItems,
    isLoading,
    pages,
    page,
    fetchData: fetchIds,
    onFilterChange: handleFilterChange,
    onPageChange: setPage,
  };
};
