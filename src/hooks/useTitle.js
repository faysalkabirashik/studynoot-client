import { useEffect } from 'react'

const useTitle = (title) => {
  useEffect(() => {
    document.title = `StudyNook - ${title}`
  }, [title])
}

export default useTitle
