/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

import Header from 'components/Header';
import Footer from 'components/Footer';

export function App(props) {
  return (
    <div className="container">
      <Helmet
        titleTemplate="%s - Project Hummingbird"
        defaultTitle="Project Hummingbird"
        meta={[
          { name: 'description', content: 'A machine learning platform for targeting sellers and buyers' },
        ]}
      />
      <Header />
      {React.Children.toArray(props.children)}
      <Footer />
    </div>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
