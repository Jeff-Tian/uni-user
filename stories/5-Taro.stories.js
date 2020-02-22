import React, { useState, useEffect } from 'react';
import TaroTest from '../src/containers/taro-container';

export default {
    title: 'Taro 兼容',
    component: TaroTest
};

export const TaroTestStory = () => {
    return <TaroTest />
}

TaroTestStory.story = {
    name: 'Taro 兼容',
};
