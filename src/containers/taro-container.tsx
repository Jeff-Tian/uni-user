import Taro, { Component } from "@tarojs/taro";

type TaroTestState = {
    title: string;
    list: number[];
};

console.log('TaroTest...');

export default class TaroTest extends Component<any, TaroTestState> {
    constructor(props) {
        super(props);

        this.state = {
            title: "首页",
            list: [1, 2, 3]
        };

        console.log('contructed.')
    }

    componentWillMount() { console.log('will mount') }

    componentDidMount() { console.log('did mount'); }

    componentWillUpdate(nextProps, nextState) { console.log('will update') }

    componentDidUpdate(prevProps, prevState) { console.log('did mount') }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('should update');
        return true;
    }

    add = e => {
        // dosth
        console.log('adding...', e);
    };

    render() {
        console.log('rendering...');

        return (
            <div>Hello World</div>
        );
    }
}


console.log('Taro Test over.');