const apiRequest = async (url = '', optionsObj = null,id = 0, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj)
        .then(response => response.json())
        .then(result => id = result.id);
        if(!response.ok) throw Error('Please reload application');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return {id, errMsg};
    }
}

export default apiRequest;