import "./DashboardBox.scss";

type DashboardBoxProps = {
  children: React.ReactNode;
};

function DashboardBox({ children }: DashboardBoxProps) {
  return <div className="dashboard-box">{children}</div>;
}

export { DashboardBox };
