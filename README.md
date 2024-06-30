<p align="center"><a href="https://profile-forme.com" target="_blank"><img src="https://res.cloudinary.com/ecommerce2021/image/upload/v1659065987/avatar/logo_begsn1.png" width="300"></a></p>

<p align="center">
<a href="https://www.linkedin.com/in/tai-nguyen-tien-787545213/"><img src="https://img.icons8.com/color/48/000000/linkedin-circled--v1.png" alt="Linkedin"></a>
<a href="https://profile-forme.surge.sh"><img src="https://img.icons8.com/color/48/000000/internet--v1.png" alt="Profile"></a>
<a href="tel:0798805741"><img src="https://img.icons8.com/color/48/000000/apple-phone.png" alt="Phone"></a>
<a href = "mailto:nguyentientai10@gmail.com"><img src="https://img.icons8.com/fluency/48/000000/send-mass-email.png" alt="License"></a>
</p>

# CQRS-ES System

This project implements a Command Query Responsibility Segregation (CQRS) and Event Sourcing (ES) system, designed to handle complex business operations and ensure high performance and scalability. It uses a microservices architecture, leveraging various technologies such as MongoDB, PostgreSQL, RabbitMQ, and Docker for development and deployment.

# Structure Folder

```
.
├── .dockerignore
├── .env
├── .env.example
├── .gitignore
├── .vscode/
│   └── settings.json
├── docker/
│   └── Dockerfile
├── docker-compose.yml
├── git.sh
├── makefile
├── mongo/
│   ├── conf/
│   │   └── mongod.conf
│   └── init.sh
├── package.json
├── README.md
├── server.js
└── src/
    ├── app.js
    ├── commands/
    │   ├── handlers/
    │   └── models/
    ├── configs/
    │   ├── mongo.configs.js
    │   ├── pg.configs.js
    │   └── rabbit.configs.js
    ├── constants/
    │   ├── appConstants.js
    │   └── timeConstants.js
    ├── dbs/
    │   ├── init.mongo.js
    │   ├── init.rabbit.js
    │   └── init.sequelizePG.js
    ├── events/
    │   ├── models/
    │   └── subscribers/
    ├── globals/
    ├── helpers/
    ├── models/
    ├── queries/
    │   ├── handlers/
    │   └── models/
    └── subscribers/
```

This README.md file outlines the directory structure of a software project that follows the Command Query Responsibility Segregation (CQRS) and Event Sourcing (ES) patterns. Here's a breakdown of the structure and the purpose of each directory:

- `.`: The root directory of the project, containing configuration files and directories for the project setup.
  - `.dockerignore`: Specifies files and directories to ignore when building Docker images.
  - `.env` and `.env.example`: Environment configuration files, with `.env.example` serving as a template.
  - `.gitignore`: Lists files and directories that Git should ignore.
  - `.vscode/`: Contains Visual Studio Code specific settings.
    - `settings.json`: VS Code configuration settings.
  - `docker/`: Contains Docker-related files.
    - `Dockerfile`: Instructions for building the Docker image.
  - `docker-compose.yml`: Defines and runs multi-container Docker applications.
  - `git.sh`: A shell script related to Git operations, possibly for automation.
  - `makefile`: Defines set of tasks to be executed.
  - `mongo/`: MongoDB specific configuration and initialization scripts.
    - `conf/`: Contains MongoDB configuration files.
    - `init.sh`: Script for initializing MongoDB.
  - `package.json`: Defines npm package dependencies and scripts.
  - `README.md`: This file, describing the project and its structure.
  - `server.js`: The main entry point for the Node.js application.
  - `src/`: Source code of the application, organized into specific directories for CQRS and ES.
    - `app.js`: Main application script.
    - `commands/`: Contains command handlers and models, dealing with write operations.
      - `handlers/`: Logic for handling commands.
      - `models/`: Special models for the command side of CQRS.
    - `configs/`: Configuration files for databases and other services.
    - `constants/`: Constants used throughout the application.
    - `dbs/`: Database initialization scripts.
    - `events/`: Contains event models and subscribers, central to Event Sourcing.
      - `models/`: Models representing events in the system.
      - `subscribers/`: Handlers that react to events.
    - `globals/`: Global variables or configurations.
    - `helpers/`: Utility functions and helpers.
    - `models/`: General models for the application, reflecting the current state after events are applied.
    - `queries/`: Contains query handlers and models, dealing with read operations.
      - `handlers/`: Logic for handling queries.
      - `models/`: Special models for the query side of CQRS.
    - `subscribers/`: Updated to handle events from commands/queries, facilitating the reactive nature of the system.

This structure supports the separation of concerns as advocated by CQRS and leverages Event Sourcing for maintaining the state of the application through events.

## Tài Khoản Donate li Cf để có động lực code cho anh em tham khảo 😄😄

![giphy](https://3.bp.blogspot.com/-SzGvXn2sTmw/V6k-90GH3ZI/AAAAAAAAIsk/Q678Pil-0kITLPa3fD--JkNdnJVKi_BygCLcB/s1600/cf10-fbc08%2B%25281%2529.gif)

## Mk: NGUYEN TIEN TAI

## STK: 1651002972052

## Chi Nhánh: NGAN HANG TMCP AN BINH (ABBANK)

## SUPORT CONTACT: [https://profile-forme.com](https://profile-forme.com/).
