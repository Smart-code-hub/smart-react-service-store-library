import axios from "axios";

export const FetchEmployees = async () => {
  return axios.get("http://localhost:3352/api/employee").then(employees => {
    return employees.data;
  });
};
export const GetEmployeeById = employeeId => {
  return axios
    .get("http://localhost:3352/api/employee/" + employeeId)
    .then(employee => {
      return employee.data;
    });
};
export const CreateEmployeeRecord = employee => {
  return axios
    .post("http://localhost:3352/api/employee", employee)
    .then(employees => {
      return employees.data;
    });
};
export const EditEmployeeRecord = (employeeId, employee) => {
  return axios.put(
    "http://localhost:3352/api/employee/" + employeeId,
    employee
  );
};
export const DeleteEmployee = employeeId => {
  return axios.delete("http://localhost:3352/api/employee/" + employeeId);
};
