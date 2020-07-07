import React from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import classNames from 'classnames';

const ViewTabs = ({views, activeView, changeView}) => {
    return (<Nav tabs>
        {views.map((f, i) => (
            <NavItem key={i}>
                <NavLink className={classNames({active: f.field === activeView.field}, `text-${f.color}`, 'font-weight-bold')} onClick={() => changeView(i) }>
                    {f.title}
                </NavLink>
            </NavItem>
        ))}
    </Nav>)
}

export default ViewTabs;