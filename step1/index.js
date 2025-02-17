// 배열 sum
if(1) {
    const _sum = (acc, v, ...arr) => arr.length > 0 ? _sum(acc+v, ...arr) : acc + v;
    const sum = arr => _sum(0, ...arr);
    
    console.log(sum([1,2,3]))
}
if(1) {
    const sum = (arr) => {
        const _sum = (arr, i, acc) => i > -1 ? _sum(arr, i-1, acc+arr[i]) : acc;
        return _sum(arr, arr.length - 1, 0);
    } // 
    console.log(sum([1,2,3]));
} // elementSum scope: arraySum만 알게, lifecycle: arraySum호출할 때 생성되어 리턴시 제거 ( 대신에 연산이 많이 됨 )
if(1) {   
    const sum = (() => {
        const elementSum = (arr, i, acc) => i > -1 ? elementSum(arr, i-1, acc+arr[i]) : acc;
        const arraySum = (arr) => elementSum(arr, arr.length - 1, 0);
        return arraySum;
    })(); // elementSum scope: arraySum만 알게, lifecycle은 영구적 ( 연산이 적게 되는 대신 메모리를 많이 차지함 )
    console.log(sum([1,2,3]));
}
if(1) {
    const sum = (arr) => {
        let acc = 0;
        for (i=arr.length - 1;i>-1; i = i-1) acc = acc + arr[i];
        return acc;
    }
    console.log(sum([1,2,3]));
