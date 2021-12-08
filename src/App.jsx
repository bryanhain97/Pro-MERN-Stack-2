const initialIssues = [
    { id: 1, status: 'New', owner: 'Ravan', effort: 5, created: '20-13-3', due: undefined, title: 'Error in console when clicking Add' },
    { id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, created: '20-31-2', due: '12-2-12', title: 'Missing bottom border on panel' }
];

// If we use new Date() for either created or due prop, we can't render components. 

class IssueFilter extends React.Component {
    render() {
        return (
            <div>This is a placeholder for the issue filter.</div>
        )
    }
};
const IssueRow = (props) => {
    const issue = props.issue;
    return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.due}</td>
            <td>{issue.title}</td>
        </tr>
    )
}
const IssueTable = (props) => {
    const issueRows = props.issues.map(issue => {
        const id = issue.id;
        return <IssueRow key={id} issue={issue} />
    });
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Status</td>
                    <td>Owner</td>
                    <td>Created</td>
                    <td>Effort</td>
                    <td>Due Date</td>
                    <td>Title</td>
                </tr>
            </thead>
            <tbody>
                {issueRows}
            </tbody>
        </table>
    )
};
class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = { owner: form.owner.value, title: form.title.value, status: 'New' };
        this.props.createIssue(issue);
        form.owner.value = ""; form.title.value = "";
    }
    render() {
        return (
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                <input type="text" name="owner" placeholder="Owner" />
                <input type="text" name="title" placeholder="Title" />
                <button>Add</button>
            </form>
        )
    }
}
class IssueList extends React.Component {
    constructor() {
        super();
        this.state = {
            issues: []
        };
        this.createIssue = this.createIssue.bind(this);
    }
    createIssue(issue) {
        issue.id = this.state.issues.length + 1;
        issue.created = new Date();
        const newIssueList = [...this.state.issues]; // OR: newIssueList = this.state.issues.slice()
        newIssueList.push(issue);
        this.setState({ issues: newIssueList })
    };
    loadData() {
        setTimeout(() => {
            this.setState({ issues: initialIssues })
        }, 1000);
    };
    componentDidMount() {
        this.loadData();
    };
    render() {
        return (
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues} />
                <hr />
                <IssueAdd createIssue={this.createIssue} />
            </React.Fragment>
        )
    }
}

const element = <IssueList />;

ReactDOM.render(element, document.querySelector('#root'));