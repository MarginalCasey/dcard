import { useState, useRef } from 'react'
import axios from 'axios'
import useDebounceEffect from './useDebounceEffect'
import searchRepositoriesAPI from '../apis/searchRepositoriesAPI'

function useSearchRepositories(searchText, page) {
  const abortControllerRef = useRef()

  const [isFetching, setIsFetching] = useState(false)
  const [result, setResult] = useState([])
  const [isIncomplete, setIsIncomplete] = useState(false)

  useDebounceEffect(
    () => {
      if (searchText !== '') {
        if (isFetching) {
          abortControllerRef.current.abort()
        }

        setIsFetching(true)
        abortControllerRef.current = new AbortController()

        searchRepositoriesAPI(
          { q: searchText, page },
          abortControllerRef.current
        )
          .then(data => {
            setIsFetching(false)

            setResult(data.items)
            setIsIncomplete(data.incomplete_results)
          })
          .catch(error => {
            setIsFetching(false)

            if (!axios.isCancel(error)) {
              window.alert(error)
            }
          })
      }
    },
    [searchText, page],
    500
  )

  return { isFetching, result, isIncomplete }
}

export default useSearchRepositories
