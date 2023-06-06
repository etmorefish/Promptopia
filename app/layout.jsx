import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';

export const matedate = {
  title: "Promptopia",
  description: 'Discover & Share AI Prompts'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradint'></div>
          </div>

          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>

      </body>
    </html>
  )
}

export default RootLayout;