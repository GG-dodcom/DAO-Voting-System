import React from 'react';
import {
  BaseContainer,
  FooterLinks,
  FooterTitle,
  FooterLinksItem,
} from './index';

const TheFooter: React.FC = () => {
  const livevoteTextLinks = [
    {
      text: 'About',
      link: '/about',
    },
  ];

  const resourcesTextLinks = [
    {
      text: 'User Manual',
      link: '/userManual',
    },
  ];

  return (
    <div className="-mt-3 border-t">
      <div className="space-y-5 py-[40px] md:space-y-0">
        <BaseContainer>
          <div className="space-y-5 md:flex md:space-y-0">
            <div className="flex justify-center space-x-[70px] text-center md:w-full md:text-left lg:ml-[60px] lg:justify-start">
              <FooterLinks>
                <FooterTitle>LiveVote</FooterTitle>
                {livevoteTextLinks.map((item) => (
                  <FooterLinksItem
                    key={item.text}
                    link={{ pathname: item.link }}
                  >
                    {item.text}
                  </FooterLinksItem>
                ))}
              </FooterLinks>

              <FooterLinks>
                <FooterTitle>Resources</FooterTitle>
                {resourcesTextLinks.map((item) => (
                  <FooterLinksItem
                    key={item.text}
                    link={{ pathname: item.link }}
                  >
                    {item.text}
                  </FooterLinksItem>
                ))}
              </FooterLinks>
            </div>
          </div>
        </BaseContainer>
      </div>
    </div>
  );
};

export default TheFooter;
