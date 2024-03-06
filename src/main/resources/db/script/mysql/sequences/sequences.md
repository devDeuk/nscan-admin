# Tgate mysql 시퀀스 사용방법

1. 시퀀스 테이블 생성 (변경하는것 없이 그대로 실행)
```sql
CREATE TABLE sequences ( name varchar(32), currval BIGINT UNSIGNED ) ENGINE=InnoDB;
```


2. 시퀀스 프로시저 생성(변경하는것 없이 그대로 실행)
```sql
DELIMITER $$

CREATE PROCEDURE `create_sequence`(IN the_name text)

    MODIFIES SQL DATA

    DETERMINISTIC

BEGIN

DELETE FROM sequences WHERE name=the_name;

INSERT INTO sequences VALUES (the_name, 0);

END
```


3. nextval function 생성(변경하는것 없이 그대로 실행)

```sql
DELIMITER $$

CREATE FUNCTION `nextval`(the_name varchar(32))

RETURNS BIGINT UNSIGNED

MODIFIES SQL DATA

DETERMINISTIC

BEGIN

     DECLARE ret BIGINT UNSIGNED;

     UPDATE sequences SET currval=currval+1 WHERE name=the_name;

     SELECT currval INTO ret FROM sequences WHERE name=the_name limit 1;

     RETURN ret;

END

```



4. 시퀀스명 입력 및 0값 넣기 ('SMS_CERTI_SEQ' 대신 원하는 시퀀스 명을 넣을 것)

```sql
INSERT INTO sequences VALUES ('SMS_CERTI_SEQ', 0);
```


5. nextval 값 가져오기 ('SMS_CERTI_SEQ' 대신 생성한 시퀀스 명을 넣을 것)


```sql
select  lpad(  tshop.nextval('SMS_CERTI_SEQ'), 8, '0') from dual;
```
SELECT TSHOP.NEXTVAL('SMS_CERTI_SEQ') AS STUDENT_SEQ FROM DUAL;

* 시퀀스를 하나 생성한 후 추가로 시퀀스를 생성할 시 3번부터 진행하시면 됩니다.

