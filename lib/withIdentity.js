import React, { useContext } from 'react';
import nextCookie from "next-cookies"

const IdentityContext = React.createContext();

export const useIdentity = () => useContext(IdentityContext);

const withIdentity = (App) => {
    return class IdentityProvider extends React.Component {
        static async getInitialProps({Component, router, ctx}) {
            let pageProps = {};
            if(Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
            const { passportSession } = nextCookie(ctx);
            if(!passportSession) {
                return {
                    ...pageProps,
                    session: null
                }
            }
            const serializedCookie = JSON.parse(Buffer.from(passportSession, 'base64').toString());
            const session = serializedCookie.passport.user;
            return {pageProps, session};
        }
        render() {
            const { session, ...pageProps } = this.props
            return (
                <IdentityContext.Provider value={session}>
                    <App {...pageProps} />
                </IdentityContext.Provider>
            )
        }
    }
}

export default withIdentity