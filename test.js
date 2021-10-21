function findAllOccurrences(arr, target) {
    let result = [];
    arr.forEach((value, index) => {
        if (value == target) {
            result.push(index);
        }
    })
    return result
}

console.log(findAllOccurrences([1, 2, 3, 4], 4));