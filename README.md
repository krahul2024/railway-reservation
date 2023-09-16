# Online Railway Reservation System

## Introduction

This project aims to create an online ticket reservation system for railways, akin to the [Indian Railways Ticket Booking System](https://irctc.co.in). While the project is currently under development and not yet live, it offers a range of features, which are elaborated upon below with screenshots from the local development environment.

## Features

### 1. Train Search

![Train Search Page](https://github.com/krahul2024/railway-reservation/assets/76573313/11022091-f441-419f-b29c-afc0e3c4b724)

Users, whether registered or not, can easily search for trains based on their preferences. The system provides helpful suggestions as users enter station names, travel classes, train names, and train numbers, enhancing the user experience and reducing search errors.

![Train Search Result](https://github.com/krahul2024/railway-reservation/assets/76573313/222aebda-715c-4f07-91d2-b8dd8a4ac162)

Train search results are presented with essential information such as train name, number, available ticket classes, seat availability, departure, arrival times, and operating days. Users can also sort the results by various criteria like arrival time, departure time, and journey duration.

### 2. Train Selection and Details

![Train Details](https://github.com/krahul2024/railway-reservation/assets/76573313/c392784a-a5dd-4213-b25a-86a0b6d17e1e)

Comprehensive information about the selected train is provided, including its timetable and fares for different travel classes. Users can easily choose their desired travel class to proceed with ticket booking.

### 3. Ticket Information and User Details

![Ticket Information 1](https://github.com/krahul2024/railway-reservation/assets/76573313/f7cafcff-cf62-4084-90b6-2d636dcdee8d)
![Ticket Information 2](https://github.com/krahul2024/railway-reservation/assets/76573313/ff1bbcd7-27f7-4214-ac5d-c0ecc66e851e)

Users can input their information for the selected train and add multiple passengers as needed. The system allows users to edit their details, correct errors, or remove passengers as required. After completing the details, users can request an OTP for ticket confirmation.

#### 3.1 OTP and Login

![Login Alert](https://github.com/krahul2024/railway-reservation/assets/76573313/74fe06d9-86ae-42c5-ad6c-cbc8a9457c36)

Ticket booking requires user registration. If a user is not registered, they must complete the registration and login process to proceed with their ticket booking. In the event a user is not logged in while booking, their progress is saved, and they can easily resume their booking after logging in. OTP verification is essential for secure booking.

![Login Page](https://github.com/krahul2024/railway-reservation/assets/76573313/b4b5f71a-629e-4de6-8bcf-bfe1a130b46a)
![Profile Page](https://github.com/krahul2024/railway-reservation/assets/76573313/11944bcf-0ad6-4c51-b0c7-05c6d7f02b82)
![Update Profile](https://github.com/krahul2024/railway-reservation/assets/76573313/3525f126-124e-4fa5-8b00-10dfc1355a23)

#### 3.2 User OTP

![Booking OTP](https://github.com/krahul2024/railway-reservation/assets/76573313/8120cdb6-81ca-4d55-b55e-72aa781f1c56)

Users receive an OTP on their registered email for ticket confirmation.

#### 3.3 Ticket Booking and Downloads

![Booking Confirmation](https://github.com/krahul2024/railway-reservation/assets/76573313/272b0d25-9acb-4796-be7a-e64769cdef06)

After confirmation, ticket booking is completed, and a confirmation email is sent to the user's registered email address. Users are redirected to a page where they can print individual tickets or download them.

![Ticket Booking Mail](https://github.com/krahul2024/railway-reservation/assets/76573313/5bcbdd6c-33ef-47f5-8867-16a2ce52847d)
![Tickets Print](https://github.com/krahul2024/railway-reservation/assets/76573313/8cfcaeab-b965-407d-b1b8-d1f5849e0672)

### 4. PNR and Ticket Cancellation

Users can check the PNR status, which provides information on the current status of their ticket. If the PNR is valid, the system displays the status, timetable, and the last station the train departed from (if applicable). Users also have the option to cancel their tickets, which renders the PNR invalid.

![PNR Details](https://github.com/krahul2024/railway-reservation/assets/76573313/a351617b-59ae-4bb0-bda1-ae6268aa73d2)
![Ticket Cancellation](https://github.com/krahul2024/railway-reservation/assets/76573313/0db9d2d5-bb67-4479-a6cb-a1c16a29ce4f)
![Invalid PNR](https://github.com/krahul2024/railway-reservation/assets/76573313/0ebd8218-326a-4164-a71a-7ae655214755)

### 5. Management

The management section is dedicated to the addition and removal of trains, stations, and travel classes. Access to this section is restricted to authorized personnel, with access control managed through credential verification. 

#### 5.1 Add/Update Trains

**Add Train**

New trains can be added by providing comprehensive information, including train name, number, operating days, available travel classes, and route details. The system also offers station name suggestions for error-free data entry.

![Add Train 1](https://github.com/krahul2024/railway-reservation/assets/76573313/738e7e1e-b2d4-4839-80d0-cb5941dfee2e)
![Add Train 2](https://github.com/krahul2024/railway-reservation/assets/76573313/bc341f0b-bc83-4549-837d-e6cd91306f04)

**Update Train**

Updating train information follows a similar process, allowing for modifications to existing data along with the addition of new information.

![Update Train 2](https://github.com/krah

ul2024/railway-reservation/assets/76573313/6b990ff2-dfab-4909-a14a-db5aed765b7b)
![Update Train 3](https://github.com/krahul2024/railway-reservation/assets/76573313/0bc0933a-e460-4169-b507-a4f58edca56a)
![Update Train 4](https://github.com/krahul2024/railway-reservation/assets/76573313/751295d0-1883-48fc-bb44-e67a8a2bf5fe)

#### 5.2 Add/Update Stations

**Add Station**

New stations can be added by providing station name, station address, and station code.

![Add Station](https://github.com/krahul2024/railway-reservation/assets/76573313/8279587e-0e6b-467c-87f6-cfd34e1e86d2)

**Update Station**

Existing station information can be modified, including station name, code, and address.

![Update Station](https://github.com/krahul2024/railway-reservation/assets/76573313/15dff2aa-166f-421a-b6a9-27fcfc6c0c81)

#### 5.3 Add/Update Classes

**Add Class**

New travel classes can be added by providing class name, class seat capacity (customizable), and fare ratio (used for fare calculation between stations).

![Add Class](https://github.com/krahul2024/railway-reservation/assets/76573313/3941de05-1af3-479b-8cd5-2818455f42f1)

**Update Class**

Existing class information can be modified, including class name, seat capacity, and fare ratio.

![Update Class](https://github.com/krahul2024/railway-reservation/assets/76573313/11762c09-77c9-461c-8570-82216939a38e)

While this project is not currently live due to ongoing development and data-related issues, we appreciate your interest in exploring its features. Stay tuned for future updates and improvements.
