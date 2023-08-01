# Drones Delivery Project


## Description
This project is a drug delivery application using drones. It allows to manage drones, medications and drone battery logs.


## Folder architecture
The application architecture follows a Model-View-Controller (MVC) pattern. In this project, the views correspond to the GraphQL schemas defined in the `types` directory.

![App Screenshot](https://raw.githubusercontent.com/angeldavidhf/angeldavidhf/main/projects/blob/structure.jpg)

- **database**: contains migrations, seeders and configs
    - **migrations**: contains everything related to the structure of the tables in the database
    - **seeders**: creates test data for the tables, migrations must be run first
    - _config.js_: configuration of the database environments
    - _connection.js_: connection to the database
- **src**: contains migrations, seeders and config
    - **controllers**: Controllers are responsible for handling database operations and business logic. The controllers used are: `DronesController`, `MedicationsController`, `DronesMedicationsController` and `BatteryLogsController`.
    - **models**: Data models are defined using Sequelize, which represent the database tables. The models are: `Drones`, `Medications`, `DronesMedications` and `BatteryLogs`.
    - **resolvers**: Apollo Server Express is used as GraphQL server to process queries and mutations made by clients.
    - **types**: GraphQL Schemes.
- **tests**: unit tests for entities.
- _index.js_: Project initialization and database connection.
- _Dockerfile_: Build the Node.js application container image.
- _Dockerfile-db_: Build the database PostgreSQL container image.
- _docker-compose.yml_: Services: "db" for the PostgreSQL container and "app" for the Node.js application container. Configurations for the database and environment variables are also defined.

### Despliegue local

1. Clone the repository
    ```bash
      git clone https://github.com/angeldavidhf/drones-delivery.git
    ```

2. Go to the project directory
    ```bash
      cd drones-delivery
    ```

3. Instalar dependencias
    ```bash
      npm install
    ```
4. Make sure you have Docker started, you can check the [Docker documentation](https://docs.docker.com/engine/install/)
5. Mount the docker images for drones-delivery-app and drones-delivery-db
    ```docker
      docker-compose build
    ```
6. Starting docker image services
    ```docker
      docker-compose up
    ```

:partying_face: :clap: Ready with this we can see our API in [Apollo Sandbox](https://studio.apollographql.com/sandbox) and the URL will be `http://localhost:4000/graphql`.


## Queries
The queries are for testing the functionality and requirements of the project. 

### Drones
1. List all drones
    ```graphql
    query {
       getAllDrones {
         id
         serialNumber
         model
         weightLimit
         battery
         state
         flagDelete
         createdAt
         updatedAt
       }
    }
    ```
2. Get drone by ID
    ```graphql
    query {
       getDroneById(id: 1) {
          id
          serialNumber
          model
          weightLimit
          battery
          state
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
3. List drones by state
    ```graphql
    query {
       getDronesByState(state: "IDLE") {
          id
          serialNumber
          model
          weightLimit
          battery
          state
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
4. Create drone
    ```graphql
    mutation {
       createDrone(input: {
          serialNumber: "DRN001",
          model: "LightWeight",
          weightLimit: 300,
          battery: 80
       }) {
          id
          serialNumber
          model
          weightLimit
          battery
          state
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
5. Update drone
    ```graphql
    mutation {
       updateDrone(input: {
          id: 1,
          model: "LightWeight",
          weightLimit: 300,
          battery: 80
       }) {
          id
          serialNumber
          model
          weightLimit
          battery
          state
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
6. change state drone by ID
    ```graphql
    mutation {
       changeStateDrone(id: 1)
    }
    ```
7. Temporary delete drone by ID, change flagDelete to true, is like a fake delete
    ```graphql
    mutation {
       temporaryDeleteDrone(id: 1)
    }
    ```
9. Permanent delete drone by ID
    ```graphql
    mutation {
       permanentDeleteDrone(id: 1)
    }
    ```


### Medications
1. List all medications
    ```graphql
    query {
       getAllMedications {
          id
          name
          weight
          code
          image
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
2. Get medication by ID
    ```graphql
    query {
       getMedicationById(id: 1) {
          id
          name
          weight
          code
          image
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
3. Create medication
    ```graphql
    mutation {
       createMedication(input: {
          name: "Medication-A",
          weight: 10,
          code: "MED001"
       }) {
          id
          name
          weight
          code
          image
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
4. Update medication
    ```graphql
    mutation {
       updateMedication(input: {
          id: 3,
          name: "Medication-E",
          weight: 40,
          code: "MED003"
       }) {
          id
          name
          weight
          code
          image
          flagDelete
          createdAt
          updatedAt
       }
    }
    ```
5. Temporary delete medication by ID, change flagDelete to true, is like a fake delete
    ```graphql
    mutation {
       temporaryDeleteMedication(id: 1)
    }
    ```
6. Permanent delete medication by ID
    ```graphql
    mutation {
       permanentDeleteMedication(id: 1)
    }
    ```


### BatteryLogs
1. List all battery logs
    ```graphql
    query {
       getAllBatteryLogs {
          id
          drone {
             id
             serialNumber
          }
          batteryLevel
          createdAt
          updatedAt
       }
    }
    ```
2. Get battery logs for drone ID
    ```graphql
    query {
       getBatteryLogsForDrone(droneId: 1) {
          id
          drone {
             id
             serialNumber
          }
          batteryLevel
          createdAt
          updatedAt
       }
    }
    ```
3. Delete all battery logs for drone ID
    ```graphql
    mutation {
       deleteBatteryLogsForDrone(droneId: 1)
    }
    ```


### DronesMedications
1. List all medications loaded for drone ID
    ```graphql
    query {
       getMedicationsForDrone(droneId: 1) {
          id
          batteryUse
          deliveryStatus
          medication {
             id
             code
             name
             weight
          }
       }
    }
    ```
2. List all drones that have a loaded medicine
    ```graphql
    query {
       getDronesForMedication(medicationId: 1) {
          id
          batteryUse
          deliveryStatus
          drone {
             id
             model
             battery
             state
             weightLimit
          }
       }
    }
    ```
3. Charge medicines to the drone, remember that the state of the drone must be LOADING, must have a battery above 25 and must not exceed the weight limit of the drone.
    ```graphql
    mutation {
       loadMedicationsToDrone(droneId: 1, medications: [1, 2, 3]) {
          batteryUse
          deliveryStatus
          droneId
          medicationId
       }
    }
    ```


## Requirements
List of all requirements and validations:

### Functional requirements
1. The service must allow to register a drone with the following fields:
   - [ ] Serial number with a maximum of 100 characters.
   - [ ] Drone model, with options: LightWeight, MiddleWeight, CruiserWeight, HeavyWeight.
   - [ ] Drone weight limit with a maximum of 500 grams.
   - [ ] Battery capacity (battery capacity) in percent.
   - [ ] State of the drone, with options: IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING. 
2. Charging a drone with medicines:
   - [ ] The service must allow loading a drone with medication, ensuring that the total weight of the medication does not exceed the drone's weight limit.
   - [ ] A drone should not be allowed to be loaded if its battery level is below 25% (LOADING status).
3. Check the medicines loaded on a drone:
   - [ ] The service should allow consulting the list of medicines loaded on a specific drone.
   - [ ] The list should include the name, weight and code of each medicine, as well as the image associated with its case.
4. Check the drones available for loading:
   - [ ] The service must allow consulting the list of drones available for loading, i.e. those that are in IDLE status.
5. Check the battery level of a drone:
   - [ ] The service must allow querying the battery level of a specific drone.

### Non-functional requirements

1. Data format: 
   - [ ] All communication with the service must be in JSON format.
2. Project configuration and execution:
   - [ ] The project must be buildable and executable without problems.
   - [ ] A README file must be provided with detailed instructions on how to build, run and test the project.
   - [ ] A database that can be run locally, such as an in-memory database or one that can be run via a container, must be used.
3. Initial data loading:
   - [ ]  All data required for the execution of the service, such as reference tables or test data, must be preloaded into the database.
4. Unit test:
   - [ ] Although optional, it is suggested to include unit tests using JUnit.
5. Periodic battery verification task:
   - [ ] A periodic task should be introduced that checks the battery levels of the drones and creates a historical or audit event log for this.
6. Charge and status monitoring:
   - [ ] The service should implement the necessary validations to ensure that drones are not overloaded with drugs and do not enter LOADING state if the battery is below 25%.
7. Change history:
   - [ ] It is suggested to show how changes have been made to the project through the commit history in the code repository.


## Technologies
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)


