import { config } from '@/config';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoutes';
import {
  Profile,
  Login,
  Settings,
  ProfileSettings,
  AccountSettings,
  AppearanceSettings,
  NotificationSettings,
  DisplaySettings,
  UsersProfile,
  PatientsProfile,
  CalendarProfile,
  ReportsProfile,
  ProfileProfile,
} from '@/pages';
import { PublicRoutes } from './PublicRoutes';
import { NotFound, UserDetail } from '@/components';

const routesConfig = [
  {
    path: config.auth.front.login,
    element: Login,
    isPrivate: false,
  },
  {
    path: config.auth.front.profile,
    element: Profile,
    isPrivate: true,
    children: [
      {
        index: true,
        element: ProfileProfile,
      },
      {
        path: config.auth.front.routesProfile.users,
        element: UsersProfile,
      },
      {
        path: config.auth.front.routesProfile.users + '/:id',
        element: UserDetail,
      },
      {
        path: config.auth.front.routesProfile.patients,
        element: PatientsProfile,
      },
      {
        path: config.auth.front.routesProfile.calendar,
        element: CalendarProfile,
      },
      {
        path: config.auth.front.routesProfile.reports,
        element: ReportsProfile,
      },
    ],
  },
  {
    path: config.auth.front.settings,
    element: Settings,
    isPrivate: true,
    children: [
      {
        index: true,
        element: () => <Navigate to={config.auth.front.routesSettings.profile} replace />,
      },
      {
        path: config.auth.front.routesSettings.profile,
        element: ProfileSettings,
      },
      {
        path: config.auth.front.routesSettings.account,
        element: AccountSettings,
      },
      {
        path: config.auth.front.routesSettings.appearance,
        element: AppearanceSettings,
      },
      {
        path: config.auth.front.routesSettings.notifications,
        element: NotificationSettings,
      },
      {
        path: config.auth.front.routesSettings.display,
        element: DisplaySettings,
      },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderRoutes = (routes: any[], isNested: boolean = false): React.ReactNode[] => {
  return routes.map((route, index) => {
    const Element = route.element;
    const RouteWrapper = route.isPrivate ? PrivateRoute : PublicRoutes;

    const wrappedElement = isNested ? (
      <Element />
    ) : (
      <RouteWrapper>
        <Element />
      </RouteWrapper>
    );
    return (
      <Route
        key={route.path || index}
        path={route.path}
        index={route.index}
        element={wrappedElement}
      >
        {route.children && renderRoutes(route.children, true)}
      </Route>
    );
  });
};
export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        {renderRoutes(routesConfig)}
        <Route path="/" element={<Navigate to={config.auth.front.login} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
