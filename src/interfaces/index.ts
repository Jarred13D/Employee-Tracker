export interface MenuAnswer {
    action: string;
  }
  
  export interface DepartmentAnswer {
    name: string;
  }
  
  export interface RoleAnswer {
    title: string;
    salary: number;
    department_id: number;
  }
  
  export interface EmployeeAnswer {
    first_name: string;
    last_name: string;
    role_id: number;
    manager_id: number | null;
  }
  
  export interface UpdateRoleAnswer {
    employee_id: number;
    role_id: number;
  }
  
  export interface UpdateManagerAnswer {
    employee_id: number;
    manager_id: number | null;
  }
  
  export interface ManagerSelection {
    manager_id: number;
  }
  
  export interface DepartmentSelection {
    department_id: number;
  }
  
  export interface RoleSelection {
    role_id: number;
  }
  
  export interface EmployeeSelection {
    employee_id: number;
  }  