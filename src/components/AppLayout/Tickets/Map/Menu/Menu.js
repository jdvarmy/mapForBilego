import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import {inject} from "mobx-react";


const Wrapper = styled('div')`
    display: inline-block;
    font-size: 0px;
    width: 100%;
    max-width: 360px;
    z-index: 1;
    background-color: rgb(255, 255, 255);
    user-select: none;
    padding: 0px 30px;
`;

const Container = styled('div')`
    color: rgb(51, 51, 51);
    font-size: 13px;
    line-height: 15px;
    display: block;
    position: relative;
    user-select: none;
`;

const Table = styled('div')`
    width: 100%;
    display: table;
    padding: 0px;
    margin: 0px;
`;
const TableRow = styled('ul')`
    width: 100%;
    display: table-row;
    text-align: left;
    list-style: none;
    padding: 0px;
    margin: 0px;
`;

@inject('serverDataStore')
class Menu extends React.Component{
    render() {
        const { serverDataStore:{ data: { colors } } } = this.props;

        return (
            <Wrapper>
                <Container>
                    <Table>
                        <TableRow>
                            { colors.map( el => <Item el={el} len={colors.length} key={el[0]} />) }
                        </TableRow>
                    </Table>
                </Container>
            </Wrapper>
        );
    }
}

export default Menu;