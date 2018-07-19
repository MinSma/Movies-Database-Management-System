import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import uuidv1 from  'uuid/v1';

export default class TableComponent extends React.Component {
    render() {
        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.props.headers.map((header) => {
                                    return <TableCell key={uuidv1()}>{header}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {this.props.data.map((dataItem) => {
                                    return (
                                        <TableRow key={uuidv1()}>
                                            {dataItem.map((dataItems) => {
                                                return (
                                                    <TableCell key={uuidv1()}>
                                                        {dataItems}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}