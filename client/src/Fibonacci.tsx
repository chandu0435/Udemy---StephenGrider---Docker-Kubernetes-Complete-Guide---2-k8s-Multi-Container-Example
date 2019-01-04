import { Component, FormEvent } from "react";
import Axios from "axios";

interface FibonacciState {
    seenIndexes: { number: number }[],
    values: object & {
        [key: string]: string | number
    },
    index: any
}

export default class Fibonacci extends Component {

    public state: FibonacciState = {
        seenIndexes: [],
        values: {},
        index: ''
    };



    /**
     * Components did mount
     * @inheritdoc
     */
    public componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }



    /**
     * Fetchs values
     * @returns values
     */
    private async fetchValues(): Promise<void>
    {
        const values = await Axios.get('/api/values/current');
        this.setState({values: values.data});
    }



    /**
     * Fetchs indexes
     * @returns indexes
     */
    private async fetchIndexes(): Promise<void>
    {
        const seenIndexes = await Axios.get('/api/values/all');
        this.setState({seenIndexes: seenIndexes.data});
    }



    /**
     * Handle submit of an index
     */
    private handleSubmit = async (event: FormEvent<HTMLElement>): Promise<void> => {
        event.preventDefault();

        await Axios.post('/api/values', {
            index: this.state.index
        });

        this.setState({ index: '' });
    }



    /**
     * Renders seen indexes
     * @returns seen indexes
     */
    private renderSeenIndexes(): string
    {
        return this
            .state
            .seenIndexes
            .map(({ number }) =>  number)
            .join(', ');
    }



    /**
     * Renders values
     * @returns values
     */
    private renderValues(): JSX.Element[]
    {
        const entries = [];

        for (const key in this.state.values) {

            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }



    /**
     * Renders fibonacci
     * @returns
     */
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        type="text"
                        value={this.state.index}
                        onChange={event => this.setState({ index: event.target.value })}
                    />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated values:</h3>
                {this.renderValues()}
            </div>
        )
    }
}