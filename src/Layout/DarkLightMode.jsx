import { Fragment, useContext, useEffect } from 'react';
import { Form, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AppConfigContext } from '../context/Context';
import LightModeIcon from '../assets/images/svg/sun.svg';
import DarkModeIcon from '../assets/images/svg/moon.svg';
import useLocalStorage from '../hooks/useLocalStorage';

const DarkLightMode = ({ className }) => {
    const ConfigContext = useContext(AppConfigContext);
    const { storageValue, setStorageValue, getStorageValue } = useLocalStorage(
        'skin',
        ConfigContext?.appStats?.skin ?? 'light' // Using optional chaining and nullish coalescing
    );

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', getStorageValue('skin', 'light'));
        ConfigContext?.setAppConfig(storageValue); // Using optional chaining
    }, [storageValue, ConfigContext]);

    const changeColorMode = () => {
        const newSkin = storageValue === 'light' ? 'dark' : 'light';
        setStorageValue(newSkin);
        ConfigContext?.setAppConfig(newSkin); // Using optional chaining
    };

    return (
        <Fragment>
            <Link
                to="#"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={changeColorMode}
                className={`form-check form-switch theme-switch btn btn-light btn-icon rounded-circle ${className}`}
            >
                <Form.Check.Input
                    type="checkbox"
                    isValid
                    value={storageValue}
                    style={{ display: 'none' }}
                />
                <Form.Check.Label style={{ cursor: 'pointer' }}>
                    <Image src={storageValue === 'dark' ? DarkModeIcon : LightModeIcon} />
                </Form.Check.Label>
            </Link>
        </Fragment>
    );
};

export default DarkLightMode;
