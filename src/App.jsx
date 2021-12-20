import "core-js/stable";
import "regenerator-runtime/runtime";


const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) {
        return new Date(value);
    }
    return value;
}

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
            <td>{issue.created.toDateString()}</td>
            <td>{issue.effort}</td>
            <td>{issue.due ? issue.due.toDateString() : ''}</td>
            <td>{issue.title}</td>
        </tr>
    )
}
function IssueTable(props) {
    const issueRows = props.issues.map(issue => (
        <IssueRow key={issue.id} issue={issue} />
    ));
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
}
class IssueAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.issueAdd;
        const issue = { owner: form.owner.value, title: form.title.value, due: new Date(newDate().getTime() + 1000 * 3600 * 24 * 10) };
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
    async createIssue(issue) {
        const query = `mutation {
            issueAdd(issue: {
                title: "${issue.title}",
                owner: "${issue.owner}",
                due: "${issue.due.toISOString()}",
            }){
                id
            }
        }`
        const response = await fetch('graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        this.loadData();
    };
    async loadData() {
        const query = `query {
            issueList {
                id title status owner effort created due
            }
        }`
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const body = await response.text();
        const result = JSON.parse(body, jsonDateReviver);
        this.setState({ issues: result.data.issueList })
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