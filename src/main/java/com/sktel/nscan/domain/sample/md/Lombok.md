
# 1. Lombok

## download
* https://projectlombok.org 다운로드


3. 롬복 어노테이션

|어노테이션|설명|
|-----|-----|
|@Getter / @Setter | 객체의 getter와 setter를 생성한다|
|@ToString | toString() 메서드를 생성한다.|
|@EqualsAndHashCode | 자바의 equals()메서드와 hashCode()메서드를 생성한다.|
|@NoArgsConstructor | 인자가 없는 기본 생성자를 생성한다.|
|@RequiredArgsConstructor| @NonNull이 적용된 필드값이나 final로 선언된 필드값만 인자로 받는 생성자를 생성한다.|
|@AllArgsConstructor| 객체의 모든 필드값을 인자로 받는 생성자를 생성한다.|
|@Data | @ToString, @Getter, @Setter, @EqualsAndHashCode, @RequiredArgsConstuctor 어노테이션을 합쳐놓은 어노테이션이다.|
|@builder | 빌더 패턴을 사용할 수 있도록 코드생성 한다.
|@Log | 자동으로 생기는 log라는 변수를 이용해서 로그를 출력할 수 있다.|


