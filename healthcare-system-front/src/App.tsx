import { ThemeProvider } from './contexts';
import { AuthProvider } from './contexts/auth/AuthProvider';
import { RouterComponent } from './routes';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterComponent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
