import { ProfileSideBar, SettingsSideBar } from './sideBar';

export const SideBar = () => {
  return (
    <aside className="dashboard-layout__sidebar">
      <div className="p-6">
        <div className="dashboard-layout__sidebar-title">Veriel Health System</div>
        <div className="dashboard-layout__sidebar-sub-title">SISTEMA DIAGNÓSTICO AVANZADO</div>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2">
          <ProfileSideBar />
          <SettingsSideBar />
        </ul>
      </nav>
    </aside>
  );
};
