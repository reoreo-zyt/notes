let str = '123456789.123123';

console.log(parseFloat(str).toLocaleString(undefined, { maximumFractionDigits: 6 }));

function formatNumber(num) {
    num = num.toString()
    let reg = num.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(\d{3})+$)/g
    return num.replace(reg, '$1,')
}

console.log(formatNumber(123456789));

let reg = /(\d)(?=(\d{3})+)/g
'1234567890'.replace(reg, (match, $1, $2, index, str) => {
    console.log(match, $1, $2, index, str)
    return $1 + ','
})


// /(\d)(?=(\d{3})+\.)/g