# Bessalani LMS <img src="./online-learn/src/Assests/Admin_Logo.png"/>

Bessalani-LMS is web based Mern application which aims to provide an educational platform to educate Students to
learn new skills.

<center>
<a href = "https://github.com/AmitThakur045/Project1/issues"><img src = https://img.shields.io/github/issues/AmitThakur045/Project1></a>
<a href = "https://github.com/AmitThakur045/Project1/fork"><img src = https://img.shields.io/github/forks/AmitThakur045/Project1></a>
<a href = "https://github.com/AmitThakur045/Project1/stargazers"><img src = https://img.shields.io/github/stars/AmitThakur045/Project1></a>
<a href = "https://github.com/AmitThakur045/Project1/blob/master/LICENSE"><img src = https://img.shields.io/github/license/AmitThakur045/Project1></a>
  </center>
  
## Index

- [Built With](#built-with)
- [What is Bessalani LMS](#what-is-bessalani-lms)
- [Portals](#portals)
  - [Admin](#admin)
  - [Student](#student)
- [Admin Portal](#admin-portal)
  - [Description](#description)
  - [Work Flow](#work-flow)
  - [Admin User Interface](#admin-user-interface)
    - [Admin Header](#admin-header)
    - [Dashboard](#dashboard)
    - [Admin](#admin)
    - [Course](#course)
    - [Student](#student)
    - [Batch](#batch)
    - [Community](#community)
    - [View Batch](#view-batch)
    - [Batch Header](#batch-header)
    - [Batch Dashboard](#batch-dashboard)
    - [Batch Course](#batch-course)
    - [Batch Date](#batch-date)
    - [Batch Student](#batch-student)
    - [Batch Assignment](#batch-assignment)
    - [Batch Community](#batch-community)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## Built With

- [![React][react.js]][react-url]
- [![Tailwind CSS][tailwind.css]][tailwindcss-url]
- [![Node.js][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![MongoDB][mongodb]][mongodb-url]
- [![Amazon S3][amazon-s3]][amazon-s3-url]

## What is Bessalani LMS?

Bessalani-LMS is web based Mern application which aims to provide an educational platform to educate Students to
learn new skills.

## Portals

- [Admin](#admin)
- [Student](#student)

## Admin Portal

### Description

- Types of Admin
  - Super Admin - Head of All Admins who can perform any action
  - Sub Admin - Supervisor of an Batch
  - HR Admin - An Employee of an Organization who can monitor the data of all the batches within its organization

### Work Flow

- Add Admin

  1. Add an organization if it doesn't exist
  2. Add Admin in that organization

- Add Batch
  1. Add an organization if it doesn't exist
  2. Add Batch in that organization
  3. Update the Batch Admin to any Sub Admin (Optional)

### Admin User Interface

Short Explanation of all the available options on the Admin Side

#### Admin Header

<a href="./Docs-Images/Admin_Header.JPG">Image</a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :----------------: | ---------------------------------------------------------- | ----------- | --------- | -------- |
| `Profile` | See your Profile | ✅ | ✅ | ✅ |
| `Add Organization` | Add Organization Name with one or more Custom Domain names | ✅ | | |
| `Reset Password` | Reset your account Password with OTP verification | ✅ | ✅ | ✅ |
| `Log Out` | Log Out | ✅ | ✅ | ✅ |

#### Dashboard

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------------: | ---------------------------------------------------------------- | ----------- | --------- | -------- |
| `Graph Filter` | See all the stats according to an Organization | ✅ | | |
| `Student Query` | Approve or Decline deletion of a particular student by Sub Admin | ✅ | | |

#### Admin

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Admin` | Search an Admin by Email | ✅ | ✅ | ✅ |
| `Add Admin` | Add a Super, Sub or HR admin | ✅ | | |  
| `Update Admin` | Update a particular Admin | ✅ | ✅ | ✅ |  
| `Delete Admin` | Delete a particular Admin | ✅ | | |
| `View Admin` | View a particular Admin | ✅ | ✅ | ✅ |

#### Course

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Course` | Search an Course by Course Code | ✅ | ✅ | ✅ |
| `Add Course` | Add a Course | ✅ | | |  
| `View Course` | View a particular Course | ✅ | ✅ | ✅ |

#### Student

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Student` | Search an Student by Email | ✅ | ✅ | ✅ |
| `Add Student` | Add a Student | ✅ | ✅ | |  
| `Update Student` | Update a particular Student | ✅ | ✅ | |  
| `Delete Student` | Delete a particular Student | ✅ | ✅ | |
| `View Student` | View a particular Student | ✅ | ✅ | ✅ |

#### Batch

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Batch` | Add a Batch | ✅ | ✅ | |  
| `Search Batch` | Search a Batch | ✅ | ✅ | ✅ |

#### Community

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Category` | Add a Category | ✅ | ✅ | |  
| `Delete Category` | Delete a Category | ✅ | ✅ | |  
| `Reply` | Reply to a problem | ✅ | ✅ | |

#### View Batch

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `View Batch` | View a Batch either by searching in Search Batch or Clicking on a particular Batch in Active Batches | ✅ | ✅ | ✅ |

#### Batch Header

|         Option         | Description                                       | Super Admin | Sub Admin | HR Admin |
| :--------------------: | ------------------------------------------------- | ----------- | --------- | -------- |
| `Update Active Status` | Update Active Status of a batch, Closed or Active | ✅          | ✅        |          |
|  `Update Batch Admin`  | Update Batch Admin assigned to the Current Batch  | ✅          | ✅        |          |
|       `Log Out`        | Log Out                                           | ✅          | ✅        | ✅       |

#### Batch Dashboard

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Graph Filter` | See all the stats according to a Course | ✅ | ✅ | ✅ |

#### Batch Course

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `View Course` | View Course Progress | ✅ | ✅ | ✅ |
| `Update Course` | Update Course Progress | ✅ | ✅ | |

#### Batch Date

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Schedule` | Add Schedule of Class | ✅ | ✅ | |
| `Update Batch Link` | Update Scheduled Class Link | ✅ | ✅ | |

#### Batch Student

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Student` | Add a Student in Current Batch | ✅ | ✅ |
| `Mark Attendance` | Mark Attendance of Students for each scheduled Classes of all the courses | ✅ | ✅ | |
| `View Student` | View Student's stats by clicking on any student | ✅ | ✅ | |
| `Quick Search Student` | Search an Student by Email | ✅ | ✅ | ✅ |

#### Batch Assignment

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Select Course` | Select a Course by Clicking on it | ✅ | ✅ | ✅ |
| `Create Assignment` | Add an Assignment | ✅ | ✅ | |
| `Select Assignment` | Select an Assignment to view the list of Students who have submitted the assignment | ✅ | ✅ | ✅ |
| `Upload Review and Score` | Upload Review by Clicking on the upload option and add Score in the input field | ✅ | ✅ | |

#### Batch Community

<a href="./Docs Images/"></a>
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Category` | Add a Category | ✅ | ✅ | |  
| `Delete Category` | Delete a Category | ✅ | ✅ | |  
| `Reply` | Reply to a problem | ✅ | ✅ | |

## Student Portal

### Description

- The Student Portal is a web application that allows students to view the progress of their courses and to submit assignments.

### Work Flow

    1. Login to the Student Portal. If user is not created, then create a new user by clicking on sign up.
    2. Click on the Profile to view the profile of the student.
    3. Select a Course by clicking on its image to redirect to the contents of that Course
    4. Click on any lesson of a section to view it's video if available
    5. Click on the Live Class to view the scheduled classes
    6. Click on the Assignments to view the list of assignments of the course. Upload and submit the assignment.
    7. Click on the Certificate to view the list of all the submitted assignment and unlock the given certificate if available.
    7. Click on the Community to view the list of problems and replies. Click on new Thread to create a new problem.
    8. Logout

### Student User Interface

Short Explanation of all the available options on the Student Side

#### Course

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Course` | Click on any course to view its content |
| `Course Image with Progress` | Click on course image with progress to view Course Panel |

#### Community

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `New Thread` | Create a new Thread |

#### Profile

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Update` | Update the user data |
| `Reset Password` | Change the password of the user with OTP verification |

#### Course Panel

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Course Panel` | Click on the image with progress of any course to reveal its course panel |

#### Header

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Community ` | Click on it to get Batch community |

#### My Learning

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Watch Course Lesson Video` | Click on any lesson within a section to view its recorded session if available |

#### Live Class

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `Join` | Click on any event and join the meet on given time |

#### Assignment

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `View Assignment` | Click on any assignment to view its PDF |
| `Upload` | Upload your answer to an assignment and click submit to submit it|

#### Certificate

(https://appwrite.io/docs/client/account)
| Option | Description |
| :-------: | ----------------------------------------------- |
| `View Assignment` | Click on any assignment to view your checked marksheet |
| `Unlock Certificate` | Click on unlock certificate to get your certificate after finishing every assignment |

## Known Issues

At this time, there are no known issues. If you discover a bug or would like to see a shortcut added, please create a pull request at our GitHub page.

## Contributing

Contributions are highly Welcomed 💙 . Feel free to open PRs for small issues such as typos. For large issues or features, please open an issue and wait for it to be assigned to you.

See [`contributing.md`](CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is MIT licensed. See [`LICENSE`](LICENSE) for more details

<!-- MARKDOWN LINKS & IMAGES -->

[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[tailwind.css]: https://img.shields.io/badge/Tailwind-20232A?style=for-the-badge&logo=tailwindcss&logoColor=61DAFB
[tailwindcss-url]: https://tailwindcss.com/
[node.js]: https://img.shields.io/badge/Node-20232A?style=for-the-badge&logo=nodedotjs&logoColor=68A063
[node-url]: https://nodejs.org/
[express.js]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=68A063
[express-url]: https://expressjs.com/
[mongodb]: https://img.shields.io/badge/MongoDB-20232A?style=for-the-badge&logo=mongodb&logoColor=68A063
[mongodb-url]: https://www.mongodb.com/
[amazon-s3]: https://img.shields.io/badge/AmazonS3-20232A?style=for-the-badge&logo=amazons3&logoColor=FF9900
[amazon-s3-url]: https://aws.amazon.com/s3/
