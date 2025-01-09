const baseURL = 'https://dummyjson.com/todos'

// Able to delay the response intentionally for the testing purpose
const fetchURL = async (url, delayMill) => {
    try {
        let response = ''
        if (delayMill && !isNaN(delayMill) && delayMill > 0 && delayMill <= 5000) { // Response delay in milliseconds from 0 - 5000
            response = await fetch(url + `/?delay=${delayMill}`)
        } else {
            response = await fetch(url)
        }
        if (!response.ok) 
            throw new Error('Network response was not OK')

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error)
    } 
}

const getAll = (delayMill = 0) => {
    return fetchURL(baseURL, delayMill)
}

const getRandomTodo = (delayMill = 0) => {
    return fetchURL(baseURL + '/random', delayMill)
}

const getTodoWithId = (id, delayMill = 0) => {
    return fetchURL(baseURL + '/' + id, delayMill)
}

export { getAll, getRandomTodo, getTodoWithId }