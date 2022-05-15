import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook"
import { BoardCard } from "../components"

function MyBoards(){
    
    const [boards, setBoards] = useState(null)
    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        request('/boards')
            .then((data) => setBoards(data.boards))
    }, [])

    if(loading)
        return <h1>Loading...</h1>
    

    return(
        <div>
            <ul>
                {
                    !loading &&
                    boards && 
                    boards.map((board) => (
                        <BoardCard key={board.id} board={board} />
                    ))
                }
            </ul>
        </div>
    )
}

export default MyBoards