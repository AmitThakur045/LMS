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

- [What is Bessalani LMS](#what-is-bessalani-lms)
- [Roadmap](#roadmap)
  - [Client Side](#client-side)
  - [Server Side](#server-side)
- [Rest API Snippets](#rest-api-snippets)
  - [Client](#client)
  - [Account](#account)
  - [Databases](#databases)
  - [Storage](#storage)
  - [Teams](#teams)
- [Known Issues](#known-issues)
- [Contributing](#contributing)
- [License](#license)

## What is Bessalani LMS?

Bessalani-LMS is web based Mern application which aims to provide an educational platform to educate Students to
learn new skills.

## Portals

- [Admin]
- [Student]

## Admin Portal

### Description

- Types of Admin
  - Super Admin - Head of All Admins who can perform any action
  - Sub Admin - Supervisor of an Batch
  - HR Admin - An Employee of an Organization who can monitor the data of all the batches within its organization

### Work Flow

## Admin User Interface

Short Explanation of all the available options on the Admin Side

### Admin Header

|       Option       | Description                                                | Super Admin | Sub Admin | HR Admin |
| :----------------: | ---------------------------------------------------------- | ----------- | --------- | -------- |
|     `Profile`      | See your Profile                                           | ✅          | ✅        | ✅       |
| `Add Organization` | Add Organization Name with one or more Custom Domain names | ✅          |           |          |
|  `Reset Password`  | Reset your account Password with OTP verification          | ✅          | ✅        | ✅       |
|     `Log Out`      | Log Out                                                    | ✅          | ✅        | ✅       |

### Dashboard

|     Option      | Description                                                      | Super Admin | Sub Admin | HR Admin |
| :-------------: | ---------------------------------------------------------------- | ----------- | --------- | -------- |
| `Graph Filter`  | See all the stats according to an Organization                   | ✅          |           |          |
| `Student Query` | Approve or Decline deletion of a particular student by Sub Admin | ✅          |           |          |

### Admin

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Admin` | Search an Admin by Email | ✅ | ✅ | ✅ |
| `Add Admin` | Add a Super, Sub or HR admin | ✅ | | |  
| `Update Admin` | Update a particular Admin | ✅ | ✅ | ✅ |  
| `Delete Admin` | Delete a particular Admin | ✅ | | |
| `View Admin` | View a particular Admin | ✅ | ✅ | ✅ |

### Course

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Course` | Search an Course by Course Code | ✅ | ✅ | ✅ |
| `Add Course` | Add a Course | ✅ | | |  
| `View Course` | View a particular Course | ✅ | ✅ | ✅ |

### Student

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Quick Search Student` | Search an Student by Email | ✅ | ✅ | ✅ |
| `Add Student` | Add a Student | ✅ | ✅ | |  
| `Update Student` | Update a particular Student | ✅ | ✅ | |  
| `Delete Student` | Delete a particular Student | ✅ | ✅ | |
| `View Student` | View a particular Student | ✅ | ✅ | ✅ |

### Batch

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Batch` | Add a Batch | ✅ | ✅ | |  
| `Search Batch` | Search a Batch | ✅ | ✅ | ✅ |

### Community

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Category` | Add a Category | ✅ | ✅ | |  
| `Delete Category` | Delete a Category | ✅ | ✅ | |  
| `Reply` | Reply to a problem | ✅ | ✅ | |

### View Batch

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `View Batch` | View a Batch either by searching in Search Batch or Clicking on a particular Batch in Active Batches | ✅ | ✅ | ✅ |

### Batch Header

|         Option         | Description                                       | Super Admin | Sub Admin | HR Admin |
| :--------------------: | ------------------------------------------------- | ----------- | --------- | -------- |
| `Update Active Status` | Update Active Status of a batch, Closed or Active | ✅          | ✅        |          |
|  `Update Batch Admin`  | Update Batch Admin assigned to the Current Batch  | ✅          | ✅        |          |
|       `Log Out`        | Log Out                                           | ✅          | ✅        | ✅       |

### Batch Dashboard

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Graph Filter` | See all the stats according to a Course | ✅ | ✅ | ✅ |

### Batch Course

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `View Course` | View Course Progress | ✅ | ✅ | ✅ |
| `Update Course` | Update Course Progress | ✅ | ✅ | |

### Batch Date

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Schedule` | Add Schedule of Class | ✅ | ✅ | |
| `Update Batch Link` | Update Scheduled Class Link | ✅ | ✅ | |

### Batch Student

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Student` | Add a Student in Current Batch | ✅ | ✅ | |
| `Mark Attendance` | Mark Attendance of Students for each scheduled Classes of all the courses | ✅ | ✅ | |
| `Quick Search Student` | Search an Student by Email | ✅ | ✅ | ✅ |

### Batch Assignment

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Select Course` | Select a Course by Clicking on it | ✅ | ✅ | ✅ |
| `Select Assignment` | Select an Assignment to view the list of Students who have submitted the assignment | ✅ | ✅ | ✅ |
| `Upload Review and Score` | Upload Review by Clicking on the upload option and add Score in the input field | ✅ | ✅ | |

### Batch Community

(https://appwrite.io/docs/client/account)
| Option | Description | Super Admin | Sub Admin | HR Admin |
| :-------: | ----------------------------------------------- |-----------|-----------|----------|
| `Add Category` | Add a Category | ✅ | ✅ | |  
| `Delete Category` | Delete a Category | ✅ | ✅ | |  
| `Reply` | Reply to a problem | ✅ | ✅ | |

## Known Issues

At this time, there are no known issues. If you discover a bug or would like to see a shortcut added, please create a pull request at our GitHub page.

## Contributing

Contributions are highly Welcomed 💙 . Feel free to open PRs for small issues such as typos. For large issues or features, please open an issue and wait for it to be assigned to you.

See [`contributing.md`](CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is MIT licensed. See [`LICENSE`](LICENSE) for more details
