import React from 'react'
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap'


const Sort = ({ handleFilters }) => {
    return (
        <Dropdown as={ButtonGroup} size="md">
            <Button variant="success" size="md">Sort</Button>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

            <Dropdown.Menu>
                <Dropdown.Item eventKey='price:asc' onSelect={eventKey => handleFilters(eventKey)}>From lowest price</Dropdown.Item>
                <Dropdown.Item eventKey='price:desc' onSelect={eventKey => handleFilters(eventKey)}>From highest price </Dropdown.Item>
                <Dropdown.Item eventKey='name:asc' onSelect={eventKey => handleFilters(eventKey)}>By name</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown >
    )
}

export default Sort
