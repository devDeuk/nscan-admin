CREATE TABLE customer (
                          id varchar(16) NOT NULL,
                          password varchar(60) NULL,
                          cust_name varchar(16) NULL,
                          svc_num varchar(16) NULL,
                          auth_level varchar(5) NULL,
                          reg_date date NULL,
                          upd_date date NULL,
                          reg_id varchar(16) NULL,
                          upd_id varchar(16) NULL,
                          CONSTRAINT customer_pkey PRIMARY KEY (id)
);


CREATE TABLE sample (
                        seq  int(10) not null auto_increment PRIMARY KEY,
                        title varchar(200) NULL,
                        content varchar(1000) NULL,
                        cre_nm varchar(100) NULL,
                        cre_dt date NULL
);
