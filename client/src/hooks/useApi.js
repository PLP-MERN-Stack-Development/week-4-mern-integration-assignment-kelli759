import { useState, useEffect } from 'react'

export function useApi(url, method = 'GET', body = null) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const options = { method, headers: { 'Content-Type': 'application/json' } }
        if (body) options.body = JSON.stringify(body)

        const res = await fetch(url, options)
        const result = await res.json()
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, error, loading }
}
