import React from "react"

import { View, Text, Button, Icon } from "native-base"

import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';


class ExistingProjectMenuButton extends React.Component {
    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };
    render() {
        const { buttonPf, project, onUnArchiveProject } = this.props
        return (
            <View style={{ width: "20%", marginLeft: 5 }}>
                <Menu
                    ref={this.setMenuRef}
                    button={
                        <Button
                            transparent
                            style={{
                                ...buttonPf,
                                height: 64,
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.15,
                                shadowRadius: 3.84,
                                elevation: 5,
                                backgroundColor: 'white',
                            }}
                            onPress={this.showMenu}
                        >
                            <Icon name="md-more" style={{ color: '#1E2E50' }} />
                        </Button>
                    }
                >
                    <MenuItem
                         onPress={() => this.props.onUnArchiveProject(project)}
                    >
                        Save
                    </MenuItem>
                </Menu>
            </View>
        )
    }
}

export default ExistingProjectMenuButton