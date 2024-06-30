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
    ├── commands/                # Thư mục mới cho các lệnh
    │   ├── handlers/            # Xử lý logic cho các lệnh
    │   └── models/              # Models đặc biệt cho phần commands
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
    ├── events/                  # Thư mục mới cho các sự kiện
    │   ├── models/              # Models đặc biệt cho phần events
    │   └── subscribers/         # Subscribers cho các sự kiện
    ├── globals/
    ├── helpers/
    ├── models/                  # Cập nhật để phản ánh models chung
    ├── queries/                 # Thư mục cho các truy vấn
    │   ├── handlers/            # Xử lý logic cho các truy vấn
    │   └── models/              # Models đặc biệt cho phần queries
    └── subscribers/             # Cập nhật để xử lý các sự kiện từ commands/queries
```

## Tài Khoản Donate li Cf để có động lực code cho anh em tham khảo 😄😄

![giphy](https://3.bp.blogspot.com/-SzGvXn2sTmw/V6k-90GH3ZI/AAAAAAAAIsk/Q678Pil-0kITLPa3fD--JkNdnJVKi_BygCLcB/s1600/cf10-fbc08%2B%25281%2529.gif)

## Mk: NGUYEN TIEN TAI

## STK: 1651002972052

## Chi Nhánh: NGAN HANG TMCP AN BINH (ABBANK)

## SUPORT CONTACT: [https://profile-forme.com](https://profile-forme.com/).
