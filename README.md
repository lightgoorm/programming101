# 🏗 코드 스피츠 프로그래밍 101 정리

**"기본기는 탄탄할수록 더욱 빛을 발한다."**  
이 저장소는 `코드 스피츠 프로그래밍 101` 강의를 정리하며,  
자바스크립트의 기본기를 다지는 것을 목표로 합니다.

---

## 📌 목표
- **프로그래밍과 자바스크립트의 기초 개념**을 명확하게 이해한다.
- 코드를 직접 작성하며 **핵심 원리를 체득**한다.
- **객체 지향, 함수형 프로그래밍**의 기초를 다진다.

---

## 📖 강의 내용 정리   

### 1️⃣, 2️⃣ 일차
- 프로그램의 정의
- 프로그래밍 방법론
  1. 변수란 스코프와 라이프사이클을 갖는다. 메모리와 연산은 상호 교환할 수 있으며 이는 라이프 사이클과 관련있다.
     - 스코프 : 변수가 접근할 수 있는 범위 ( ego: global, function, block 스코프 )
     - 라이프 사이클 : 변수가 생성되고, 사용되다가, 소멸하는 과정
    
     💡 변수의 라이프사이클관련 추가사항
      ```
      function example() {
        let tempData = "일시적인 데이터";
        console.log(tempData); // "일시적인 데이터"
      } // 여기서 tempData는 메모리에서 사라짐 (가비지 컬렉션 대상)
      ```

      ✔ 최적화 방법
      클로저(Closure)를 활용해서 불필요한 변수 사용을 줄이자!
      더 이상 필요 없는 데이터는 null로 초기화해서 가비지 컬렉션이 빨리 작동하도록 유도하자!

     메모리와 연산의 효율성 상관관계
      ✅ 메모리 사용량을 줄이면 연산 속도가 향상될 수 있다!
      메모리를 적게 사용하면 캐시 적중률(Cache Hit Rate)이 올라가고 CPU 연산 속도가 빨라짐
      반대로, 메모리를 과하게 사용하면 GC(Garbage Collection) 오버헤드가 커져 성능 저하
      ✅ 하지만, 시간 최적화를 위해 메모리를 더 사용할 수도 있다!
      공간 복잡도를 희생하고, 속도를 빠르게 하기 위해 캐싱(Caching) 기법을 사용
      예를 들어, 반복 계산을 줄이기 위해 배열이나 객체에 결과를 저장하는 메모이제이션(Memoization) 기법 활용

     ```
     function fibonacci(n, memo = {}) {
          if (n <= 1) return n;
          if (memo[n]) return memo[n]; // 캐싱된 값이 있으면 바로 반환
      
          memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
          return memo[n];
      }
      
      console.log(fibonacci(50)); // 빠르게 실행됨
     ```
       
  3. 오류와 실패의 관계
      - 오류는 중간 요소의 내결함성 때문에 실패로 이어지지 않을 수 있다. 
      - 오류가 최대한 빨리 실패로 이어지게 짜도록 하자.
      - 컨텍스트 에러가 더욱 치명적 -> 신뢰성과 안정성을 키우는 형태의 내결함성은 컨텍스트 에러가 발생할 수 잇다.
    
        정리 : 내결함성을 올리기 위해 문맥과 맞지 않는 값을 반환하는 것을 주의하자. 문맥과 맞지 않는 값은 오류뿐이다. throw을 반환하도록 하자.
        
  4. 자바스크립트 인터페이스란 함수의 이름 인자 반환값의 형식이 일치하는 경우를 말한다.
     - 자바스크립트에는 명시적인 인터페이스 개념은 없다. 다만, 객체의 형태가 일치하면 인터페이스 처럼 동작할 수 있다.
       ```
          class Bird {
              fly() {
                  console.log("새가 날아갑니다!");
              }
          }
          
          class Airplane {
              fly() {
                  console.log("비행기가 이륙합니다!");
              }
          }
          
          function makeItFly(flyingObject) {
              flyingObject.fly(); // 같은 메서드 인터페이스가 존재하면 문제없이 실행됨
          }
          
          makeItFly(new Bird()); // "새가 날아갑니다!"
          makeItFly(new Airplane()); // "비행기가 이륙합니다!"
      ```
      
  6. 인터페이스를 일치시키면 컬렉션으로 묵을 수 있다.
     - 이것은 일종의 일반화 방식이며, 이 성질을 반대로 이용한다면 서로 다른 형태인 경우 인터페이스를 일치시켜 일반화를 시킬 수 있다.
       
           ```
           class Dog {
                sound() {
                    return "멍멍";
                }
            }
            class Cat {
                sound() {
                    return "야옹";
                }
            }
            
            let animals = [new Dog(), new Cat()];
            
            animals.forEach(animal => {
                console.log(animal.sound());  // 같은 인터페이스(sound)를 사용하여 일반화
            });
          ```
       
  7. 데이터와 데이터를 이용한 알고리즘이 이원화 되면 관리가 불가능하다.
     - 데이터를 소유한 쪽에서 데이터를 사용하는 알고리즘을 제공하는 형태로 코딩한다.
       
       ```
       class Order {
              constructor(price, quantity) {
                  this.price = price;
                  this.quantity = quantity;
              }
          
              getTotal() {
                  return this.price * this.quantity;
              }
          }
       let order = new Order(100, 5);
       console.log(order.getTotal()); // 500
       ```
    8. 꼬리물기 최적화 함수와 루프의 관계성
       - 꼬리 재귀 최적화(TCO, Tail Call Optimization)는 함수가 자기 자신을 호출할 때, 기존 호출 프레임을 유지하지 않고 새로운 프레임을 재사용하여 스택을 절약하는 기법

       🔴 일반 재귀 (스택이 계속 쌓임)
       ```
       function factorial(n) {
          if (n === 1) return 1;
          return n * factorial(n - 1); // 여기서 "n * ..." 연산이 남아서 스택이 유지됨
      }
      
      console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 = 120
       ```

      🟢 꼬리 재귀 (TCO) (스택이 유지되지 않고 최적화됨)
  
      ```
      function factorialTail(n, acc = 1) {
          if (n === 1) return acc; // 종료 조건
          return factorialTail(n - 1, acc * n); // 마지막 호출에서 계산을 넘겨줌
      }
      console.log(factorialTail(5)); // 120
      ```

      꼬리 재귀 최적화는 Javascript 에서 지원하긴 하지만, 브라우저 에서는 지원하지 않음 ( 사파리만 지원 )

      💡 루프와의 관계
      꼬리 재귀는 루프와 비슷한 역할을 하면서도 재귀 함수 형태를 유지하는 방식이야.
      즉, 반복문과 꼬리 재귀는 서로 대체 가능함. ( 기계적으로 번역할 수 있음 )

      ✅ 반복문을 이용한 팩토리얼 구현 (더 직관적, 일반적으로 빠름)
  
      ```
      function factorialLoop(n) {
          let result = 1;
          for (let i = n; i > 1; i--) {
              result *= i;
          }
          return result;
      }
      console.log(factorialLoop(5)); // 120
      ```

    10. 루프는 클로저에만 의존하는 함수를 반복시키고, 재귀함수는 인자에만 의존하는 함수를 반복시킨다.
        ✅ 루프 (반복문)
        루프(for, while)는 변수의 상태를 클로저에 유지하면서 반복
        즉, 외부 변수에 의존하는 경우가 많음

        ```
        function counterLoop() {
            let count = 0; // 외부 변수
            for (let i = 0; i < 5; i++) {
                count += 1; // 클로저(외부 변수)에 의존
            }
            return count;
        }
        console.log(counterLoop()); // 5
        ```

        ✅ 재귀 함수
        재귀는 외부 변수를 거의 사용하지 않고, 오직 함수 인자만을 이용해서 상태를 유지
        즉, 외부 상태에 의존하지 않고 순수 함수(Pure Function)로 동작

        ```
        function counterRecursive(n, count = 0) {
            if (n === 0) return count;
            return counterRecursive(n - 1, count + 1); // 외부 변수를 사용하지 않음
        }
        console.log(counterRecursive(5)); // 5
        ```

        
    12. 반복되는 코드를 제거하는 것에 집착하자.
      - 오늘부터 실천하기!
  

---

## 🛠 예제 코드 
각 데이 폴더 참고
