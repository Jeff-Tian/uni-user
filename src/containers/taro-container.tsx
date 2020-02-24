import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

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
            <View className="index">
                <View className="title">{this.state.title}</View>
                <View className="content">
                    {this.state.list.map(item => {
                        return <View className="item">{item}</View>;
                    })}
                    <Button className="add" onClick={this.add}>
                        添加
          </Button>
                </View>
            </View>
        );
    }
}


console.log('Taro Test over.');