function delayer(data) {
    return function (resolve, reject) {
        setTimeout(
            function(){
                resolve(data)
            },
            2000
        );
    }
}

export function fetchCurrenciesList() {
    const testData = { type: 'map', svg: '<svg></svg>' };

    return new Promise(delayer(testData));
}
