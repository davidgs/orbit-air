import './hyde.css';
import Camunda from '../../assets/images/Logo_White.svg';

function SideNav() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <div>
        <aside className="theme-base-09 sidebar">
          <a href="https://camunda.com/" target="_blank" rel="noreferrer">
            <img src={Camunda} alt="Camunda Logo" />
          </a>
          <div className="container sidebar-sticky">
            <div className="sidebar-about">
              <h1>Tools:</h1>
              <ul>
                <li>
                  <a href="https://sentiment.camunda.com/linker">
                    Link Generator
                  </a>{' '}
                </li>
                <li>
                  <a href="https://sentiment.camunda.com/">
                    Sentiment Analyzer
                  </a>
                </li>
              </ul>
              <p className="lead">
                Link Generator: A Content Referral Link Generator
              </p>
              <p className="lead">Brought to you by</p>
              <p>
                <a
                  href="https://confluence.camunda.com/display/camBPM/Developer+Relations"
                  target="_blank"
                  rel="noreferrer"
                >
                  The DevRel Team
                </a>
              </p>
            </div>
            <nav>
              <ul className="sidebar-nav">
                <li>
                  <a href="https://sentiment.camunda.com/linker">Home</a>{' '}
                </li>
                <li>
                  <a href="https://github.com/davidgs/"> Github </a>
                </li>
              </ul>
            </nav>
            <p>&copy; Camunda, Inc. 2022</p>
            <p>All rights reserved</p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default SideNav;
