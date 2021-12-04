class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        )
    }
}

class IssueRow extends React.Component {
    render() {
        // couldn't use destructuring assignment. 
        const style = this.props.style;
        const issue_id = this.props.issue_id;
        const issue_title = this.props.issue_title;
        return (
            <tr>
                <td style={style}>{issue_id}</td>
                <td style={style}>{issue_title}</td>
            </tr>
        )
    }
}
class IssueTable extends React.Component {
    render() {
        const rowStyle = { border: "1px solid silver", padding: 4 };
        return (
            <table style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={rowStyle}>ID</th>
                        <th style={rowStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow style={rowStyle} issue_id={1} issue_title="Error in the console when clicking Add" />
                    <IssueRow style={rowStyle} issue_id={2} issue_title="Missing bottom border on panel" />
                </tbody>
            </table>
        )
    }
}
class IssueAdd extends React.Component {
    render() {
        return (
            <div>This is a placeholder for a form to add an issue.</div>
        )
    }
}
class IssueList extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        )
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.querySelector('#root'));