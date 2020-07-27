---mysql
 
CREATE SEQUENCE concursos_id_seq;

 CREATE TABLE socioconcursos                      
 (                                           
     id integer NOT NULL  DEFAULT nextval('concursos_id_seq'::regclass),                    
     code character varying(255) NULL,       
     name character varying(255) NULL,       
     tipo character varying(255) NULL,       
     textoregla text NULL,                   
     createdat timestamp with time zone NULL,
     updatedat timestamp with time zone NULL,
  primary key(id)
 ); 


CREATE SEQUENCE coupons_id_seq;

 CREATE TABLE sociocoupons                        
 (                                           
     id integer NOT NULL DEFAULT nextval('coupons_id_seq'::regclass),                                      
     code character varying(255) NULL,       
     count character varying(255) NULL,      
     name character varying(255) NULL,       
     percent integer NULL,                   
     userid integer NULL,                    
     details text NULL,                      
     createdat timestamp with time zone NULL,
     updatedat timestamp with time zone NULL,
     status character varying(255) NULL,     
     grade integer NULL,                     
     concursocode character varying(255) NULL,
  primary key(id)
 ); 

CREATE SEQUENCE schools_id_seq;

 CREATE TABLE socioschools                        
 (                                           
     id integer NOT NULL  DEFAULT nextval('schools_id_seq'::regclass),                                      
     name character varying(255) NULL,       
     createdat timestamp with time zone NULL,
     updatedat timestamp with time zone NULL,
  primary key(id) 

 );     

CREATE SEQUENCE students_id_seq;
CREATE TABLE sociostudents                         
 (                                             
     id integer NOT NULL DEFAULT nextval('students_id_seq'::regclass),                                      
     email character varying(255) NULL,        
     password character varying(255) NULL,     
     createdat timestamp with time zone NULL,  
     updatedat timestamp with time zone NULL,  
     status character varying(255) NULL,       
     essay text NULL,                          
     curp character varying(255) NULL,         
     name character varying(255) NULL,         
     middlename character varying(255) NULL,   
     lastname character varying(255) NULL,     
     school character varying(255) NULL,       
     entity character varying(255) NULL,       
     grade integer NULL,                       
     comments text NULL,                       
     plagarism character varying(255) NULL,    
     spellingPoints integer NULL,              
     title character varying(255) NULL,        
     evaluation1Teacher integer NULL,          
     evaluation2Teacher integer NULL,          
     contentCriteria1A integer NULL,           
     contentCriteria2A integer NULL,           
     contentCriteria3A integer NULL,           
     contentCriteria4A integer NULL,           
     contentCriteria5A integer NULL,           
     draftingCriteria1A integer NULL,          
     draftingCriteria2A integer NULL,          
     draftingCriteria3A integer NULL,          
     contentCriteria1B integer NULL,           
     contentCriteria2B integer NULL,           
     contentCriteria3B integer NULL,           
     contentCriteria4B integer NULL,           
     contentCriteria5B integer NULL,           
     draftingCriteria1B integer NULL,          
     draftingCriteria2B integer NULL,          
     draftingCriteria3B integer NULL,          
     paymentMade boolean NULL,                 
     paymentStatus character varying(255) NULL,
     transactionId integer NULL,               
     couponcode character varying(255) NULL,   
     fouls integer NULL,                       
     finalist boolean NULL,                    
     concursocode character varying(255) NULL,
  primary key(id)   
 );                

CREATE SEQUENCE transactions_id_seq;
 CREATE TABLE sociotransactions                     
 (                                             
     id integer NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),                                                           
     createdat timestamp with time zone NULL,  
     updatedat timestamp with time zone NULL,  
     status character varying(255) NULL,       
     event character varying(255) NULL,        
     auth_code character varying(255) NULL,    
     reference character varying(255) NULL,    
     transactionId character varying(255) NULL,
     hash text NULL,                           
     total integer NULL,                       
     card_bin character varying(255) NULL,     
     card_brand character varying(255) NULL,   
     card_category character varying(255) NULL,
     card_type character varying(255) NULL,    
     card_country character varying(255) NULL, 
     card_issuer character varying(255) NULL,  
     cust_fname character varying(255) NULL,   
     cust_lname character varying(255) NULL,   
     cust_lname_2 character varying(255) NULL, 
     cust_address text NULL,                   
     cust_city character varying(255) NULL,    
     cust_state character varying(255) NULL,   
     cust_zip character varying(255) NULL,     
     cust_country character varying(255) NULL, 
     card_last_4 character varying(255) NULL,  
     card_owner character varying(255) NULL,   
     studentid integer NULL                    
 );        

CREATE SEQUENCE users_id_seq;

 CREATE TABLE sociousers                          
 (                                           
     id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
     email character varying(255) NULL,      
     password character varying(255) NULL,   
     createdat timestamp with time zone NULL,
     updatedat timestamp with time zone NULL,
     role character varying(255) NULL,       
     name character varying(255) NULL,       
     middlename character varying(255) NULL, 
     lastname character varying(255) NULL,   
     marked text NULL,                       
     grade integer NULL,                     
     assigned integer NULL,
  primary key(id) 
 ); 


 insert into sociousers ("email", "password", "createdat", "updatedat", "role", "name", "middlename", "lastname", "grade", "marked") values ('admin@admin.com', '12345', current_timestamp, current_timestamp, 'admin', 'administrador', 'i', 'apellidoadd', '1', 'Y');
 
