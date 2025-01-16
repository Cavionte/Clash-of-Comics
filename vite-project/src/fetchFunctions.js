const userUrl = 'https://akabab.github.io/superhero-api/api/all.json'

export const checkResponseStatus =  () => {
    return fetchPromise
    .then((response) => {
       return {
        status: response.status,
        ok: response.ok,
        url: response.url
       }
    })
    .catch((err) => {
        console.error(err)
    })
};


export const getCharacters = () => {
    fetch(userUrl)
        .then((response) => {
            if (!response.ok) {
                throw Error(`Fetch Failed`)
            }
            const readingPromise = response.json
            return readingPromise
        }).then((responseBody) => {
            return responseBody
        })
};

export const 