import {useEffect} from 'react';
import Head from 'next/head';
import Router from 'next/router';
import {Toaster} from 'react-hot-toast';
import {Provider as ReduxProvider} from 'react-redux';
import nProgress from 'nprogress';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {LocalizationProvider} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {RTL} from '../components/rtl';
import {SplashScreen} from '../components/splash-screen';
import {SettingsConsumer, SettingsProvider} from '../contexts/settings-context';
import {AuthConsumer, AuthProvider} from '../contexts/jwt-context';
import {GOOGLE_TRACKING_ID, gtmConfig} from '../config';
import {gtm} from '../lib/gtm';
import {store} from '../store';
import {createTheme} from '../theme';
import {createEmotionCache} from '../utils/create-emotion-cache';
import './global.css';
import '../i18n';
import initGA from '../ga';
import Script from "next/script";

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    gtm.initialize(gtmConfig);
    initGA(GOOGLE_TRACKING_ID, Router);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          NFP STUDIO
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Script
        src={`https://telegram.org/js/telegram-widget.js?22`}
        async
      />
      <ReduxProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <AuthProvider>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider
                    theme={createTheme({
                      direction: settings.direction,
                      responsiveFontSizes: settings.responsiveFontSizes,
                      mode: settings.theme
                    })}
                  >
                    <RTL direction={settings.direction}>
                      <CssBaseline />
                      <Toaster position="top-center" />
                      {/*<SettingsButton />*/}
                      <AuthConsumer>
                        {(auth) => !auth.isInitialized
                          ? <SplashScreen />
                          : getLayout(
                            <Component {...pageProps} />
                          )}
                      </AuthConsumer>
                    </RTL>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </AuthProvider>
        </LocalizationProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
