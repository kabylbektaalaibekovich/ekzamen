namespace TODO  {
    type getTodoResponse = ICrud[]
    type getTodoRequest = void

    type postTodoResponse = ICrud[]
    type postTodoRequest = ICrud

    type deleteTodoResponse = ICrud[]
    type deleteTodoRequest = number

    type updateTodoResponse = ICrud[]
    type updateTodoRequest = {
        _id: number,
        data: ICrud,
    }
}