import Taro, { Component } from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

type TaroTestState = {
    title: string;
    list: number[];
};

export default class TaroTest extends Component<any, TaroTestState> {
    constructor() {
        super(...arguments);
        this.state = {
            title: "首页",
            list: [1, 2, 3]
        };
    }

    componentWillMount() { }

    componentDidMount() { }

    componentWillUpdate(nextProps, nextState) { }

    componentDidUpdate(prevProps, prevState) { }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    add = e => {
        // dosth
        console.log('adding...', e);
    };

    render() {
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