import React from 'react';
import { shallow } from 'enzyme';

import messages from '../messages';
import Footer from '../index';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />
    );
    expect(renderedComponent.contains(
      <section>
          {messages.licenseMessage} />
      </section>
    )).toBe(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.contains(
      <section>
          {messages.authorMessage}
        />
      </section>
    )).toBe(true);
  });
});
