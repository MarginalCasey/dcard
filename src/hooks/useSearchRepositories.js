import { useState, useRef } from 'react'
import axios from 'axios'
import usePrevious from './state/usePrevious'
import useDebounceEffect from './lifecycles/useDebounceEffect'
import searchRepositoriesAPI from '../apis/searchRepositoriesAPI'

function useSearchRepositories(searchText, page) {
  const abortControllerRef = useRef()

  const [isFetching, setIsFetching] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [result, setResult] = useState([])
  const [isIncomplete, setIsIncomplete] = useState(true)

  const prevSearchText = usePrevious(searchText)

  useDebounceEffect(
    () => {
      if (searchText !== '') {
        if (isFetching) {
          abortControllerRef.current.abort()
        }

        setIsFetching(true)
        setIsSuccess(false)

        if (searchText !== prevSearchText) {
          setResult([])
          setIsIncomplete(true)
        }

        abortControllerRef.current = new AbortController()

        searchRepositoriesAPI(
          { q: searchText, page },
          abortControllerRef.current
        )
          .then(data => {
            setIsFetching(false)
            setIsSuccess(true)

            if (page === 1) {
              setResult(data.items)
            } else {
              setResult(result => {
                // github API 有時會回傳重複的資料
                const idSet = new Set(result.map(item => item.id))

                return data.items.reduce((arr, item) => {
                  if (idSet.has(item.id)) {
                    return arr
                  } else {
                    idSet.add(item.id)
                    return [...arr, item]
                  }
                }, result)
              })
            }

            setIsIncomplete(data.items.length === 30)
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

  return { isFetching, isSuccess, result, isIncomplete }
}

export default useSearchRepositories
