export const createSeatUID = (x, y) => {
    x = String( parseInt( Number(x) ) );
    y = String( parseInt( Number(y) ) );

    let result = '', str = x + y;
    const arr = ['A','B','C','D','E','F','G','H','I','J'];

    for(let i=str.length; i--;){
        arr.map((v,k)=>{
            if( isNaN(+str[i]) ) return;
            if( parseInt(str[i]) === k ) result += v;
        });

        if( isNaN(+str[i]) ) result += str[i];
    }
    return result;
};
