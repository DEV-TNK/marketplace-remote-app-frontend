import { useContext } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import { AppConfigContext } from '../../../context/Context';

const GKTippy = ({ children, content, placement }) => {
  const ConfigContext = useContext(AppConfigContext);

  // Check if ConfigContext and ConfigContext.appStats are defined
  // and also check if ConfigContext.appStats.skin is defined
  const isLightSkin = 
    ConfigContext && 
    ConfigContext.appStats && 
    ConfigContext.appStats.skin === 'light';

  return (
    <Tippy
      content={
        <small className={`fw-bold ${isLightSkin ? 'text-dark' : ''}`}>
          {content}
        </small>
      }
      theme={isLightSkin ? 'dark' : 'light'}
      placement={placement}
      animation={'scale'}
    >
      {children}
    </Tippy>
  );
};

GKTippy.propTypes = {
  placement: PropTypes.oneOf([
    'top',
    'top-start',
    'top-end',
    'right',
    'right-start',
    'right-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'left',
    'left-start',
    'left-end'
  ])
};

GKTippy.defaultProps = {
  placement: 'top',
  content: 'Tool Tip Text'
};

export default GKTippy;
