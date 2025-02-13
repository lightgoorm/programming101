1일차 강의 

"꼬리물기 최적화"

삼항 연산자는 JS 스펙에 정의된 콜스택에 메모리가 잡히지 않는 연산자입니다.

재귀
```
const sum = v => v === 1 ? 1 : v + sum(v - 1);
sum(100000) // Uncaught RangeError: Maximum call stack size exceeded
```

꼬리 물기 재귀
```
const sum = ( v , acc = 0 ) => v === 0 ? acc : sum(v-1, acc + v )

```
