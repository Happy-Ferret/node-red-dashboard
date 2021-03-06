module.exports = function(RED) {
    var ui = require('../ui')(RED);

    function NumericNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        node.status({});

        var group = RED.nodes.getNode(config.group);
        if (!group) { return; }
        var tab = RED.nodes.getNode(group.config.tab);
        if (!tab) { return; }

        var done = ui.add({
            node: node,
            tab: tab,
            group: group,
            forwardInputMessages: config.passthru,
            control: {
                type: 'numeric',
                label: config.label,
                order: config.order,
                format: config.format,
                value: Number(config.min),
                min: Number(config.min),
                max: Number(config.max),
                step: Number(config.step || 1),
                width: config.width || group.config.width || 6,
                height: config.height || 1
            },
            beforeSend: function (msg) {
                msg.topic = config.topic || msg.topic;
                node.status({shape:"dot",fill:"grey",text:msg.payload});
            },
            convert: ui.toFloat.bind(this, config)
        });
        node.on("close", done);
    }
    RED.nodes.registerType("ui_numeric", NumericNode);
};
