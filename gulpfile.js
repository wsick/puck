var fs = require('fs'),
    typings = require('bower-typings'),
    allTypings = typings(),
    name = 'puck',
    meta = {
        name: name,
        src: [
            'typings/*.d.ts',
            'src/_version.ts',
            'src/**/*.ts'
        ].concat(typings({includeSelf: false})),
        scaffolds: [
            {
                name: 'test',
                symdirs: ['dist', 'src'],
                src: [
                    'typings/*.d.ts',
                    'test/**/*.ts',
                    '!test/lib/**/*.ts',
                    'dist/' + name + '.d.ts'
                ].concat(allTypings)
            },
            {
                name: 'demo',
                ignore: 'lib/qunit',
                port: 8003,
                symdirs: ['dist', 'src'],
                src: [
                    'typings/*.d.ts',
                    'demo/**/*.ts',
                    '!demo/lib/**/*.ts',
                    'dist/' + name + '.d.ts'
                ].concat(allTypings)
            }
        ]
    };

fs.readdirSync('./gulp')
    .forEach(function (file) {
        require('./gulp/' + file)(meta);
    });
