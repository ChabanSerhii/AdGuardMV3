import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, ICON_ID } from 'Common/components/ui';
import style from './Category.module.pcss';

interface CategoryProps {
    children: ReactElement,
    navLink: string;
    headerName: string;
}

export const Category = ({
    children,
    navLink,
    headerName,
}: CategoryProps) => {
    return (
        <>
            <div className={style.header}>
                <NavLink to={navLink}>
                    <Icon id={ICON_ID.ARROW_NAV} />
                </NavLink>
                <div className={style.headerName}>
                    {headerName}
                </div>
            </div>
            {children}
        </>
    );
};
