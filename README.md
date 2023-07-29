# drones-delivery



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








