-- -----------------------------------------------------
-- Data for testing the functionally of different
-- parts of the website that have been implemented
-- -----------------------------------------------------

insert into users(email,password,roles,created,active) values
('test1@test.edu','12345','Writer', NOW(),'1'),
('test2@test.edu','123456','Writer', NOW(),'1'),
('test3@test.edu','123457','Writer', NOW(),'1'),
('mcduck@school.edu','letmein!','Writer', NOW(),'1'),
('deactive@test.edu','letmein?','Writer', NOW(),'0'),
('dduck@school.edu','letmein!1','Copy-Editor', NOW(),'1'),
('daisyduck@school.edu','letmein!12','Admin', NOW(),'1'),
('manager','manager','Manager', NOW(),'1');

insert into articles(author,headline,body,isDraft,createdDate) values
(
'test1', 
'The Queen is Dead',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
'1',
NOW()
),
(
'test2', 
'Gas Prices are Raising',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
'1',
NOW()
),
(
'test3', 
'Drury Issues Student Loan Forgiveness',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
'1',
NOW()
),
(
'duck', 
'Springfield has a Drug Problem',
'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
'1',
NOW()
)