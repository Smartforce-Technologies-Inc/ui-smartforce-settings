import React from 'react';
import styles from './App.module.scss';
import {
  SFThemeProvider,
  SFStylesProvider,
  createSFTheme,
  SFTheme,
  SFSpinner,
  SFPaper
} from 'sfui';
import {
  AreasProvider,
  CustomerProvider,
  MediaProvider,
  SubscriptionProvider,
  ThemeTypeContext,
  UserProvider,
  getUser,
  isLogin,
  login,
  logout
} from '../../src';
import { Login, LoginFormValue } from './Login/Login';
import { Main } from './Main/Main';

export const BASE_URL = 'http://localhost:8001/api';

export const App = () => {
  const { themeType } = React.useContext(ThemeTypeContext);
  const theme: SFTheme = createSFTheme(themeType);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLogged, setIsLogged] = React.useState<boolean>(false);

  React.useEffect(() => {
    const init = async () => {
      if (isLogin()) {
        try {
          await getUser(BASE_URL);
        } catch (e) {
          logout();
        }
        setIsLogged(true);
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const onLogin = async (formValue: LoginFormValue) => {
    try {
      setIsLoading(true);
      await login(BASE_URL, formValue.email, formValue.password);
      setIsLoading(false);
      setIsLogged(true);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <MediaProvider>
      <SFThemeProvider theme={theme}>
        <SFStylesProvider injectFirst>
          <UserProvider>
            <CustomerProvider>
              <SubscriptionProvider>
                <AreasProvider>
                  <SFPaper className={styles.app}>
                    {isLoading && <SFSpinner />}
                    {!isLoading && (
                      <React.Fragment>
                        {!isLogged && <Login onLogin={onLogin} />}
                        {isLogged && <Main />}
                      </React.Fragment>
                    )}
                  </SFPaper>
                </AreasProvider>
              </SubscriptionProvider>
            </CustomerProvider>
          </UserProvider>
        </SFStylesProvider>
      </SFThemeProvider>
    </MediaProvider>
  );
};
