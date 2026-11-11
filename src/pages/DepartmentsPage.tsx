import React from "react";
import { Department } from "../types";
import { departmentsData } from "../data/departmentsData";
import { DepartmentCard } from "../components/departments/DepartmentCard";
import { PageContainer } from "../components/common/PageContainer";
import { PageHeader } from "../components/common/PageHeader";
import { BackLink } from "../components/common/BackLink";

interface DepartmentsPageProps {
  departments?: Department[];
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  departments = departmentsData,
}) => {
  return (
    <PageContainer>
      <BackLink to="/" label="Back to Home" />
      <PageHeader title="Our Six Departments" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <DepartmentCard key={dept.id} department={dept} />
        ))}
      </div>
    </PageContainer>
  );
};
