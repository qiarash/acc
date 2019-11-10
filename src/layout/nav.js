import React from 'react'
import { connect } from 'react-redux'
import { MenuItemLink, getResources } from 'react-admin'

const Menu = ({ resources, onMenuClick, logout }) => (
    <div>
        {resources.map(resource => (
          <React.Fragment>
            <MenuItemLink
                to={`/${resource.name}`}
                key={resource.name}
                primaryText={(resource.options && resource.options.label) || resource.name}
                onClick={onMenuClick}
            />
            <MenuItemLink
                to={`/${resource.name}`}
                primaryText={`All ${resource.options.name}`}
                leftIcon={<span>{' '}</span>}
                onClick={onMenuClick} />
            <MenuItemLink
                to="/custom-route"
                primaryText={`New ${resource.options.name}`}
                leftIcon={<span>{' '}</span>}
                onClick={onMenuClick} />
            </React.Fragment>
        ))}
    </div>
)

const mapStateToProps = state => ({
    resources: getResources(state),
})

export default connect(mapStateToProps)(Menu)
