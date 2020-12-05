import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'


const Sort = ({ sortBy }) => {
    return (
        <Dropdown as={ButtonGroup} size="sm">
            <Button variant="success" size="sm">Sort</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">From lowest price</Dropdown.Item>
                <Dropdown.Item href="#/action-2">From highest price </Dropdown.Item>
                <Dropdown.Item href="#/action-3">By name</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Sort
