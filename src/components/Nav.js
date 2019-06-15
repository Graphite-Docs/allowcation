import React, { Component } from 'reactn';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { handleSignOut } from '../helpers/authentication';

class Nav extends Component {
  render() {
    const { userSession, person  } = this.global;
    return (
        <Menu>
            <Menu.Item>Kid Coin</Menu.Item>
            {userSession.isUserSignedIn() ? 
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Image src={person.avatarUrl()} avatar />
                    <span>{person.name()}</span>
                    <Dropdown icon="caret down">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Menu.Menu> : 
            <Menu.Item className="hide" />
            }
        </Menu>
    );
  }
}

export default Nav;
