import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import {useHistory} from "react-router-dom";
import axios from 'axios'

const columns = [
    {id: 'name', label: 'Name', minWidth: 170},
    {id: 'coach', label: 'Coach', minWidth: 100},
    {
        id: 'badge',
        label: 'Badge',
        minWidth: 170,
        align: 'right',
    },
];

function createData(id,name, coach, badge,players) {
    return {id,name, coach, badge,players};
}

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    let history = useHistory();

    function handleClick(team) {
        history.push(`/teams/${team.id}`,team);
    }

    const [teams, setTeams] = React.useState([]);
    React.useEffect(() => {
        let response;
        const fetchTeams = async () => {
             response = await axios.get('https://apiv2.apifootball.com/?action=get_teams&league_id=148&APIkey=59bdb1c534c39f7c922ee48bd743dcd40cb87afe893f953f54df912a352b7c75');
            const formattedTeams = response.data.map((team) => {
                return createData(team.team_key,team.team_name, team.coaches[0]?.coach_name, team.team_badge,team.players)
            })
            setTeams(formattedTeams);
        }
        fetchTeams();

    }, [])
    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teams.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} onClick={()=>handleClick(row)} key={column.id} align={column.align}>
                                                {column.id!=='badge'? value:<img src={value} alt={value}/>}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={teams.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}



