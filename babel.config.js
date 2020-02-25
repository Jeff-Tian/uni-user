module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
    ],
    "plugins": [
        "react-hot-loader/babel",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-transform-runtime",
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/proposal-object-rest-spread",
        "@babel/plugin-syntax-dynamic-import",
        [
            "@babel/plugin-transform-parameters"
        ],
    ].concat(process.env.NODE_ENV === 'unittest' ? [] : [
        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": "css"
            },
            "antd"
        ],
        [
            "import",
            {
                "libraryName": "antd-mobile"
            },
            "antd-mobile"
        ]
    ])
}