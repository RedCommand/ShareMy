exports.processResponse = (response) => {
    const statusCode = response.status;
    const data = response.json();
    return Promise.all([statusCode, data]).then((res) => ({
        statusCode: res[0],
        data: res[1],
    }));
}

exports.compareArrays = (arr1, arr2) => {
    if (arr1.length != arr2.length)
        return false;
    if (JSON.stringify(arr1) != JSON.stringify(arr2))
        return false;
    return true;
}