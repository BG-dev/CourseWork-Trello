import { useState, useCallback } from "react";

export const useHttp = () => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(null)

    const request = useCallback( async (url, method = 'GET', body = null, headers = {
        'Content-type': 'application/json'
    }) => {
        setLoading(true)
        try {
            const jsonBody = JSON.stringify(body)
            const response = await fetch(url, {method, headers, body: jsonBody})
            const data = response.data
            
            if(!response.ok)
                throw new Error(response.message)

            setLoading(false)
            return data
        } catch (error) {
            setLoading(false)
            setError(error.message)
            throw error            
        }
    }, [])
    
    return { loading, request, error }
}