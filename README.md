# Online Railway Reservation system 
### Introduction
This project is based on online ticket reservation system for railways, this is similar to [Indian Railways Ticket Booking System](https://irctc.co.in).
Since this project is not live, as I am in the process of making it real-time, Features of this project are illustrated below using screenshots of project on local machine. Thanks. 
## Features 
### 1. Searching for train(s). 


![Train Search Page](https://github.com/krahul2024/railway-reservation/assets/76573313/11022091-f441-419f-b29c-afc0e3c4b724)

All the users registered or not registered can search trains based on their preferences.
Suggestions are displayed while entering station, class, train-name and train-number.
This aids to user experience and error free train search.<br>

![Train search_result](https://github.com/krahul2024/railway-reservation/assets/76573313/222aebda-715c-4f07-91d2-b8dd8a4ac162) <br> 
Train search results are displayed with some information which will let user decide which train to select. The information displayed are train name, number, different ticket classes with seat availability, train boarding time and arrival time, and days on which a particular train is running. Users can sort search result on the basis of which train arrives at destination first, boards from source station first or journey time. 

### 2. Train Selection and Details


![Train_details](https://github.com/krahul2024/railway-reservation/assets/76573313/c392784a-a5dd-4213-b25a-86a0b6d17e1e)<br> 
All the information related to train which user selected is displayed, the information includes train time-table, fares for different classes. Users can select a class to book ticket. 

### 3. Ticket information, User details 

![ticket_information1](https://github.com/krahul2024/railway-reservation/assets/76573313/f7cafcff-cf62-4084-90b6-2d636dcdee8d)<br> ![ticket_information2](https://github.com/krahul2024/railway-reservation/assets/76573313/ff1bbcd7-27f7-4214-ac5d-c0ecc66e851e)<br> 
Users can enter their information for selected train and add multiple passengers as they please. 

![confirmation_page1](https://github.com/krahul2024/railway-reservation/assets/76573313/062532d4-6c87-477d-9ca5-a7b1199f0bea)<br> 
Users can edit the information in case their was some error or some fix was needed or they needed to remove a person as they added more persons than they should have. As users are done with the the information they can request the otp for confirmation of their ticket. 
#### 3.1 OTP and Login 
![Login_alert](https://github.com/krahul2024/railway-reservation/assets/76573313/74fe06d9-86ae-42c5-ad6c-cbc8a9457c36)<br> 
User registration is required for ticket booking, in case the user is not registered then need to register and login to resume their ticket booking. If user goes on to login leaving current page, all the progress user has made is saved and as soon as the user logs in, it has option to resume ticket booking from where they left. OTP is sent to registered e-mail of user and only after verification of the OTP, user can continue the ticket booking. The image above shows alert if the user was not logged in and tried to book ticket. Images below illustrate the logging in process and profile page of user, as user is directed to their profile page and on the profile page they get option to continue previous booking. IN case user has not added e-mail and phone number to their profile, they need to update that, so they have update profile option on profile page and the update page is shown. 
![login_page](https://github.com/krahul2024/railway-reservation/assets/76573313/b4b5f71a-629e-4de6-8bcf-bfe1a130b46a)![profile_page](https://github.com/krahul2024/railway-reservation/assets/76573313/11944bcf-0ad6-4c51-b0c7-05c6d7f02b82)![update_profile](https://github.com/krahul2024/railway-reservation/assets/76573313/3525f126-124e-4fa5-8b00-10dfc1355a23)
#### 3.2 User OTP 
![booking_otp](https://github.com/krahul2024/railway-reservation/assets/76573313/8120cdb6-81ca-4d55-b55e-72aa781f1c56)<br> 
Users receive OTP on their registered e-mail for confirmation of their tickets. 
#### 3.3 Ticket Booking and Downloads

![booking_confirmation](https://github.com/krahul2024/railway-reservation/assets/76573313/272b0d25-9acb-4796-be7a-e64769cdef06)<br> 
After confirmaion, ticket booking is done, and mail is sent to user registered e-mail which contains ticket information, user is redirected to a new page which has option to print individual tickets or all the tickets, using these options user can download their tickets. 

![Ticket_booking_mail](https://github.com/krahul2024/railway-reservation/assets/76573313/5bcbdd6c-33ef-47f5-8867-16a2ce52847d)
![Tickets_print](https://github.com/krahul2024/railway-reservation/assets/76573313/8cfcaeab-b965-407d-b1b8-d1f5849e0672)
### 4. PNR and Ticket Cancellation 
Pnr status can be checked , in case the pnr is valid then the status is shown along with the time table and last station which the train was(if the train has started from first station), option to cancel the ticket, when ticket is cancelled the pnr becomes invalid.![Pnr_details](https://github.com/krahul2024/railway-reservation/assets/76573313/a351617b-59ae-4bb0-bda1-ae6268aa73d2)![Ticket_cancellation](https://github.com/krahul2024/railway-reservation/assets/76573313/0db9d2d5-bb67-4479-a6cb-a1c16a29ce4f)
![Invalid_pnr](https://github.com/krahul2024/railway-reservation/assets/76573313/0ebd8218-326a-4164-a71a-7ae655214755)

### 5. Management 
This section is for addition, removal of (trains, stations, travel-classes), only people with access are allowed to visit this section. The access gain is done by modifying the database(currently), this will be resolved in future updates as I am working on providing access on the basis of credential verification. 
#### 5.1 Add/Update Trains
**Add Train**
New trains can be added by providing all the information asked, train-name, train-number, running days, all the travelling-classes and route information(includes station-name(suggestions appear to make the process error free and easy) , arrival time at that station, distance travelled till that station, stoppage time for the train at that station.



![add_train1](https://github.com/krahul2024/railway-reservation/assets/76573313/738e7e1e-b2d4-4839-80d0-cb5941dfee2e)


![add_train2](https://github.com/krahul2024/railway-reservation/assets/76573313/bc341f0b-bc83-4549-837d-e6cd91306f04)<br> 

**Update Train**
This process is similar to addition of new train , only thing extra is previous information can be updated/modified along with addition of new information. 
![update_train2](https://github.com/krahul2024/railway-reservation/assets/76573313/6b990ff2-dfab-4909-a14a-db5aed765b7b)
![update_train3](https://github.com/krahul2024/railway-reservation/assets/76573313/0bc0933a-e460-4169-b507-a4f58edca56a)
![update_train_4](https://github.com/krahul2024/railway-reservation/assets/76573313/751295d0-1883-48fc-bb44-e67a8a2bf5fe)
<br> 

#### 5.2 Add/Update Stations
**Add Station** 
New stations can be added by providing station-name, station-address and station-code 
![add_station](https://github.com/krahul2024/railway-reservation/assets/76573313/8279587e-0e6b-467c-87f6-cfd34e1e86d2)
**Update Station**
Modify previous station name , code and address of the station. 

![update_station](https://github.com/krahul2024/railway-reservation/assets/76573313/15dff2aa-166f-421a-b6a9-27fcfc6c0c81)


#### 5.3 Add/Update Classes
**Add Class** 
New classes can be added by providing class-name, class-seat-capacity(This is not default, it can be adjusted according to the needs of train) and fare-ratio(used for fare calculation between stations)  
![add_class](https://github.com/krahul2024/railway-reservation/assets/76573313/3941de05-1af3-479b-8cd5-2818455f42f1)

**Update Class**
Modify previous class-name, seat-capacity, fare-ratio. ![update_class](https://github.com/krahul2024/railway-reservation/assets/76573313/11762c09-77c9-461c-8570-82216939a38e)
<br><br><br> 
As mentioned earlier, this project is a work in progress, and I'm the only one working on it. I'm currently dealing with some development tasks and data-related challenges. Thanks a lot for taking the time to read through the entire page,appreciate the effort. Stay tuned for more updates!
