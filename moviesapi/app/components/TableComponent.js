import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import uuidv1 from  'uuid/v1';
import PropTypes from 'prop-types';

export default class TableComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };
    
    render() {
        const { data, headers } = this.props;
        const { rowsPerPage, page } = this.state;

        let displayData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

        return (
            <div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {headers.map((header) => {
                                    return <TableCell key={uuidv1()}>{header}</TableCell>
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                                {displayData.map((dataItem) => {
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
                    {this.renderNoDataText(data.length)}

                    <TablePagination
                        component="div"
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[rowsPerPage]}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page'
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page'
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </div>
        );
    }

    renderNoDataText(length) {
        if (length === 0) {
            return (
                <Typography variant="subheading" gutterBottom align="center">
                    Table contains no data.
                </Typography>
            );
        }
    }
}

TableComponent.propTypes = {
    data: PropTypes.array.isRequired,
    headers: PropTypes.array.isRequired
};